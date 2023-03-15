using System.ComponentModel.DataAnnotations;

namespace FavCtitiesAPI.Entities
{
    public class FavCity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The city name is requried")]
        [StringLength(maximumLength:50,ErrorMessage ="City name cannot have more than {0} characters")]
        public string Name { get; set; }
    }
}
