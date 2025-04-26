using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhanThanhTuan_2122110123.Data;
using PhanThanhTuan_2122110123.Model;
using Microsoft.EntityFrameworkCore;

namespace PhanThanhTuan_2122110123.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext pro;

        public OrderDetailController(AppDbContext context)
        {
            pro = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetOrderDetails()
        {
            var result = await pro.OrderDetails
                .Join(pro.Products,
                    od => od.ProductId,
                    p => p.Id,
                    (od, p) => new
                    {
                        od.Id,
                        od.OrderId,
                        od.ProductId,
                        ProductName = p.Name,
                        Quantity = od.Quantity,
                        Price = p.Price,
                        Total = od.Quantity * p.Price
                    })
                .ToListAsync();

            return Ok(result);
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrderDetailsByUserId(int userId)
        {
            var orderIds = await pro.Order
                .Where(o => o.UserId == userId)
                .Select(o => o.Id)
                .ToListAsync();

            var result = await pro.OrderDetails
                .Where(od => orderIds.Contains(od.OrderId))
                .Join(pro.Products,
                    od => od.ProductId,
                    p => p.Id,
                    (od, p) => new
                    {
                        od.Id,
                        od.OrderId,
                        od.ProductId,
                        ProductName = p.Name,
                        Quantity = od.Quantity,
                        Price = p.Price, // Lấy giá hiện tại của sản phẩm
                        Total = od.Quantity * p.Price
                    })
                .ToListAsync();
            return Ok(result);
        }
    }
}
