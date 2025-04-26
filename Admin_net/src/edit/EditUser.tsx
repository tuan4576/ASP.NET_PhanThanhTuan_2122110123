import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};

const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/User/${id}`);
        setUser(response.data);
        
        // Kiểm tra nếu user là admin thì chuyển hướng về trang quản lý
        if (response.data.role === "admin") {
          alert("Không thể chỉnh sửa thông tin của admin!");
          navigate("/usermanagement");
          return;
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        alert("Không thể lấy thông tin người dùng!");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7104/api/User/${id}`, user);
      alert("Cập nhật thông tin thành công!");
      navigate("/usermanagement");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Không thể cập nhật thông tin người dùng!");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa thông tin người dùng</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vai trò
            </label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
            <button
              type="button"
              onClick={() => navigate("/usermanagement")}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
