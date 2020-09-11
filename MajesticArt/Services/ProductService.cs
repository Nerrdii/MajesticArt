using MajesticArt.Data;
using MajesticArt.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MajesticArt.Core.Services;

namespace MajesticArt.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext context;

        public ProductService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Product> Add(Product product)
        {
            await context.Products.AddAsync(product);
            await context.SaveChangesAsync();
            return product;
        }

        public async Task<int> Delete(int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);
            context.Products.Remove(product);
            return await context.SaveChangesAsync();
        }

        public async Task<Product> Get(int id)
        {
            return await context.Products.Include(product => product.Category).FirstAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await context.Products.Include(product => product.Category).ToListAsync();
        }

        public async Task<Product> Update(Product product)
        {
            context.Products.Update(product);
            await context.SaveChangesAsync();
            return product;
        }
    }
}
