using System.ComponentModel.DataAnnotations;

namespace BookNest.Models.users;

public class AuthLogin
{
    [EmailAddress] [Required] public string Email { get; set; }

    [Required] public string Password { get; set; }
}