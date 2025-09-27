using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using BookNest.Configuration;
using BookNest.Contracts;
using BookNest.Data;
using BookNest.Exceptions;
using BookNest.MiddleWare;
using BookNest.Repository;

var builder = WebApplication.CreateBuilder(args);


builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console().ReadFrom.Configuration(ctx.Configuration));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll", p => p
        .WithOrigins(
            "http://localhost:8081",
            "http://10.0.2.2:8081"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
    )
);

var connectionString = builder.Configuration.GetConnectionString("DBContext");
builder.Services.AddDbContext<BookNestDBContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddIdentityCore<User>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 8;
    }).AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<BookNestDBContext>();
builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnChallenge = async ctx =>
        {
            ctx.HandleResponse();
            ctx.Response.StatusCode = 401;
            ctx.Response.ContentType = "application/json";
            var errorDetails = new ErrorDetails
            {
                status = "Unauthorized",
                message = "you are not authorized to access this resource"
            };
            await ctx.Response.WriteAsJsonAsync(errorDetails);
        },
        OnForbidden = async ctx =>
        {
            ctx.Response.StatusCode = 403;
            ctx.Response.ContentType = "application/json";
            var errorDetails = new ErrorDetails
            {
                status = "Forbidden",
                message = "you are not authorized to access this resource"
            };
            await ctx.Response.WriteAsJsonAsync(errorDetails);
        },
        OnMessageReceived = ctx =>
        {
            var auth = ctx.Request.Headers["Authorization"].FirstOrDefault();
            var cookie = ctx.Request.Cookies["jwt"];
            if (auth != null && auth.StartsWith("Bearer ")) ctx.Token = auth.Substring(7);
            else if (cookie != null) ctx.Token = cookie;

            return Task.CompletedTask;
        }
    };
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.AddHttpContextAccessor();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<ICabinsRepository, CabinsRepository>();
builder.Services.AddScoped<IBookingsRepository, BookingsRepository>();
builder.Services.AddScoped(typeof(IGenricRepository<>), typeof(GenricRepository<>));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleWare>();
app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();


app.Use(async (ctx, next) =>
{
    await next();
    if (ctx.Response.StatusCode == 404 && !ctx.Response.HasStarted)
    {
        ctx.Response.ContentType = "application/json";
        ctx.Response.StatusCode = 404;
        var errorDetails = new ErrorDetails
        {
            status = "Not Found",
            message = $"We could not find an error response for {ctx.Request.Path}"
        };
        await ctx.Response.WriteAsJsonAsync(errorDetails);
    }
});

app.MapControllers();

app.Urls.Clear();
app.Urls.Add("http://0.0.0.0:5208");
app.Run();