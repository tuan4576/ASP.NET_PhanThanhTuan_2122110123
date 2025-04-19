namespace PhanThanhTuan_2122110123.Model
{
    public class Product
    {
        public int Id { get; set; } // Khóa chính
        public string Name { get; set; }
        public string Description { get; set; } // Mô tả sản phẩm
        public double Price { get; set; }
        // public int Quantity { get; set; } // Số lượng tồn kho
        public string Image { get; set; } // Đường dẫn hình ảnh

        public int CategoryId { get; set; }
        public int UserCreateAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
