using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaxController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public TaxController(IConfiguration configuration)
        {
            this.configuration = configuration;
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