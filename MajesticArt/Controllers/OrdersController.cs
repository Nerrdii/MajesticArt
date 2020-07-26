using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MajesticArt.Models;
using MajesticArt.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IOrderService orderService;

        public OrdersController(UserManager<ApplicationUser> userManager, IOrderService orderService)
        {
            this.userManager = userManager;
            this.orderService = orderService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await orderService.GetAll();
            return Ok(orders);
        }

        [HttpGet]
        [Route("user")]
        [Authorize]
        public async Task<IActionResult> GetByUserId()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);
            var orders = await orderService.GetByUserId(user.Id);
            return Ok(orders);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromBody] Order order)
        {
            await orderService.Update(order);

            return Ok(order);
        }
    }
}
