namespace LeoBeach.DTOs
{
    public class CreateScoutDto
    {
        public Guid PairId { get; set; }
        public Guid? CoachId { get; set; } // opzionale
        public List<ScoutEventDto> Events { get; set; } = new();
    }

    public class ScoutEventDto
    {
        public Guid PlayerId { get; set; }
        public Guid SkillId { get; set; }
        public int Value { get; set; } // -1, 0, 1
    }
}
