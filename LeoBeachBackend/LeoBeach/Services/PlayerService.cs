using LeoBeach.Domain.Entities;
using LeoBeach.DTOs;
using LeoBeach.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeoBeach.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly LeoBeachDbContext _db;

        public PlayerService(LeoBeachDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<PlayerDto>> GetAllAsync()
            => await _db.Players
                .Where(p => p.DeletedAt == null)
                .Select(p => new PlayerDto
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    BirthDate = p.BirthDate
                }).ToListAsync();

        public async Task<PlayerDto> CreateAsync(CreatePlayerDto dto)
        {
            var player = new Player
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                BirthDate = dto.BirthDate
            };
            _db.Players.Add(player);
            await _db.SaveChangesAsync();

            return new PlayerDto
            {
                Id = player.Id,
                FirstName = player.FirstName,
                LastName = player.LastName,
                BirthDate = player.BirthDate
            };
        }

        public async Task<PlayerDto> UpdateAsync(Guid id, CreatePlayerDto dto)
        {
            var player = await _db.Players.FindAsync(id);
            if (player == null || player.DeletedAt != null) throw new Exception("Player not found");

            player.FirstName = dto.FirstName;
            player.LastName = dto.LastName;
            player.BirthDate = dto.BirthDate;

            await _db.SaveChangesAsync();

            return new PlayerDto
            {
                Id = player.Id,
                FirstName = player.FirstName,
                LastName = player.LastName,
                BirthDate = player.BirthDate
            };
        }

        public async Task DeleteAsync(Guid id)
        {
            var player = await _db.Players.FindAsync(id);
            if (player == null || player.DeletedAt != null) return;

            player.DeletedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }

}
