using LeoBeach.DTOs;
using LeoBeach.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/players")]
public class PlayersController : ControllerBase
{
    private readonly IPlayerService _service;
    private readonly IPlayerStatsService _playerStatsService;


    public PlayersController(IPlayerService service, IPlayerStatsService playerStatsService)
    {
        _service = service;
        _playerStatsService = playerStatsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpPost]
    public async Task<IActionResult> Create(CreatePlayerDto dto) => Ok(await _service.CreateAsync(dto));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, CreatePlayerDto dto) => Ok(await _service.UpdateAsync(id, dto));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }

    [HttpGet("{playerId}/stats")]
    public async Task<ActionResult<PlayerStatsDto>> GetPlayerStats(Guid playerId)
    {
        var result = await _playerStatsService.GetPlayerStatsAsync(playerId);
        return Ok(result);
    }
}
