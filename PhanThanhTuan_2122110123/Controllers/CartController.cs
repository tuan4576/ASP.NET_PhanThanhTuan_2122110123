using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhanThanhTuan_2122110123.Data;
using PhanThanhTuan_2122110123.Model;
using PhanThanhTuan_2122110123.Services.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PhanThanhTuan_2122110123.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext pro;

        public CartController(AppDbContext context)
        {
            pro = context;
        }

    
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems(int userId)
        {
            var cartItems = await pro.Cart
                .Where(c => c.UserId == userId)
                .OrderByDescending(c => c.Id) // Hoặc OrderBy nếu muốn sắp xếp theo thứ tự khác
                .Join(
                    pro.Products,
                    cart => cart.ProductId,
                    product => product.Id,
                    (cart, product) => new CartItemDto
                    {
                        CartId = cart.Id,
                        ProductId = product.Id,
                        Quantity = cart.Quantity,
                        ProductName = product.Name,
                        Price = product.Price,
                        Image = product.Image // Đường dẫn ảnh
                    }
                )
                .ToListAsync(); // Lấy tất cả sản phẩm trong giỏ hàng

            if (cartItems == null || !cartItems.Any())
            {
                return NotFound("Không tìm thấy sản phẩm nào trong giỏ hàng.");
            }

            return Ok(cartItems);
        }



        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart([FromBody] Cart cart)
        {
            try
            {
                var existingCartItem = await pro.Cart
                    .FirstOrDefaultAsync(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId);

                if (existingCartItem != null)
                {
                    // Nếu sản phẩm đã có trong giỏ, tăng số lượng
                    existingCartItem.Quantity += cart.Quantity;
                    pro.Entry(existingCartItem).State = EntityState.Modified;
                }
                else
                {
                    // Nếu chưa có, thêm mới
                    pro.Cart.Add(cart);
                }

                await pro.SaveChangesAsync();
                return Ok(cart);
            }
            catch (DbUpdateException dbEx)
            {
                Console.Error.WriteLine(dbEx.InnerException?.Message ?? dbEx.Message);
                return BadRequest(new { error = dbEx.InnerException?.Message ?? dbEx.Message });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(500, new { error = ex.Message });
            }
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
                return BadRequest("ID giỏ hàng không khớp.");

            var existingCartItem = await pro.Cart.FirstOrDefaultAsync(c => c.Id == id);

            if (existingCartItem == null)
            {
                return NotFound("Không tìm thấy sản phẩm trong giỏ hàng.");
            }

            // Cập nhật các thông tin trong giỏ hàng
            existingCartItem.ProductId = cart.ProductId;
            existingCartItem.Quantity = cart.Quantity;

            pro.Entry(existingCartItem).State = EntityState.Modified;

            try
            {
                await pro.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!pro.Cart.Any(c => c.Id == id))
                    return NotFound("Không tìm thấy sản phẩm trong giỏ hàng.");
                else
                    throw;
            }

            return NoContent();
        }



        // DELETE: api/Cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await pro.Cart.FindAsync(id);
            if (cart == null)
                return NotFound();

            pro.Cart.Remove(cart);
            await pro.SaveChangesAsync();

            return NoContent();
        }

      

    }
}
