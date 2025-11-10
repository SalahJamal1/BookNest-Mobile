namespace BookNest.Models.users;

public class AuthResponse
{
    public UserDto user { get; set; }
    public string access_token { get; set; }
    public string refresh_token { get; set; }
    public string deviceId { get; set; }
}