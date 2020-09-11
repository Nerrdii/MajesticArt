namespace MajesticArt.Core.Models
{
    public class CostDetailsDto
    {
        public decimal Subtotal { get; set; }
        public decimal Shipping { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
    }
}
