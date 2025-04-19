namespace PhanThanhTuan_2122110123.Model
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }

        public int? Quantity { get; set; }
    }
}
