using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using PhanThanhTuan_2122110123.Data;
using PhanThanhTuan_2122110123.Model;
using PhanThanhTuan_2122110123.Services;
using PhanThanhTuan_2122110123.Services.DTO;

namespace PhanThanhTuan_2122110123.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext pro;
        private readonly JwtService _jwtService;

        public UserController(AppDbContext context, JwtService jwtService)
        {
            pro = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if (pro.User.Any(u => u.Email == model.Email))
                return BadRequest("Email đã được sử dụng");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Password = hashedPassword,
                Address = model.Address
            };

            pro.User.Add(user);
            await pro.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user.Email);

            // Gửi cookie
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });

            return Ok(new { message = "Đăng ký thành công", token, user.Name, user.Email });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO model)
        {
            var user = pro.User.FirstOrDefault(u => u.Email == model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return Unauthorized("Sai email hoặc mật khẩu");

            var token = _jwtService.GenerateToken(user.Email);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });

            return Ok(new { message = "Đăng nhập thành công", token, user.Name, user.Email });
        }

        //[HttpPost("logout")]
        //public IActionResult Logout()
        //{
        //    Response.Cookies.Delete("jwt");
        //    return Ok(new { message = "Đăng xuất thành công" });
        //}
    }
}
