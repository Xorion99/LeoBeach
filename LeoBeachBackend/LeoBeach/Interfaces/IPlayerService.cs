using LeoBeach.DTOs;

namespace LeoBeach.Interfaces
{
    public interface IPlayerService
    {
        Task<IEnumerable<PlayerDto>> GetAllAsync();
        Task<PlayerDto> CreateAsync(CreatePlayerDto dto);
        Task<PlayerDto> UpdateAsync(Guid id, CreatePlayerDto dto);
        Task DeleteAsync(Guid id);
    }

}
