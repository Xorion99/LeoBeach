using Microsoft.EntityFrameworkCore;

namespace LeoBeach.Api.Domain.Entities;

[Index(nameof(PlayerId), nameof(PairId), IsUnique = true)]
public class PairPlayer
{
    public Guid PairId { get; set; }
    public Pair Pair { get; set; } = null!;

    public Guid PlayerId { get; set; }
    public Player Player { get; set; } = null!;

    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public DateTime? DeletedAt { get; set; }
}
