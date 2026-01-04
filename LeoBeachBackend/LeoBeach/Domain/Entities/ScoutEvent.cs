namespace LeoBeach.Domain.Entities;

public class ScoutEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ScoutId { get; set; }
    public Scout Scout { get; set; } = null!;
    public Guid SkillId { get; set; }
    public Skill Skill { get; set; } = null!;
    public int Value { get; set; } // +1, 0, -1
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

    // Nuova colonna per eventi singolo
    public Guid? PlayerId { get; set; }
    public Player? Player { get; set; }
}
