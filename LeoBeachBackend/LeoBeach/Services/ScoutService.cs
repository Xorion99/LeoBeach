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

            if (dto.Events != null && dto.Events.Count > 0)
            {
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
            }
            else
            {
                var playerIds = await _context.PairPlayers
                    .Where(pp => pp.PairId == dto.PairId && pp.DeletedAt == null)
                    .Select(pp => pp.PlayerId)
                    .ToListAsync();

                var skills = await _context.Skills
                    .Where(s => s.DeletedAt == null && s.IsActive)
                    .Select(s => s.Id)
                    .ToListAsync();

                foreach (var playerId in playerIds)
                {
                    foreach (var skillId in skills)
                    {
                        _context.ScoutEvents.Add(new ScoutEvent
                        {
                            ScoutId = scout.Id,
                            PlayerId = playerId,
                            SkillId = skillId,
                            Value = 0
                        });
                    }
                }

                await _context.SaveChangesAsync();
            }

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
                    Good = g.Count(x => x.Value > 0),
                    Neutral = g.Count(x => x.Value == 0),
                    Bad = g.Count(x => x.Value < 0)
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
                    Good = g.Count(x => x.Value > 0),
                    Neutral = g.Count(x => x.Value == 0),
                    Bad = g.Count(x => x.Value < 0)
                })
                .ToList();

            return new PlayerStatsDto
            {
                PlayerId = pairId, // useremo PlayerStatsDto anche per coppie
                Skills = skills
            };
        }

        public async Task<IReadOnlyList<ScoutListDto>> GetAllScoutsAsync()
        {
            var scouts = await _context.Scouts
                .Where(s => s.DeletedAt == null)
                .Include(s => s.Pair)
                .OrderByDescending(s => s.CreatedAt)
                .Select(s => new ScoutListDto
                {
                    Id = s.Id,
                    PairId = s.PairId,
                    PairName = s.Pair.Name,
                    CreatedAt = s.CreatedAt
                })
                .ToListAsync();

            return scouts;
        }

        public async Task DeleteScoutAsync(Guid scoutId)
        {
            var scout = await _context.Scouts.FindAsync(scoutId);
            if (scout == null)
                throw new InvalidOperationException("Scout non trovato");

            scout.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }


        public async Task<IReadOnlyList<ScoutSkillDto>> GetScoutSkillsAsync(Guid scoutId, Guid playerId)
        {
            var skills = await _context.ScoutEvents
                .Where(se =>
                    se.ScoutId == scoutId &&
                    se.PlayerId == playerId &&
                    se.DeletedAt == null
                )
                .Select(se => new ScoutSkillDto
                {
                    SkillId = se.SkillId,
                    SkillCode = se.Skill.Code,
                    SkillDescription = se.Skill.Description,
                    Value = se.Value
                })
                .OrderBy(se => se.SkillDescription)
                .ToListAsync();

            return skills;
        }

        public async Task<ScoutEventDto> UpdateScoutEventAsync(Guid scoutId, Guid skillId, Guid playerId, int delta)
        {
            ScoutEvent? scoutEvent = await _context.ScoutEvents
                .FirstOrDefaultAsync(se =>
                    se.ScoutId == scoutId &&
                    se.SkillId == skillId &&
                    se.PlayerId == playerId &&
                    se.DeletedAt == null
                );

            if (scoutEvent == null)
                throw new InvalidOperationException("ScoutEvent non trovato");

            scoutEvent.Value += delta;
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
