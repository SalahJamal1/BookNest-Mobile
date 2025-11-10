using System.ComponentModel.DataAnnotations;

namespace BookNest.Models.users;

public class AuthRegister
{
    [Required] public string firstName { get; set; }

    [Required] public string lastName { get; set; }

    [EmailAddress] [Required] public string Email { get; set; }

    [Required] public string Password { get; set; }

    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    [Required]
    public string ConfirmPassword { get; set; }
}