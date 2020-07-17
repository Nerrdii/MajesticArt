using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class StripeWebhookController : Controller
    {
        private readonly IConfiguration configuration;

        public StripeWebhookController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Index()
        {
            string secret = configuration["Stripe:WebhookSecret"];
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], secret);

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;
                    HandleCheckoutSessionCompleted(session);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }

        private void HandleCheckoutSessionCompleted(Session session)
        {
            var service = new SessionService();
            var priceService = new PriceService();
            var priceOptions = new PriceGetOptions { Expand = new List<string> { "product" } };
            StripeList<LineItem> lineItems = service.ListLineItems(session.Id);
            var productIds = new List<string>();

            productIds.AddRange(lineItems.Select(item => {
                var price = priceService.Get(item.PriceId, priceOptions);
                return price.Product.Metadata["AppId"];
            }));
        }
    }
}
