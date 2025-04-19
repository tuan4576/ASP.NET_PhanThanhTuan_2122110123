namespace PhanThanhTuan_2122110123.Model
{
public class Order
{
        //public int Id { get; set; } // Khóa chính
        //public string OrderNumber { get; set; } // Số đơn hàng
        ////public DateTime OrderDate { get; set; } // Ngày đặt
        //public string Status { get; set; } // Trạng thái đơn hàng
        //public User User { get; set; }

        //public DateTime CreatedAt { get; set; } = DateTime.Now;
        //public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public int Id { get; set; }

        public int UserId { get; set; }
        public string OrderCode { get; set; } 
        public decimal TotalAmount { get; set; } // Tổng giá trị đơn hàng
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}
