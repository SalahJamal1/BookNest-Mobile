using BookNest.Data;

namespace BookNest.Contracts;

public interface ITokenRepository : IGenricRepository<Token>
{
    List<Token> findAllValidTokenByUserIdAndDeviceId(string userId, string deviceId);
    Token findByRefreshToken(string token);
}