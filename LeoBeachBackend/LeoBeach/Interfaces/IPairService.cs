using LeoBeach.DTOs;

namespace LeoBeach.Interfaces
{
    public interface IPairService
    {
        Task<PairDto> CreateAsync(CreatePairDto dto);
        Task<IEnumerable<PairDto>> GetAllAsync();
        Task DeleteAsync(Guid pairId);

        Task<PlayerStatsDto> GetPairStatsAsync(Guid pairId);
    }

}
