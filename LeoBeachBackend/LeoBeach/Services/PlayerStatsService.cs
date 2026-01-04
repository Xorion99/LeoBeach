using LeoBeach.DTOs;
using LeoBeach.Infrastructure.Persistence;
using LeoBeach.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeoBeach.Application.Players.Services;

public class PlayerStatsService : IPlayerStatsService
{
    private readonly LeoBeachDbContext _context;

    public PlayerStatsService(LeoBeachDbContext context)
    {
        _context = context;
    }

    public async Task<PlayerStatsDto> GetPlayerStatsAsync(Guid playerId)
    {
        var events = await _context.ScoutEvents
            .Where(e =>
                e.DeletedAt == null &&
                e.Scout.DeletedAt == null &&
                e.Scout.Pair.PairPlayers.Any(pp =>
                    pp.PlayerId == playerId &&
                    pp.DeletedAt == null
                )
            )
            .Select(e => new
            {
                e.Skill.Code,
                e.Skill.Description,
                e.Value
            })
            .ToListAsync();

        var skills = events
            .GroupBy(e => new { e.Code, e.Description })
            .Select(g => new SkillStatsDto
            {
                SkillCode = g.Key.Code,
                SkillDescription = g.Key.Description,
                Good = g.Count(x => x.Value == 1),
                Neutral = g.Count(x => x.Value == 0),
                Bad = g.Count(x => x.Value == -1)
            })
            .ToList();

        return new PlayerStatsDto
        {
            PlayerId = playerId,
            Skills = skills
        };
    }
}
