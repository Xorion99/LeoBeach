using LeoBeach.Domain.Entities;
using LeoBeach.DTOs;
using LeoBeach.Infrastructure.Persistence;
using LeoBeach.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeoBeach.Application.Players.Services
{
    public class ScoutService : IScoutService
    {
        private readonly LeoBeachDbContext _context;

        public ScoutService(LeoBeachDbContext context)
        {
            _context = context;
        }

        public async Task<CreateScoutDto> CreateScoutAsync(CreateScoutDto dto)
        {
            var pair = await _context.Pairs.FindAsync(dto.PairId);
            if (pair == null)
                throw new InvalidOperationException("Pair not found");

            var scout = new Scout
            {
                PairId = dto.PairId,
                CoachId = dto.CoachId
            };

            _context.Scouts.Add(scout);
            await _context.SaveChangesAsync();

            foreach (var ev in dto.Events)
            {
                var scoutEvent = new ScoutEvent
                {
                    ScoutId = scout.Id,
                    PlayerId = ev.PlayerId,
                    SkillId = ev.SkillId,
                    Value = ev.Value
                };
                _context.ScoutEvents.Add(scoutEvent);
            }

            await _context.SaveChangesAsync();

            return new CreateScoutDto
            {
                Id = scout.Id,
                PairId = scout.PairId,
                CoachId = scout.CoachId
            };
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

        public async Task<PlayerStatsDto> GetPairStatsAsync(Guid pairId)
        {
            var events = await _context.ScoutEvents
                .Where(e => e.DeletedAt == null &&
                            e.Scout.DeletedAt == null &&
                            e.Scout.PairId == pairId)
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
                PlayerId = pairId, // useremo PlayerStatsDto anche per coppie
                Skills = skills
            };
        }


        public async Task<ScoutEventDto> UpdateScoutEventAsync(Guid scoutId, Guid skillId, int value)
        {
            ScoutEvent? scoutEvent = await _context.ScoutEvents
                .FirstOrDefaultAsync(se => se.ScoutId == scoutId && se.SkillId == skillId && se.DeletedAt == null);

            if (scoutEvent == null)
                throw new InvalidOperationException("ScoutEvent non trovato");

            scoutEvent.Value = value;
            await _context.SaveChangesAsync();

            return new ScoutEventDto
            {
                PlayerId = scoutEvent.PlayerId,
                SkillId = scoutEvent.SkillId,
                Value = scoutEvent.Value
            };
        }


    }
}
