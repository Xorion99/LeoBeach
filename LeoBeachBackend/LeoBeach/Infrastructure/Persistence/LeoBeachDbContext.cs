using LeoBeach.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class LeoBeachDbContext : DbContext
{
    public LeoBeachDbContext(DbContextOptions<LeoBeachDbContext> options)
        : base(options)
    {
    }

    public DbSet<Player> Players => Set<Player>();
    public DbSet<Pair> Pairs => Set<Pair>();
    public DbSet<PairPlayer> PairPlayers => Set<PairPlayer>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Scout> Scouts => Set<Scout>();
    public DbSet<ScoutEvent> ScoutEvents => Set<ScoutEvent>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PairPlayer>()
            .HasKey(pp => new { pp.PlayerId, pp.PairId });

        modelBuilder.Entity<Player>().HasQueryFilter(p => p.DeletedAt == null);
        modelBuilder.Entity<Pair>().HasQueryFilter(p => p.DeletedAt == null);
        modelBuilder.Entity<PairPlayer>().HasQueryFilter(pp => pp.DeletedAt == null);
        modelBuilder.Entity<Skill>().HasQueryFilter(s => s.DeletedAt == null);
        modelBuilder.Entity<Scout>().HasQueryFilter(s => s.DeletedAt == null);
        modelBuilder.Entity<ScoutEvent>().HasQueryFilter(se => se.DeletedAt == null);
        modelBuilder.Entity<User>().HasQueryFilter(u => u.DeletedAt == null);
    }

}
