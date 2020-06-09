using MajesticArt.Data;
using MajesticArt.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext context;

        public CategoryService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Category> Add(Category category)
        {
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
            return category;
        }

        public async Task<int> Delete(int id)
        {
            var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            context.Categories.Remove(category);
            return await context.SaveChangesAsync();
        }

        public async Task<Category> Get(int id)
        {
            return await context.Categories.FindAsync(id);
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await context.Categories.ToListAsync();
        }

        public async Task<Category> Update(Category category)
        {
            context.Categories.Update(category);
            await context.SaveChangesAsync();
            return category;
        }
    }
}
