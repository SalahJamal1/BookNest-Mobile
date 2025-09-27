using BookNest.Data;

namespace BookNest.Models.users;

public class UserDto
{
    public string firstName { get; set; }

    public string lastName { get; set; }

    public string Email { get; set; }
    public List<Booking> Bookings { get; set; } = new();
}