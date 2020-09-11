using MajesticArt.Core.Models;
using System.Collections.Generic;

namespace MajesticArt.Core.Services
{
    public interface ICostDetailsService
    {
        public CostDetailsDto GetCostDetails(List<Product> products);
    }
}
