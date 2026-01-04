using LeoBeach.Domain.Entities;
using LeoBeach.DTOs;

namespace LeoBeach.Interfaces
{
    public interface IScoutService
    {
        Task<Scout> CreateScoutAsync(CreateScoutDto dto);
        Task<PlayerStatsDto> GetPlayerStatsAsync(Guid playerId);
        Task<PlayerStatsDto> GetPairStatsAsync(Guid pairId);
    }
}
