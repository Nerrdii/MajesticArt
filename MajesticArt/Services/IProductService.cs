using MajesticArt.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> Get(int id);
        Task<Product> Add(Product product);
        Task<Product> Update(Product product);
        Task<int> Delete(int id);
    }
}
