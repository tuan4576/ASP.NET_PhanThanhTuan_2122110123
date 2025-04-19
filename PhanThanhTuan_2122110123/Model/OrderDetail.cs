namespace PhanThanhTuan_2122110123.Model
{
    public class OrderDetail
    {
        //public int Id { get; set; } // Khóa chính
        //public int OrderId { get; set; } // Liên kết đến đơn hàng
        //public int ProductId { get; set; } // Liên kết đến sản phẩm
        //public string ProductName { get; set; } // Tên sản phẩm
        //public decimal UnitPrice { get; set; } // Đơn giá sản phẩm
        //public int Quantity { get; set; } // Số lượng sản phẩm trong đơn hàng

        //public Order Order { get; set; }     // Navigation đến Order
        //public Product Product { get; set; } // Navigation đến Product
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        // public double TotailPrice { get; set; }
        public int? Quantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}
