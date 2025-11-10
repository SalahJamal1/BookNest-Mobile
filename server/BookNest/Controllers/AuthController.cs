using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookNest.Contracts;
using BookNest.Models.users;

namespace BookNest.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthManager _authManager;

    public AuthController(IAuthManager authManager)
    {
        _authManager = authManager;
    }

    [HttpPost]
    [Route("login")]
    public async Task<AuthResponse> Login([FromBody] AuthLogin authLogin)
    {
        return await _authManager.Login(authLogin);
    }

    [HttpPost]
    [Route("signup")]
    public async Task<AuthResponse> sigup([FromBody] AuthRegister authRegister)
    {
        return await _authManager.Register(authRegister);
    }

    [HttpPost]
    [Route("refresh-token")]
    [Authorize]
    public async Task<AuthResponse> refresh()
    {
        return await _authManager.refreshToken();
    }

    [HttpGet]
    [Route("logout")]
    [Authorize]
    public async Task<IActionResult> logout()
    {
        await _authManager.Logout();
        return Ok();
    }
}