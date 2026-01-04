using LeoBeach.DTOs;

namespace LeoBeach.Interfaces
{
    public interface IPlayerStatsService
    {
        Task<PlayerStatsDto> GetPlayerStatsAsync(Guid playerId);
    }
}
