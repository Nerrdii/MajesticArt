using MajesticArt.Core.Models;
using Stripe.Checkout;
using System.Collections.Generic;

namespace MajesticArt.Core.Services
{
    public interface IStripeService
    {
        public Session CreateSession(ApplicationUser user, IEnumerable<ProductDto> products);
    }
}
