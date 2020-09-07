using MajesticArt.Models;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public class StripeService : IStripeService
    {
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
                        UnitAmount = Convert.ToInt64(product.Price * 100)
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
    }
}
