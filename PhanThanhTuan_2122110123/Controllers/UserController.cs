using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using PhanThanhTuan_2122110123.Data;
using PhanThanhTuan_2122110123.Model;
using PhanThanhTuan_2122110123.Services;
using PhanThanhTuan_2122110123.Services.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
                Address = model.Address,
                Role = "user"  // Gán role mặc định là "user"
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

        // [HttpPost("login")]
        // public IActionResult Login([FromBody] LoginDTO model)
        // {
        //     var user = pro.User.FirstOrDefault(u => u.Email == model.Email);
        //     if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
        //         return Unauthorized("Sai email hoặc mật khẩu");

        //     var token = _jwtService.GenerateToken(user.Email);

        //     Response.Cookies.Append("jwt", token, new CookieOptions
        //     {
        //         HttpOnly = true,
        //         Expires = DateTimeOffset.UtcNow.AddDays(7)
        //     });

        //     return Ok(new { message = "Đăng nhập thành công", token, user.Name, user.Email });
        // }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO model)
        {
            var user = pro.User.SingleOrDefault(u => u.Email == model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return Unauthorized("Sai email hoặc mật khẩu");

            var token = _jwtService.GenerateToken(user.Email);

            return Ok(new { message = "Đăng nhập thành công", token, user.Name, user.Id, user.Email,  user.Role });
        }
        // GET: api/user
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = pro.User.ToList();
            return Ok(new { users });
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = pro.User.Find(id);
            if (user == null) return NotFound("Không tìm thấy người dùng");
            return Ok(user);
        }
        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] User model)
        {
            var user = pro.User.Find(id);
            if (user == null) return NotFound("Không tìm thấy người dùng");

            user.Name = model.Name;
            user.Email = model.Email;
            user.Phone = model.Phone;
            user.Address = model.Address;

            // Chỉ hash password nếu nó không rỗng
            if (!string.IsNullOrEmpty(model.Password))
                user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

            await pro.SaveChangesAsync();
            return Ok(new { message = "Cập nhật người dùng thành công", user });
        }



        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await pro.User.FindAsync(id);
            if (user == null) return NotFound("Không tìm thấy người dùng");

            pro.User.Remove(user);
            await pro.SaveChangesAsync();
            return Ok(new { message = "Xóa người dùng thành công" });
        }
    }



    //[HttpPost("logout")]
    //public IActionResult Logout()
    //{
    //    Response.Cookies.Delete("jwt");
    //    return Ok(new { message = "Đăng xuất thành công" });
    //}

}
