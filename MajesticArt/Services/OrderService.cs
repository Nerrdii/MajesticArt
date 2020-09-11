using MajesticArt.Data;
using MajesticArt.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MajesticArt.Core.Services;

namespace MajesticArt.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext context;

        public OrderService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Order> Add(Order order)
        {
            await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> Get(int id)
        {
            return await context.Orders.Include("User").Include("Products").FirstOrDefaultAsync(order => order.Id == id);
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            return await context.Orders.Include("User").Include("Products").ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetByUserId(string userId)
        {
            return await context.Orders.Include("Products").Where(order => order.UserId == userId).ToListAsync();
        }

        public async Task<Order> Update(Order order)
        {
            context.Orders.Update(order);
            await context.SaveChangesAsync();
            return order;
        }
    }
}
