using System.Collections.Generic;
using System.Security.Claims;
using MajesticArt.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CheckoutController : ControllerBase
    {
        [HttpPost]
        public ActionResult Checkout([FromBody] IEnumerable<ProductDto> products)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

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
                                product.Image != string.Empty ? product.Image : "https://via.placeholder.com/150"
                            },
                            Metadata = new Dictionary<string, string>
                            {
                                { "AppId", product.Id.ToString() }
                            }
                        },
                        UnitAmount = (long)product.Price * 100
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
                CustomerEmail = email,
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "https://localhost:44301/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "https://localhost:44301/cart"
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { sessionId = session.Id });
        }
    }
}
