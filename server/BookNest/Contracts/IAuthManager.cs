using BookNest.Models.users;

namespace BookNest.Contracts;

public interface IAuthManager
{
    Task<AuthResponse> Register(AuthRegister authRegister);
    Task<AuthResponse> Login(AuthLogin authLogin);
    Task<AuthResponse> refreshToken();
    Task Logout();
}