using MajesticArt.Data.DataTransferObjects;
using MajesticArt.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> Get(int id);
        Task<Product> Add(ProductDTO productDto);
        Task<Product> Update(Product product);
        Task<int> Delete(int id);
    }
}
