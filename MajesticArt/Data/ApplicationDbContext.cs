using MajesticArt.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MajesticArt.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>().Property(c => c.Name).IsRequired();
            builder.Entity<Category>().HasMany(c => c.Products).WithOne(p => p.Category).OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Product>().Property(p => p.Name).IsRequired();
            builder.Entity<Product>().Property(p => p.Description).IsRequired();
            builder.Entity<Product>().Property(p => p.Price).IsRequired();
            builder.Entity<Product>().Property(p => p.Status).HasDefaultValue(ProductStatus.Active);

            builder.Entity<ApplicationUser>().OwnsOne(u => u.Address, a =>
            {
                a.Property(a => a.Line1).IsRequired();
                a.Property(a => a.City).IsRequired();
                a.Property(a => a.State).HasMaxLength(2).IsRequired();
                a.Property(a => a.ZipCode).HasMaxLength(5).IsRequired();
            });

            base.OnModelCreating(builder);
        }
    }
}
