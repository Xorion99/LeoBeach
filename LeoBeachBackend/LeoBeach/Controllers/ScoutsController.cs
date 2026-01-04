using LeoBeach.DTOs;
using LeoBeach.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/scouts")]
public class ScoutsController : ControllerBase
{
    private readonly IScoutService _service;

    public ScoutsController(IScoutService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateScoutDto dto)
    {
        var result = await _service.CreateScoutAsync(dto);
        return Ok(result);
    }

    [HttpGet("{playerId}/player-stats")]
    public async Task<ActionResult<PlayerStatsDto>> GetPlayerStats(Guid playerId)
    {
        var result = await _service.GetPlayerStatsAsync(playerId);
        return Ok(result);
    }

    [HttpGet("{pairId}/pair-stats")]
    public async Task<ActionResult<PlayerStatsDto>> GetPairStats(Guid pairId)
    {
        var result = await _service.GetPairStatsAsync(pairId);
        return Ok(result);
    }
}
