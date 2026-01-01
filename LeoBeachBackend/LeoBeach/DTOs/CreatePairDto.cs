namespace LeoBeach.DTOs
{
    public class CreatePairDto
    {
        public string? Name { get; set; }
        public List<Guid> PlayerIds { get; set; } = new();
    }

}
