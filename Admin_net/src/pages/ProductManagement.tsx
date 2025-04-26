// import React, { useState } from "react";
// import { Pencil, Trash2, Plus, CheckCircle } from "lucide-react";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   image: string; // Thêm thuộc tính hình ảnh
// };

// const initialProducts: Product[] = [
//   { id: 1, name: "Áo sơ mi trắng", price: 250000, category: "Áo", image: "https://tnj.vn/15758-large_default/vong-co-bac-dep-cho-nu-mat-trang-sao-dcn0236.jpg " },
//   { id: 2, name: "Quần kaki", price: 350000, category: "Quần", image: "https://tnj.vn/15758-large_default/vong-co-bac-dep-cho-nu-mat-trang-sao-dcn0236.jpg" },
//   { id: 3, name: "Giày thể thao", price: 900000, category: "Giày", image: "https://tnj.vn/15758-large_default/vong-co-bac-dep-cho-nu-mat-trang-sao-dcn0236.jpg" },
// ];

// const ProductManagement: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());

//   const handleAdd = () => {
//     alert("Thêm sản phẩm mới");
//   };

//   const handleEdit = (id: number) => {
//     alert(`Sửa sản phẩm ID: ${id}`);
//   };

//   const handleDelete = (id: number) => {
//     const confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
//     if (confirm) {
//       setProducts(products.filter((p) => p.id !== id));
//     }
//   };

//   const handleCheckboxChange = (id: number) => {
//     const newSelected = new Set(selectedProducts);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedProducts(newSelected);
//   };

//   const handleProcessSelected = () => {
//     if (selectedProducts.size === 0) {
//       alert("Vui lòng chọn sản phẩm để xử lý");
//     } else {
//       alert(`Xử lý các sản phẩm ID: ${[...selectedProducts].join(", ")}`);
//     }
//   };

//   return (
//     <div className="w-full p-6">
//       <div className="bg-white rounded-xl shadow-md p-6 w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
//           <button
//             onClick={handleAdd}
//             className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
//           >
//             <Plus size={18} />
//             Thêm sản phẩm
//           </button>
//         </div>

//         <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left p-4">
//                   <input
//                     type="checkbox"
//                     onChange={() => {
//                       if (selectedProducts.size === products.length) {
//                         setSelectedProducts(new Set());
//                       } else {
//                         setSelectedProducts(new Set(products.map(p => p.id)));
//                       }
//                     }}
//                     checked={selectedProducts.size === products.length}
//                   />
//                 </th>
//                 <th className="text-left p-4">ID</th>
//                 <th className="text-left p-4">Hình ảnh</th> {/* Cột hình ảnh */}
//                 <th className="text-left p-4">Tên sản phẩm</th>
//                 <th className="text-left p-4">Giá</th>
//                 <th className="text-left p-4">Danh mục</th>
//                 <th className="text-left p-4">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id} className="border-t border-gray-200">
//                   <td className="p-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.has(product.id)}
//                       onChange={() => handleCheckboxChange(product.id)}
//                     />
//                   </td>
//                   <td className="p-4">{product.id}</td>
//                   <td className="p-4">
//                     {/* Hiển thị hình ảnh sản phẩm */}
//                     <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
//                   </td>
//                   <td className="p-4">{product.name}</td>
//                   <td className="p-4">{product.price.toLocaleString()}₫</td>
//                   <td className="p-4">{product.category}</td>
//                   <td className="p-4 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(product.id)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Sửa"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Xóa"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {products.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-4 text-center text-gray-500">
//                     Không có sản phẩm nào.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Nút xử lý cho các sản phẩm đã chọn */}
//         <div className="flex justify-end gap-4 mt-4">
//           <button
//             onClick={handleProcessSelected}
//             className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
//           >
//             <CheckCircle size={18} />
//             Xử lý {selectedProducts.size} sản phẩm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, CheckCircle, Eye } from "lucide-react";
import apiProduct from "../api/apiProduct";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    apiProduct.getAll()
      .then((res) => setProducts(res))
      .catch((err) => console.error("Lỗi gọi API:", err));
  }, []);

  const handleAdd = () => {
    navigate("/addproduct");
  };

  const handleEdit = (id: number) => {
    navigate(`/editproduct/${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/productdetail/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`https://localhost:7104/api/Product/${id}`);
        setProducts(products.filter((p) => p.id !== id));
        alert("Xóa sản phẩm thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Không thể xóa sản phẩm!");
      }
    }
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const handleProcessSelected = () => {
    if (selectedProducts.size === 0) {
      alert("Vui lòng chọn sản phẩm để xử lý");
    } else {
      alert(`Xử lý các sản phẩm ID: ${[...selectedProducts].join(", ")}`);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm sản phẩm
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedProducts.size === products.length) {
                        setSelectedProducts(new Set());
                      } else {
                        setSelectedProducts(new Set(products.map(p => p.id)));
                      }
                    }}
                    checked={selectedProducts.size === products.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Hình ảnh</th>
                <th className="text-left p-4">Tên sản phẩm</th>
                <th className="text-left p-4">Giá</th>
                <th className="text-left p-4">Danh mục</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                  </td>
                  <td className="p-4">{product.id}</td>
                  <td className="p-4">
                    <img 
                      src={`${import.meta.env.VITE_API_BASE_IMG}${product.image}`} 
                      alt={product.name} 
                      className="w-24 h-24 object-cover rounded" 
                    />
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.price.toLocaleString()}₫</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleView(product.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Xem"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút xử lý cho các sản phẩm đã chọn */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedProducts.size} sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

// import { useEffect, useState } from "react";
// import apiProduct from "../api/apiProduct";

// function App() {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     apiProduct.getAll()
//       .then((res) => setData(res))
//       .catch((err) => console.error("Lỗi gọi API:", err));
//   }, []);
//   console.log(data)
//   return (
//     <div>
//       <h1>My Vite + TS + Axios App</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }

// export default App;
