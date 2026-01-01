using LeoBeach.DTOs;
using LeoBeach.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/pairs")]
public class PairsController : ControllerBase
{
    private readonly IPairService _service;

    public PairsController(IPairService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePairDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
