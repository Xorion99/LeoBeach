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
        if (dto.PairId == Guid.Empty)
            return BadRequest("PairId non valido");

        try
        {
            var result = await _service.CreateScoutAsync(dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            // Restituisce il messaggio di errore per debug
            return StatusCode(500, ex.Message);
        }
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


    [HttpPut("{scoutId}/events/{skillId}")]
    public async Task<IActionResult> UpdateScoutEvent(Guid scoutId, Guid skillId, [FromBody] UpdateScoutEventDto dto)
    {
        try
        {
            var result = await _service.UpdateScoutEventAsync(scoutId, skillId, dto.Value);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


}
