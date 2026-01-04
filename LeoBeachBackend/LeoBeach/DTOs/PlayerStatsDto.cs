namespace LeoBeach.DTOs
{
    public class PlayerStatsDto
    {
        public Guid PlayerId { get; set; } // Id giocatore
        public string? PlayerName { get; set; } // opzionale
        public List<SkillStatsDto> Skills { get; set; } = new();

        // Statistiche di coppia (aggregato)
        public List<SkillStatsDto> PairSkills { get; set; } = new();
    }
}
