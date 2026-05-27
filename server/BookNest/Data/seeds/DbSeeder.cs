using Microsoft.EntityFrameworkCore;

namespace BookNest.Data.seeds;

public class DbSeeder
{
    public static void Seeder(BookNestDBContext ctx)
    {
        var sql = File.ReadAllText("Data/seeds/cabins.sql");
        ctx.Database.ExecuteSqlRaw(sql);
    }
}