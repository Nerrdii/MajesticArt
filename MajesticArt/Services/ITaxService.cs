using MajesticArt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public interface ITaxService
    {
        public TotalCostDto GetTotalCostDetails(List<Product> products);
    }
}
