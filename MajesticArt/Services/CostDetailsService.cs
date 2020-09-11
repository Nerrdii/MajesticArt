using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace MajesticArt.Services
{
    public class CostDetailsService : ICostDetailsService
    {
        private readonly IConfiguration configuration;

        public CostDetailsService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public CostDetailsDto GetCostDetails(List<Product> products)
        {
            decimal taxRate = decimal.Parse(configuration["Business:TaxRate"]) / 100;
            decimal shippingRate = decimal.Parse(configuration["Business:ShippingRate"]);
            int freeShippingMin = int.Parse(configuration["Business:FreeShippingMin"]);

            decimal subtotal = 0;

            foreach (var product in products)
            {
                subtotal += product.Price;
            }

            bool isFreeShipping = subtotal >= freeShippingMin;
            decimal tax = subtotal * taxRate;
            decimal totalBeforeShipping = subtotal + tax;
            decimal totalWithShipping = totalBeforeShipping + shippingRate;
            decimal total = isFreeShipping ? totalBeforeShipping : totalWithShipping;

            return new CostDetailsDto
            {
                Subtotal = subtotal,
                Tax = tax,
                Shipping = isFreeShipping ? 0 : shippingRate,
                Total = total
            };
        }
    }
}
