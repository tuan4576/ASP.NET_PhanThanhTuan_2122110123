// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <div className="bg-gray-50">
//   <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
//     <div className="max-w-md w-full">
//       <div className="p-8 rounded-2xl bg-white shadow">
//         <h2 className="text-slate-900 text-center text-3xl font-semibold">Sign in</h2>
//         <form className="mt-12 space-y-6" onSubmit={handleSubmit}  >
//           <div>
//             <label className="text-slate-800 text-sm font-medium mb-2 block">User name</label>
//             <div className="relative flex items-center">
//               <input name="username" type="text" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
//               <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
//                 <circle cx={10} cy={7} r={6} data-original="#000000" />
//                 <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000" />
//               </svg>
//             </div>
//           </div>
//           <div>
//             <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
//             <div className="relative flex items-center">
//               <input name="password" type="password" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
//               <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
//                 <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
//               </svg>
//             </div>
//           </div>
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center">
//               <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
//               <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-800">
//                 Remember me
//               </label>
//             </div>
//             <div className="text-sm">
//               <a href="jajvascript:void(0);" className="text-blue-600 hover:underline font-semibold">
//                 Forgot your password?
//               </a>
//             </div>
//           </div>
//           <div className="!mt-12">
//             <button type="submit" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" >
//               Sign in
//             </button>
//           </div>
//           <p className="text-slate-800 text-sm !mt-6 text-center">Don't have an account? <a href="javascript:void(0);" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }

// export default Login;

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

      if (userData.role !== "admin") {
        alert("Bạn không có quyền truy cập! Chỉ admin mới được phép đăng nhập.");
        return;
      }

      // Lưu tất cả thông tin user vào localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("id", userData.id.toString());
      localStorage.setItem("email", userData.email);
      localStorage.setItem("role", userData.role);

      alert("Đăng nhập thành công!");
      window.location.href = "/dashboard"; // Thay đổi từ navigate sang window.location để reload trang
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
      </div>
    </div>
    </>
  )
}

export default Login
