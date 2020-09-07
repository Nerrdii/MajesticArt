using MajesticArt.Models;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public interface IStripeService
    {
        public Session CreateSession(ApplicationUser user, IEnumerable<ProductDto> products);
    }
}
