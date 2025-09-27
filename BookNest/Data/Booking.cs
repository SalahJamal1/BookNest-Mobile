using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookNest.Data;

public class Booking
{
    public Cabin? Cabins { get; set; }
    [ForeignKey(nameof(CabinId))] public int CabinId { get; set; }

    [ForeignKey(nameof(UserId))] public string? UserId { get; set; }

    public int Id { get; set; }


    public DateTime? CreatedAt { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "The End Date is required")]
    public DateTime EndAt { get; set; }

    [Required(ErrorMessage = "The Start Date is required")]
    public DateTime StartDate { get; set; }


    public bool? HasBreakfast { get; set; } = false;
    public bool? IsPaid { get; set; } = false;

    [Required(ErrorMessage = "The Num Guests is required")]
    [Range(1, int.MaxValue, ErrorMessage = "The Num Guests must be greater than or equal to 1")]
    public int NumGuests { get; set; }

    [Required(ErrorMessage = "The Num Nights is required")]
    [Range(1, 7, ErrorMessage = "The Num Nights must be between 1 and 7")]
    public int NumNights { get; set; }

    [Required(ErrorMessage = "The Total Price is required")]
    [Precision(6, 2)]
    public decimal TotalPrice { get; set; }

    public string? Observations { get; set; }
}