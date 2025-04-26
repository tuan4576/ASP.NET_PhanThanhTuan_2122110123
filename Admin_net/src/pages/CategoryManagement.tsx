// import React, { useState } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// type Category = {
//   id: number;
//   name: string;
// };

// const initialCategories: Category[] = [
//   { id: 1, name: "Áo" },
//   { id: 2, name: "Quần" },
//   { id: 3, name: "Giày" },
// ];

// const CategoryManagement: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>(initialCategories);

//   const handleAdd = () => {
//     // TODO: mở form thêm danh mục
//     alert("Thêm danh mục mới");
//   };

//   const handleEdit = (id: number) => {
//     // TODO: sửa danh mục
//     alert(`Sửa danh mục ID: ${id}`);
//   };

//   const handleDelete = (id: number) => {
//     const confirm = window.confirm("Bạn có chắc muốn xóa danh mục này?");
//     if (confirm) {
//       setCategories(categories.filter((category) => category.id !== id));
//     }
//   };

//   return (
//     <div className="w-full p-6">
//       <div className="bg-white rounded-xl shadow-md p-6 w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
//           <button
//             onClick={handleAdd}
//             className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
//           >
//             <Plus size={18} />
//             Thêm danh mục
//           </button>
//         </div>

//         <div className="overflow-x-auto border border-gray-200 rounded-xl">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left p-4">ID</th>
//                 <th className="text-left p-4">Tên danh mục</th>
//                 <th className="text-left p-4">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category) => (
//                 <tr key={category.id} className="border-t border-gray-200">
//                   <td className="p-4">{category.id}</td>
//                   <td className="p-4">{category.name}</td>
//                   <td className="p-4 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(category.id)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Sửa"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(category.id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Xóa"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {categories.length === 0 && (
//                 <tr>
//                   <td colSpan={3} className="p-4 text-center text-gray-500">
//                     Không có danh mục nào.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryManagement;
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  description: string;
};

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7104/api/Category");
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục:", error);
      setCategories([]);
    }
  };

  const handleAdd = () => {
    navigate("/addcategory");
  };

  const handleEdit = (id: number) => {
    navigate(`/editcategory/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await axios.delete(`https://localhost:7104/api/Category/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
        alert("Xóa danh mục thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
        alert("Không thể xóa danh mục!");
      }
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm danh mục
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên danh mục</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-gray-200">
                  <td className="p-4">{category.id}</td>
                  <td className="p-4">{category.name}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    Không có danh mục nào.
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

export default CategoryManagement;
