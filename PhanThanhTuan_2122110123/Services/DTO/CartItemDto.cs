namespace PhanThanhTuan_2122110123.Services.DTO
{
    public class CartItemDto
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
    }
}
