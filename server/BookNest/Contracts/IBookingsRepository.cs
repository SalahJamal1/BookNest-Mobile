using BookNest.Data;

namespace BookNest.Contracts;

public interface IBookingsRepository : IGenricRepository<Booking>
{
    Task<IEnumerable<Booking>> GetAllBookingsAsync();
}