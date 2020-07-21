using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MajesticArt.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService orderService;

        public OrdersController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await orderService.GetAll();
            return Ok(orders);
        }
    }
}
