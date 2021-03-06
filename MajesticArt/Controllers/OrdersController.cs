﻿using System.Security.Claims;
using System.Threading.Tasks;
using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
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
        private readonly IEmailService emailService;

        public OrdersController(UserManager<ApplicationUser> userManager, IOrderService orderService, IEmailService emailService)
        {
            this.userManager = userManager;
            this.orderService = orderService;
            this.emailService = emailService;
        }

        /// <summary>
        /// Get all orders
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await orderService.GetAll();
            return Ok(orders);
        }

        /// <summary>
        /// Get a single order by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);
            var order = await orderService.Get(id);

            if (order == null)
            {
                return NotFound();
            }

            if (order.UserId != user.Id)
            {
                return Unauthorized();
            }

            return Ok(order);
        }

        /// <summary>
        /// Get orders for the current user
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Update an existing order
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromBody] Order order)
        {
            var user = order.User;
            string body = $"<h1>Order status updated</h1><a href=\"https://localhost:44301/orders/{order.Id}\">View order details</a>";

            emailService.Send(user.Email, user.FullName, "Order Update", body);

            await orderService.Update(order);

            return Ok(order);
        }
    }
}
