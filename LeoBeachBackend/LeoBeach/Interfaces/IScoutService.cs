using LeoBeach.Domain.Entities;
using LeoBeach.DTOs;

namespace LeoBeach.Interfaces
{
    public interface IScoutService
    {
        Task<CreateScoutDto> CreateScoutAsync(CreateScoutDto dto);
        Task<PlayerStatsDto> GetPlayerStatsAsync(Guid playerId);
        Task<PlayerStatsDto> GetPairStatsAsync(Guid pairId);
        Task<ScoutEventDto> UpdateScoutEventAsync(Guid scoutId, Guid skillId, int value);

    }
}
