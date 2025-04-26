namespace PhanThanhTuan_2122110123.Model
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }

        public string Address { get; set; }

        // public ICollection<Order> Orders { get; set; }

        // public ICollection<Product> Products { get; set; }

        // public ICollection<Category> Category { get; set; }
        public string Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
