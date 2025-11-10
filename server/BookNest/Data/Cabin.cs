using Microsoft.EntityFrameworkCore;

namespace BookNest.Data;

[Index(nameof(Name), IsUnique = true)]
public class Cabin
{
    public int Id { get; set; }

    public string Name { get; set; }

    [Precision(6, 2)] public int MaxCapacity { get; set; }

    [Precision(6, 2)] public decimal RegularPrice { get; set; }

    [Precision(6, 2)] public decimal Discount { get; set; }

    public string Image { get; set; }
    public string Description { get; set; }
}