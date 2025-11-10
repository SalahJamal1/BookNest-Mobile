using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BookNest.Contracts;
using BookNest.Data;
using BookNest.Exceptions;
using BookNest.Models.token;
using BookNest.Models.users;

namespace BookNest.Repository;

public class AuthManager : IAuthManager
{
    private readonly IConfiguration _configuration;
    private readonly BookNestDBContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;
    private readonly ITokenRepository _tokenRepository;
    private readonly UserManager<User> _userManager;

    public AuthManager(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IMapper mapper,
        ITokenRepository tokenRepository, UserManager<User> userManager,
        BookNestDBContext context)
    {
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
        _tokenRepository = tokenRepository;
        _userManager = userManager;
        _context = context;
    }

    private HttpContext httpContext => _httpContextAccessor.HttpContext;

    public async Task<AuthResponse> Register(AuthRegister authRegister)
    {
        var user = _mapper.Map<User>(authRegister);
        user.UserName = authRegister.Email;
        var result = await _userManager.CreateAsync(user, authRegister.Password);
        if (result.Succeeded) await _userManager.AddToRoleAsync(user, "user");
        if (result.Errors.Any())
        {
            var error = result.Errors.SingleOrDefault();
            throw new AppErrorResponse(error.Description);
        }

        var userDto = _mapper.Map<UserDto>(user);
        var access_token = await generateToken(user);
        var refresh_token = await generateRefreshToken(user);
        var deviceId = getOrCreateDeviceId(httpContext);
        await saveToken(access_token, user, deviceId, false);
        await saveToken(refresh_token, user, deviceId, true);
        return new AuthResponse
        {
            user = userDto,
            access_token = access_token,
            refresh_token = refresh_token
        };
    }

    public async Task<AuthResponse> Login(AuthLogin authLogin)
    {
        var user = await _context.Users.Include(u => u.Bookings).ThenInclude(b => b.Cabins)
            .FirstOrDefaultAsync(u => u.Email == authLogin.Email);

        if (user == null) throw new AppErrorResponse("Invalid username or password");

        var isValidPassword = await _userManager.CheckPasswordAsync(user, authLogin.Password);
        if (!isValidPassword) throw new AppErrorResponse("Invalid username or password");
        return await getAuthResponse(user);
    }


    public async Task Logout()
    {
        var jwt = getTokenFromRequest(httpContext);
        Console.WriteLine(jwt);
        var deviceId = getDeviceId(httpContext);
        Console.WriteLine("the device ID: " + deviceId);
        if (jwt == null || deviceId == null) throw new AppErrorResponse("Invalid token");
        var userId = _tokenRepository.findByRefreshToken(jwt).UserId;
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) throw new AppErrorResponse("Invalid token");
        await revokeAllUserToken(user, deviceId);
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            MaxAge = TimeSpan.Zero,
            Path = "/",
            SameSite = SameSiteMode.None,
            Secure = true
        };
        httpContext.Response.Cookies.Append("jwt", "", cookieOptions);
    }


    public async Task<AuthResponse> refreshToken()
    {
        var jwt = getTokenFromRequest(httpContext);
        if (jwt == null) throw new AppErrorResponse("you are not logged in");
        var userId = _tokenRepository.findByRefreshToken(jwt).UserId;
        var user = await _context.Users.Include(u => u.Bookings).ThenInclude(b => b.Cabins)
            .FirstOrDefaultAsync(u => u.Id == userId);
        return await getAuthResponse(user,true);
    }

    private string getTokenFromRequest(HttpContext httpContext)
    {
        var cookie = httpContext.Request.Cookies["jwt"];
        var auth = httpContext.Request.Headers.Authorization.SingleOrDefault();
        if (auth != null) return auth.Substring(7);
        if (cookie != null) return cookie;
        return null;
    }

    private async Task<AuthResponse> getAuthResponse(User user,bool isRefresh=false)
    {
        var access_token = await generateToken(user);
        var refresh_token = await generateRefreshToken(user);
        var deviceId = isRefresh?getDeviceId(httpContext): getOrCreateDeviceId(httpContext);
        await revokeAllUserToken(user, deviceId);


        await saveToken(access_token, user, deviceId, false);
        await saveToken(refresh_token, user, deviceId, true);
        setCookie(httpContext, refresh_token);
        var userDto = _mapper.Map<UserDto>(user);
        return new AuthResponse
        {
            user = userDto,
            access_token = access_token,
            refresh_token = refresh_token,
            deviceId = deviceId
        };
    }

    private async Task revokeAllUserToken(User user, string deviceId)
    {
        var tokens = _tokenRepository.findAllValidTokenByUserIdAndDeviceId(user.Id, deviceId);
        foreach (var token in tokens)
        {
            token.Expire = true;
            token.Revoke = true;
            await _tokenRepository.UpdateAsync(token);
        }
    }

    private async Task saveToken(string jwt, User user, string deviceId,
        bool isRefresh)
    {
        var token = new Token
        {
            Access_token = isRefresh ? null : jwt,
            Refresh_token = isRefresh ? jwt : null,
            Expire = false,
            Revoke = false,
            UserId = user.Id,
            Token_type = isRefresh ? TokenType.REFRESHTOKEN : TokenType.ACCESSTOKEN,
            DeviceId = deviceId,
            User = user
        };
        await _tokenRepository.AddAsync(token);
    }

    public async Task<string> generateToken(User user)
    {
        var expire = Convert.ToInt32(_configuration["Jwt:Expire"]);
        return await buildToken(user, expire);
    }

    public async Task<string> generateRefreshToken(User user)
    {
        var expire = Convert.ToInt32(_configuration["Jwt:RefreshExpire"]);
        return await buildToken(user, expire);
    }

    private async Task<string> buildToken(User user, int expire)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var roles = await _userManager.GetRolesAsync(user);
        var rolesClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
        var userClaims = await _userManager.GetClaimsAsync(user);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new("uid", user.Id)
        }.Union(rolesClaims).Union(userClaims);

        var token = new JwtSecurityToken(
            signingCredentials: credentials,
            claims: claims,
            expires: DateTime.Now.AddDays(expire),
            audience: _configuration["Jwt:Audience"],
            notBefore: DateTime.Now,
            issuer: _configuration["Jwt:Issuer"]
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string getOrCreateDeviceId(HttpContext _httpContext)
    {
        var deviceId = _httpContext.Request.Cookies["deviceId"];
        if (deviceId != null) return deviceId;
        deviceId = _httpContext.Request.Headers["deviceId"];
        if (deviceId != null) return deviceId;
        var newDeviceId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.Now.AddYears(1),
            Path = "/",
            SameSite = SameSiteMode.None,
            Secure = true
        };
        _httpContext.Response.Cookies.Append("deviceId", newDeviceId, cookieOptions);
        return newDeviceId;
    }

    private void setCookie(HttpContext _httpContext, string token)
    {
        var expire = Convert.ToInt32(_configuration["Jwt:RefreshExpire"]);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            MaxAge = TimeSpan.FromDays(expire),
            Path = "/",
            SameSite = SameSiteMode.None,
            Secure = true
        };
        _httpContext.Response.Cookies.Append("jwt", token, cookieOptions);
    }

    public string getDeviceId(HttpContext _httpContext)
    {
        var deviceId = _httpContext.Request.Cookies["deviceId"];
        if (deviceId != null) return deviceId;
        deviceId = _httpContext.Request.Headers["deviceId"];
        if (deviceId != null) return deviceId;

        return null;
    }
}