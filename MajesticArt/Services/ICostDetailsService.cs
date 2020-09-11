using MajesticArt.Models;
using System.Collections.Generic;

namespace MajesticArt.Services
{
    public interface ICostDetailsService
    {
        public CostDetailsDto GetCostDetails(List<Product> products);
    }
}
