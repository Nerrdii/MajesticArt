﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe.Checkout;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    public class StripeWebhookController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IOrderService orderService;
        private readonly IProductService productService;
        private readonly IEmailService emailService;
        private readonly ICostDetailsService taxService;
        private readonly UserManager<ApplicationUser> userManager;

        public StripeWebhookController(
            IConfiguration configuration,
            IOrderService orderService,
            IProductService productService,
            IEmailService emailService,
            ICostDetailsService taxService,
            UserManager<ApplicationUser> userManager
            )
        {
            this.configuration = configuration;
            this.orderService = orderService;
            this.productService = productService;
            this.emailService = emailService;
            this.taxService = taxService;
            this.userManager = userManager;
        }

        /// <summary>
        /// Listen for Stripe webhook events
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Index()
        {
            string secret = configuration["Stripe:WebhookSecret"];
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = Stripe.EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], secret);

                if (stripeEvent.Type == Stripe.Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;
                    await HandleCheckoutSessionCompleted(session);
                }

                return Ok();
            }
            catch (Stripe.StripeException e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }

        private async Task HandleCheckoutSessionCompleted(Session session)
        {
            var service = new SessionService();
            var priceService = new Stripe.PriceService();
            var priceOptions = new Stripe.PriceGetOptions { Expand = ["product"] };
            Stripe.StripeList<Stripe.LineItem> lineItems = service.ListLineItems(session.Id);
            var productIds = new List<string>();
            var userId = "";

            productIds.AddRange(lineItems.Select(item => {
                var price = priceService.Get(item.Price.Id, priceOptions);
                userId = price.Product.Metadata["UserId"];
                return price.Product.Metadata["AppId"];
            // Filter out shipping line item if it was included
            }).Where(item => !item.Equals("-1")));

            await AddOrder(productIds, userId);
        }

        private async Task AddOrder(List<string> productIds, string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            var products = new List<Product>();

            foreach (var id in productIds)
            {
                var product = await productService.Get(int.Parse(id));
                product.Status = ProductStatus.Sold;
                await productService.Update(product);
                products.Add(product);
            }

            Order order = new Order
            {
                Products = products,
                Total = taxService.GetCostDetails(products).Total,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                User = user,
                UserId = user.Id
            };

            await orderService.Add(order);
            SendEmail(user, order);
        }

        private void SendEmail(ApplicationUser user, Order order)
        {
            string body = $"<h1>Order is confirmed</h1><a href=\"https://localhost:44301/orders/{order.Id}\">View order details</a>";
            emailService.Send(user.Email, user.FullName, "Order Confirmation", body);
        }
    }
}
