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
    [Authorize] // ✅ Bắt buộc phải có token
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Lấy UserId từ Token
        private int GetUserIdFromToken()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userIdClaim = identity.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                {
                    return userId;
                }
            }

            throw new UnauthorizedAccessException("User ID not found in token.");
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            int userId = GetUserIdFromToken();
            return await _context.Cart.Where(c => c.UserId == userId).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> AddToCart(AddToCartRequest request)
        {
            int userId = GetUserIdFromToken(); // Lấy từ token

            var cart = new Cart
            {
                UserId = userId,
                ProductId = request.ProductId,
                Quantity = request.Quantity
            };

            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCarts), new { id = cart.Id }, cart);
        }


        // PUT: api/Cart/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCart(int id, Cart cart)
        {
            int userId = GetUserIdFromToken();

            if (id != cart.Id)
            {
                return BadRequest();
            }

            var existingCart = await _context.Cart.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
            if (existingCart == null)
            {
                return NotFound();
            }

            existingCart.ProductId = cart.ProductId;
            existingCart.Quantity = cart.Quantity;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            int userId = GetUserIdFromToken();
            var cart = await _context.Cart.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
