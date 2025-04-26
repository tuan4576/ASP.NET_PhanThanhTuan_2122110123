// import React, { useState } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// };

// const dummyUsers: User[] = [
//   { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Admin" },
//   { id: 2, name: "Trần Thị B", email: "b@example.com", role: "User" },
//   { id: 3, name: "Lê Văn C", email: "c@example.com", role: "Editor" },
// ];

// const UserManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>(dummyUsers);

//   const handleEdit = (id: number) => {
//     alert(`Sửa người dùng có ID: ${id}`);
//   };

//   const handleDelete = (id: number) => {
//     if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
//       setUsers(users.filter((user) => user.id !== id));
//     }
//   };

//   const handleAdd = () => {
//     alert("Chức năng thêm người dùng chưa được thực hiện.");
//   };

//   return (
//     <div className="w-full p-6">
//     <div className="bg-white rounded-xl shadow-md p-6 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
//         >
//           <Plus size={18} />
//           Thêm người dùng
//         </button>
//       </div>

//       <div className="overflow-x-auto border border-gray-200 rounded-xl">
//         <table className="w-full table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left p-4">ID</th>
//               <th className="text-left p-4">Tên</th>
//               <th className="text-left p-4">Email</th>
//               <th className="text-left p-4">Vai trò</th>
//               <th className="text-left p-4">Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-t border-gray-200">
//                 <td className="p-4">{user.id}</td>
//                 <td className="p-4">{user.name}</td>
//                 <td className="p-4">{user.email}</td>
//                 <td className="p-4">{user.role}</td>
//                 <td className="p-4 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(user.id)}
//                     className="text-blue-600 hover:text-blue-800"
//                     title="Sửa"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="text-red-600 hover:text-red-800"
//                     title="Xóa"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="p-4 text-center text-gray-500">
//                   Không có người dùng nào.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7104/api/User");
      // Extract users array from response data
      if (response.data && response.data.users) {
        setUsers(response.data.users);
        console.log(response.data.users);
      } else {
        console.error("Unexpected data format:", response.data);
        setUsers([]); // Set empty array as fallback
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      alert("Không thể lấy danh sách người dùng!");
      setUsers([]); // Set empty array on error
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edituser/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await axios.delete(`https://localhost:7104/api/User/${id}`);
        setUsers(users.filter(user => user.id !== id));
        alert("Xóa người dùng thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        alert("Không thể xóa người dùng!");
      }
    }
  };

  const handleAdd = () => {
    navigate('/adduser');
  };

  return (
    <div className="w-full p-6">
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Thêm người dùng
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Tên</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">SĐT</th>
              <th className="text-left p-4">Địa chỉ</th>
              <th className="text-left p-4">Vai trò</th>
              <th className="text-left p-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.address}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 flex gap-2">
                  {user.role !== "admin" && (
                    <>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Sửa"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Không có người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default UserManagement;
