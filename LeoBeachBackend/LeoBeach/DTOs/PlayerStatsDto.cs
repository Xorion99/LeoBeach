namespace LeoBeach.DTOs
{
    public class PlayerStatsDto
    {
        public Guid PlayerId { get; set; }
        public List<SkillStatsDto> Skills { get; set; } = new();
    }
}
