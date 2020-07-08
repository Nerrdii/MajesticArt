namespace MajesticArt.Models
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public int? CategoryId { get; set; }
    }
}
