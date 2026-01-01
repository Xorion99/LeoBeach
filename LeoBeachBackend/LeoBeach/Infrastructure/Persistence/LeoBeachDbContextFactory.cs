using LeoBeach.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace LeoBeach.Infrastructure.Persistence;

public class LeoBeachDbContextFactory : IDesignTimeDbContextFactory<LeoBeachDbContext>
{
    public LeoBeachDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<LeoBeachDbContext>();
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=leobeachdb;Username=postgres;Password=root");

        return new LeoBeachDbContext(optionsBuilder.Options);
    }
}
