import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  userCreateAt: number;
  createdAt: string;
  updatedAt: string;
}

type Category = {
  id: number;
  name: string;
  description: string;
}

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    image: "",
    categoryId: 0,
    userCreateAt: 0,
    createdAt: "",
    updatedAt: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Product/${id}`);
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        alert("Không thể lấy thông tin sản phẩm!");
      }
    };
    fetchProduct();

    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:7104/api/Category");
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === "price" || name === "categoryId" ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7104/api/Product/${id}`, formData);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/productmanagement");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Không thể cập nhật sản phẩm!");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sản phẩm</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Giá
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={() => navigate("/productmanagement")}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
