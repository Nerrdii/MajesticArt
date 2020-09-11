using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CostDetailsController : ControllerBase
    {
        private readonly ICostDetailsService costDetailsService;
        private readonly IProductService productService;

        public CostDetailsController(ICostDetailsService costDetailsService, IProductService productService)
        {
            this.costDetailsService = costDetailsService;
            this.productService = productService;
        }

        /// <summary>
        /// Get cost details (tax, shipping rate, etc.) for a list of products
        /// </summary>
        /// <param name="productIds"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCostDetails([FromQuery] string productIds)
        {
            List<Product> products = new List<Product>();
            string[] ids = productIds.Split(',');

            foreach (var id in ids)
            {
                var product = await productService.Get(int.Parse(id));
                products.Add(product);
            }

            var totalCostDto = costDetailsService.GetCostDetails(products);

            return Ok(totalCostDto);
        }
    }
}
