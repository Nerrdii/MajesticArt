using MajesticArt.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>().Property(c => c.Name).IsRequired();
            builder.Entity<Category>().HasMany(c => c.Products).WithOne(p => p.Category).OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Product>().Property(p => p.Name).IsRequired();
            builder.Entity<Product>().Property(p => p.Description).IsRequired();
            builder.Entity<Product>().Property(p => p.Quantity).IsRequired();
            builder.Entity<Product>().Property(p => p.Price).IsRequired();

            base.OnModelCreating(builder);
        }
    }
}
