namespace LeoBeach.Api.Domain.Entities;

public class Pair
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public bool IsTemporary { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

    public ICollection<PairPlayer> PairPlayers { get; set; } = new List<PairPlayer>();
}
