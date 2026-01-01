namespace LeoBeach.DTOs
{
    public class PairDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public List<Guid> PlayerIds { get; set; } = new();
    }

}
