using MajesticArt.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public class TaxService : ITaxService
    {
        private readonly IConfiguration configuration;

        public TaxService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public TotalCostDto GetTotalCostDetails(List<Product> products)
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

            var totalCostDto = new TotalCostDto
            {
                Subtotal = subtotal,
                Tax = tax,
                Shipping = isFreeShipping ? 0 : shippingRate,
                Total = total
            };

            return totalCostDto;
        }
    }
}
