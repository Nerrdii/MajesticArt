using MajesticArt.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Core.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAll();
        Task<Order> Get(int id);
        Task<IEnumerable<Order>> GetByUserId(string userId);
        Task<Order> Add(Order order);
        Task<Order> Update(Order order);
    }
}
