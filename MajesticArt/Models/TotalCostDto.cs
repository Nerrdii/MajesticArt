using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Models
{
    public class TotalCostDto
    {
        public decimal Subtotal { get; set; }
        public decimal Shipping { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
    }
}
