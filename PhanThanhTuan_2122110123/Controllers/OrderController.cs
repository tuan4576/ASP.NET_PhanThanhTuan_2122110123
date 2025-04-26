using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhanThanhTuan_2122110123.Data;
using PhanThanhTuan_2122110123.Model;
using System.Linq;
using System.Threading.Tasks;

namespace PhanThanhTuan_2122110123.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext pro;

        public OrderController(AppDbContext context)
        {
            pro = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await pro.Order
                /*.Include(o => o.OrderDetails)*/ // Bao gồm các chi tiết đơn hàng
                .ToListAsync();
        }


        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await pro.Order
                /*.Include(o => o.OrderDetails)*/ // Bao gồm các chi tiết đơn hàng
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

       
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (string.IsNullOrEmpty(order.Name) || string.IsNullOrEmpty(order.Phone) ||
                string.IsNullOrEmpty(order.Email) || string.IsNullOrEmpty(order.Address))
            {
                return BadRequest("Các trường Name, Phone, Email và Address là bắt buộc.");
            }

            if (order.OrderDetails == null || !order.OrderDetails.Any())
            {
                return BadRequest("Đơn hàng phải có ít nhất một sản phẩm.");
            }

            foreach (var detail in order.OrderDetails)
            {
                var product = await pro.Products.FindAsync(detail.ProductId);
                if (product == null)
                {
                    return BadRequest($"Sản phẩm với ID {detail.ProductId} không tồn tại.");
                }

                if (product.Quantity < detail.Quantity)
                {
                    return BadRequest($"Sản phẩm '{product.Name}' không đủ hàng. Hiện có: {product.Quantity}, cần: {detail.Quantity}");
                }

                product.Quantity -= detail.Quantity;
                pro.Entry(product).State = EntityState.Modified;
            }

            pro.Order.Add(order);
            await pro.SaveChangesAsync();

            // 🔥 Xóa giỏ hàng sau khi đặt hàng (dựa vào UserId)
            var cartsToRemove = pro.Cart.Where(c => c.UserId == order.UserId);
            pro.Cart.RemoveRange(cartsToRemove);
            await pro.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }


        
    }

}
