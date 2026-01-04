namespace LeoBeach.DTOs
{
    public class SkillStatsDto
    {
        public string SkillCode { get; set; } = null!;
        public string SkillDescription { get; set; } = null!;
        public int Good { get; set; }
        public int Neutral { get; set; }
        public int Bad { get; set; }
    }
}
