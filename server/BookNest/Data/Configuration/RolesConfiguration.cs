using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookNest.Data.Configuration;

public class RolesConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        var roles = new List<IdentityRole>
        {
            new()
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new()
            {
                Name = "User",
                NormalizedName = "USER"
            },
            new()
            {
                Name = "Manager",
                NormalizedName = "MANAGER"
            }
        };
        builder.HasData(roles);
    }
}