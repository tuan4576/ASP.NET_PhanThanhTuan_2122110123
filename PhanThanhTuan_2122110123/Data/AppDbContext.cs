using Microsoft.EntityFrameworkCore;
using PhanThanhTuan_2122110123.Model;

namespace PhanThanhTuan_2122110123.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        // public DbSet<Category> Category { get; set; }
        // public DbSet<User> User { get; set; }
        // public DbSet<Order> Order { get; set; }
        // public DbSet<Address> Addresses { get; set; }

    }
}
