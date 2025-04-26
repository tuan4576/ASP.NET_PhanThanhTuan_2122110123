import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7104/api/User/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const userData = response.data;

      if (userData.role === "admin") {
        alert("Bạn không có quyền truy cập!");
        return;
      }

      // Lưu tất cả thông tin user vào localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("id", userData.id.toString());
      localStorage.setItem("email", userData.email);
      localStorage.setItem("role", userData.role);

      alert("Đăng nhập thành công!");
      window.location.href = "/"; // Thay đổi từ navigate sang window.location để reload trang
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng nhập</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <Link to="#" className="text-sm text-blue-500 hover:text-blue-600">
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/auth/register" className="text-blue-500 hover:text-blue-600">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
