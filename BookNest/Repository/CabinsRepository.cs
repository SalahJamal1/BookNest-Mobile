using BookNest.Contracts;
using BookNest.Data;

namespace BookNest.Repository;

public class CabinsRepository : GenricRepository<Cabin>, ICabinsRepository
{
    private readonly BookNestDBContext _context;

    public CabinsRepository(BookNestDBContext context) : base(context)
    {
        _context = context;
    }
}