// import axiosUser from "../api/axiosUser"

// function Register() {
//   return (
//     <>
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Đăng ký tài khoản</h2>
//         <form className="space-y-6">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
//               Họ và tên
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Nhập họ và tên của bạn"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email" 
//               id="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Nhập email của bạn"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Mật khẩu
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Nhập mật khẩu của bạn"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//               Xác nhận mật khẩu
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Nhập lại mật khẩu của bạn"
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="terms"
//               className="h-4 w-4 text-blue-500 border-gray-300 rounded"
//             />
//             <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//               Tôi đồng ý với các điều khoản và điều kiện
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
//           >
//             Đăng ký
//           </button>
//         </form>
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Đã có tài khoản?{' '}
//             <a href="#" className="text-blue-500 hover:text-blue-600">
//               Đăng nhập ngay
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Register
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", 
    address: "",
    password: "",
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Bạn phải đồng ý với điều khoản!");
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
      role: "user",
    }
    try {
      const response = await axios.post('https://localhost:7104/api/User/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Đăng ký thành công:", response.data);
      alert("Đăng ký thành công!");
      navigate("/auth/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Đăng ký tài khoản</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">Tôi đồng ý với các điều khoản và điều kiện</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Đăng ký
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <a href="/auth/login" className="text-blue-500 hover:text-blue-600">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
