namespace PhanThanhTuan_2122110123.Model
{
public class Order
{
    public int Id { get; set; }

    public string CustomerName { get; set; }

    public string ShippingAddress { get; set; }
    
    public decimal TotalAmount { get; set; }
}
}
