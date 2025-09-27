using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BookNest.Data.Configuration;

namespace BookNest.Data;

public class BookNestDBContext : IdentityDbContext<User>
{
    public BookNestDBContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Token> Tokens { get; set; }
    public DbSet<Cabin> Cabins { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new RolesConfiguration());
        builder.ApplyConfiguration(new UserConfiguration());
    }
}