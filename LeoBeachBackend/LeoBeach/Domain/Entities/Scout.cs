namespace LeoBeach.Domain.Entities;

public class Scout
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PairId { get; set; }
    public Pair Pair { get; set; } = null!;
    public Guid? CoachId { get; set; } // UserId
    public Guid? MatchId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

    public ICollection<ScoutEvent> Events { get; set; } = new List<ScoutEvent>();
}
