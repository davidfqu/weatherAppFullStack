using Microsoft.EntityFrameworkCore;
using FavCtitiesAPI.Entities;

namespace FavCtitiesAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<FavCity> FavCities { get; set; }
    }
}
