using Microsoft.AspNetCore.Mvc;
using FavCtitiesAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace FavCtitiesAPI.Controllers
{
    [ApiController]
    [Route("api/favcities")]
    public class FavCitiesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public FavCitiesController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<FavCity>>> Get()
        {
            return await context.FavCities.ToListAsync();
        }

        [HttpGet("{id:int}", Name = "GetFavCity")]
        public async Task<ActionResult<FavCity>> Get(int id)
        {
            if (!await context.FavCities.AnyAsync(x => x.Id == id))
            {
                return NotFound();
            }

            return await context.FavCities.FirstOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult> Post(FavCity favCity)
        {
            context.Add(favCity);
            await context.SaveChangesAsync();
            return CreatedAtRoute("GetFavCity",new { favCity.Id}, favCity);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (! await context.FavCities.AnyAsync(x => x.Id == id)) 
            {
                return NotFound();
            }

            context.Remove(new FavCity() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
