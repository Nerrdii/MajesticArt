using MajesticArt.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAll();
        Task<Category> Get(int id);
        Task<Category> Add(Category category);
        Task<Category> Update(Category category);
        Task<int> Delete(int id);
    }
}
