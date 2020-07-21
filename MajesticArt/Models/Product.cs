namespace MajesticArt.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }

        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        public ProductStatus Status { get; set; }
    }

    public enum ProductStatus
    {
        Active,
        Sold
    }
}
