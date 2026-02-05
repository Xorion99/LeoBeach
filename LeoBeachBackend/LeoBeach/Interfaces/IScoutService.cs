using LeoBeach.Domain.Entities;
using LeoBeach.DTOs;

namespace LeoBeach.Interfaces
{
    public interface IScoutService
    {
        Task<CreateScoutDto> CreateScoutAsync(CreateScoutDto dto);
        Task<PlayerStatsDto> GetPlayerStatsAsync(Guid playerId);
        Task<PlayerStatsDto> GetPairStatsAsync(Guid pairId);
        Task<IReadOnlyList<ScoutSkillDto>> GetScoutSkillsAsync(Guid scoutId, Guid playerId);
        Task<ScoutEventDto> UpdateScoutEventAsync(Guid scoutId, Guid skillId, Guid playerId, int delta);
        Task<IReadOnlyList<ScoutListDto>> GetAllScoutsAsync();
        Task DeleteScoutAsync(Guid scoutId);

    }
}
