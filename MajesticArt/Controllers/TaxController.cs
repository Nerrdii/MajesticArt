using MajesticArt.Models;
using MajesticArt.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaxController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly ITaxService taxService;
        private readonly IProductService productService;

        public TaxController(IConfiguration configuration, ITaxService taxService, IProductService productService)
        {
            this.configuration = configuration;
            this.taxService = taxService;
            this.productService = productService;
        }

        [HttpGet]
        [Route("total")]
        public async Task<IActionResult> GetTotal([FromQuery] string productIds)
        {
            List<Product> products = new List<Product>();
            string[] ids = productIds.Split(',');

            foreach (var id in ids)
            {
                var product = await productService.Get(int.Parse(id));
                products.Add(product);
            }

            var totalCostDto = taxService.GetTotalCostDetails(products);

            return Ok(totalCostDto);
        }

        [HttpGet]
        [Route("tax-rate")]
        public IActionResult GetTaxRate()
        {
            decimal taxRate = decimal.Parse(configuration["Business:TaxRate"]) / 100;
            return Ok(taxRate);
        }

        [HttpGet]
        [Route("shipping-rate")]
        public IActionResult GetShippingRate()
        {
            decimal shippingRate = decimal.Parse(configuration["Business:ShippingRate"]);
            return Ok(shippingRate);
        }

        [HttpGet]
        [Route("free-shipping-min")]
        public IActionResult GetFreeShippingMinimum()
        {
            int freeShippingMin = int.Parse(configuration["Business:FreeShippingMin"]);
            return Ok(freeShippingMin);
        }
    }
}