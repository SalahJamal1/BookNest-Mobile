using Microsoft.AspNetCore.Mvc;
using BookNest.Contracts;
using BookNest.Data;

namespace BookNest.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class CabinsController : ControllerBase
{
    private readonly ICabinsRepository _repository;

    public CabinsController(ICabinsRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cabin>>> Get()
    {
        return Ok(await _repository.GetAllAsync());
    }

    // GET api/<CabinsController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Cabin>> Get(int id)
    {
        return Ok(await _repository.GetAsync(id));
    }
}