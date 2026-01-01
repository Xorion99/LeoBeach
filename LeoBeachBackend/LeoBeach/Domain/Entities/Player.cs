using LeoBeach.Api.Domain.Enums;

namespace LeoBeach.Api.Domain.Entities;

public class Player
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateOnly BirthDate { get; set; }
    public int HeightCm { get; set; }
    public DominantHand DominantHand { get; set; }
    public PlayerRole Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

    public ICollection<PairPlayer> PairPlayers { get; set; } = new List<PairPlayer>();
}
