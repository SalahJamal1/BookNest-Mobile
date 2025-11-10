using Microsoft.EntityFrameworkCore;
using BookNest.Contracts;
using BookNest.Data;

namespace BookNest.Repository;

public class BookingsRepository : GenricRepository<Booking>, IBookingsRepository
{
    private readonly BookNestDBContext _context;

    public BookingsRepository(BookNestDBContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
    {
        return await _context.Bookings.Include(b => b.Cabins).ToListAsync();
    }
}