using BookNest.Contracts;
using BookNest.Data;

namespace BookNest.Repository;

public class TokenRepository : GenricRepository<Token>, ITokenRepository
{
    private readonly BookNestDBContext _context;


    public TokenRepository(BookNestDBContext context) : base(context)
    {
        _context = context;
    }

    public Token findByRefreshToken(string token)
    {
        return _context.Tokens.SingleOrDefault(t => t.Refresh_token == token);
    }

    public List<Token> findAllValidTokenByUserIdAndDeviceId(string userId, string deviceId)
    {
        var result = _context.Tokens
            .Where(t =>
                t.UserId == userId && t.DeviceId == deviceId
                                   && !t.Expire && !t.Revoke)
            .ToList();

        return result;
    }
}