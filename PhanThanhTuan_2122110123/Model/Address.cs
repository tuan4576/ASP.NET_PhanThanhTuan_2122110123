namespace PhanThanhTuan_2122110123.Model
{
    public class Address
{
    public int Id { get; set; }

    public string Street { get; set; }       // Số nhà, tên đường
    public string Ward { get; set; }         // Phường/Xã
    public string District { get; set; }     // Quận/Huyện
    public string City { get; set; }         // Tỉnh/Thành phố
    public string Country { get; set; }      // Quốc gia

    // public string PostalCode { get; set; }   // Mã bưu điện (tùy chọn)

    // public int UserId { get; set; }          // FK tới User

    // public User User { get; set; }           // Navigation property

    // public DateTime CreatedAt { get; set; } = DateTime.Now;

    // public DateTime? UpdatedAt { get; set; }
}
}
