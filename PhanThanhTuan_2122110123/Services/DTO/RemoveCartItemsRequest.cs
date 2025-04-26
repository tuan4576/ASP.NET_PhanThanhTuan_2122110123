namespace PhanThanhTuan_2122110123.Services.DTO
{
    public class RemoveCartItemsRequest
    {
        public int UserId { get; set; }
        public List<int> ProductIds { get; set; }
    }
}
