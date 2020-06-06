using MajesticArt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
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
