using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
using Microsoft.Extensions.Configuration;
using Stripe.Checkout;
using System;
using System.Collections.Generic;

namespace MajesticArt.Services
{
    public class StripeService : IStripeService
    {
        private readonly IConfiguration configuration;
        private readonly ICostDetailsService costDetailsService;

        public StripeService(IConfiguration configuration, ICostDetailsService costDetailsService)
        {
            this.configuration = configuration;
            this.costDetailsService = costDetailsService;
        }

        public Session CreateSession(ApplicationUser user, IEnumerable<ProductDto> products)
        {
            var lineItems = new List<SessionLineItemOptions>();

            foreach (var product in products)
            {
                lineItems.Add(new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = product.Name,
                            Description = product.Description,
                            Images = new List<string>
                            {
                                product.Image != null && product.Image != string.Empty ? product.Image : "https://via.placeholder.com/150"
                            },
                            Metadata = new Dictionary<string, string>
                            {
                                { "AppId", product.Id.ToString() },
                                { "UserId", user.Id }
                            }
                        },
                        // Must include product tax to send to Stripe
                        UnitAmount = Convert.ToInt64((product.Price * 100) + (costDetailsService.GetCostDetails(new List<Product> { ToProduct(product) }).Tax * 100))
                    },
                    Quantity = 1
                });
            }

            var list = new List<Product>();

            foreach (var productDto in products)
            {
                list.Add(ToProduct(productDto));
            }

            var shipping = costDetailsService.GetCostDetails(list).Shipping;

            // Required to add shipping to line items
            if (shipping > 0)
            {
                lineItems.Add(new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "Shipping",
                            Description = "Shipping",
                            Images = new List<string>
                            {
                                "https://via.placeholder.com/150"
                            },
                            Metadata = new Dictionary<string, string>
                            {
                                { "AppId", "-1" },
                                { "UserId", user.Id }
                            }
                        },
                        UnitAmount = Convert.ToInt64(decimal.Parse(configuration["Business:ShippingRate"]) * 100)
                    },
                    Quantity = 1
                });
            }

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
                {
                    "card"
                },
                CustomerEmail = user.Email,
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "https://localhost:44301/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "https://localhost:44301/cart"
            };

            var service = new SessionService();
            return service.Create(options);
        }

        private Product ToProduct(ProductDto productDto)
        {
            return new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
            };
        }
    }
}
