using System.ComponentModel.DataAnnotations.Schema;
using BookNest.Models.token;

namespace BookNest.Data;

public class Token
{
    public int id { get; set; }
    public string? Access_token { get; set; }

    public string? Refresh_token { get; set; }

    [Column(TypeName = "varchar(255)")] public TokenType Token_type { get; set; }

    public bool Expire { get; set; } = false;
    public bool Revoke { get; set; } = false;
    public string DeviceId { get; set; }
    [ForeignKey(nameof(UserId))] public string UserId { get; set; }
    public User User { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}