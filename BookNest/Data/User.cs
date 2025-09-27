using Microsoft.AspNetCore.Identity;

namespace BookNest.Data;

public class User : IdentityUser
{
    public string firstName { get; set; }
    public string lastName { get; set; }
    public DateTime createdAt { get; set; } = DateTime.Now;
    public List<Booking> Bookings { get; set; } = new();
}