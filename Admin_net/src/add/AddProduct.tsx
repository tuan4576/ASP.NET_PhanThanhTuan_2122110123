import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "", 
    price: 0,
    imageFile: null as File | null,
    categoryId: 0
  });

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "imageFile" && 'files' in e.target && e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        [name]: e.target.files![0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: name === "price" ? parseFloat(value) : 
                name === "categoryId" ? parseInt(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("categoryId", formData.categoryId.toString());
      if (formData.imageFile) {
        formDataToSend.append("imageFile", formData.imageFile);
      }

      await axios.post("https://localhost:7104/api/Product", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Thêm sản phẩm thành công!");
      navigate("/productmanagement");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Không thể thêm sản phẩm!");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
        
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
              <option value={0}>Chọn danh mục</option>
              {categories && categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
              Hình ảnh
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Thêm sản phẩm
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

export default AddProduct;
