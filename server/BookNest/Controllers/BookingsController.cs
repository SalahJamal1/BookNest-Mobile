using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookNest.Contracts;
using BookNest.Data;

namespace BookNest.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class BookingsController : ControllerBase
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IBookingsRepository _repository;

    public BookingsController(IBookingsRepository repository, IHttpContextAccessor httpContextAccessor)
    {
        _repository = repository;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Booking>>> Get()
    {
        return Ok(await _repository.GetAllBookingsAsync());
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Booking>> Get(int id)
    {
        return Ok(await _repository.GetAsync(id));
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Booking>> Add([FromBody] Booking booking, [FromQuery] int cabinId)
    {
        booking.CabinId = cabinId;

        booking.UserId =
            _httpContextAccessor.HttpContext.User?.FindFirst("uid")?.Value;

        return Ok(await _repository.AddAsync(booking));
    }
}