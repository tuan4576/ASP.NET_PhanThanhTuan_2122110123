namespace PhanThanhTuan_2122110123.Model
{
    public class Product
    {
       public int Id { get; set; } // phải có khóa chính
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; } 
    }
}
