using Microsoft.EntityFrameworkCore;
using PhanThanhTuan_2122110123.Model;

namespace PhanThanhTuan_2122110123.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Category { get; set; }
         public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Cart> Cart { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình Role mặc định cho User
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasDefaultValue("user");  // Gán "user" làm giá trị mặc định cho Role
        }
    }
}
