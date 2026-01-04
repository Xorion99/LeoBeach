using LeoBeach.Domain.Entities;
using LeoBeach.DTOs;
using LeoBeach.Interfaces;
using LeoBeach.DTOs;
using LeoBeach.Infrastructure.Persistence;
using LeoBeach.Interfaces;
using Microsoft.EntityFrameworkCore;

public class PairService : IPairService
{
    private readonly LeoBeachDbContext _db;

    public PairService(LeoBeachDbContext db)
    {
        _db = db;
    }

    public async Task<PairDto> CreateAsync(CreatePairDto dto)
    {
        if (dto.PlayerIds.Count != 2)
            throw new Exception("A pair must contain exactly two players.");

        var playersExist = await _db.Players
            .CountAsync(p => dto.PlayerIds.Contains(p.Id));

        if (playersExist != 2)
            throw new Exception("One or more players not found.");

        var pair = new Pair
        {
            Name = dto.Name
        };

        foreach (var playerId in dto.PlayerIds)
        {
            pair.PairPlayers.Add(new PairPlayer
            {
                PlayerId = playerId
            });
        }

        _db.Pairs.Add(pair);
        await _db.SaveChangesAsync();

        return new PairDto
        {
            Id = pair.Id,
            Name = pair.Name,
            PlayerIds = pair.PairPlayers.Select(x => x.PlayerId).ToList()
        };
    }

    public async Task<IEnumerable<PairDto>> GetAllAsync()
    {
        return await _db.Pairs
            .Include(p => p.PairPlayers)
            .Select(p => new PairDto
            {
                Id = p.Id,
                Name = p.Name,
                PlayerIds = p.PairPlayers.Select(x => x.PlayerId).ToList()
            })
            .ToListAsync();
    }

    public async Task DeleteAsync(Guid pairId)
    {
        var pair = await _db.Pairs.FindAsync(pairId);
        if (pair == null)
            throw new Exception("Pair not found");

        pair.DeletedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
    }



    public async Task<PlayerStatsDto> GetPairStatsAsync(Guid pairId)
    {
        var events = await _db.ScoutEvents
            .Where(e =>
                e.DeletedAt == null &&
                e.Scout.DeletedAt == null &&
                e.Scout.PairId == pairId
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
            PlayerId = pairId, 
            Skills = skills
        };
    }

}
