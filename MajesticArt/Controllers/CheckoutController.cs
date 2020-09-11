using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CheckoutController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IStripeService stripeService;

        public CheckoutController(UserManager<ApplicationUser> userManager, IStripeService stripeService)
        {
            this.userManager = userManager;
            this.stripeService = stripeService;
        }

        /// <summary>
        /// Create a Stripe checkout session from products
        /// </summary>
        /// <param name="products"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Checkout([FromBody] IEnumerable<ProductDto> products)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);

            var session = stripeService.CreateSession(user, products);

            return Ok(new { sessionId = session.Id });
        }
    }
}
