namespace LeoBeach.DTOs
{
    public class CreateScoutDto
    {
        public Guid Id { get; set; }
        public Guid PairId { get; set; }
        public Guid? CoachId { get; set; } // opzionale
        public List<ScoutEventDto> Events { get; set; } = new();
    }

    public class ScoutEventDto
    {
        public Guid? PlayerId { get; set; }
        public Guid SkillId { get; set; }
        public int Value { get; set; } // punteggio cumulativo
    }

    public class UpdateScoutEventDto
    {
        public Guid PlayerId { get; set; }
        public int Delta { get; set; } // es: +1 / -1
    }

    public class ScoutSkillDto
    {
        public Guid SkillId { get; set; }
        public string SkillCode { get; set; } = null!;
        public string SkillDescription { get; set; } = null!;
        public int Value { get; set; }
    }

    public class ScoutListDto
    {
        public Guid Id { get; set; }
        public Guid PairId { get; set; }
        public string? PairName { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
