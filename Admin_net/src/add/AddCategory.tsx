import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Category = {
  name: string;
}

function AddCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Category>({
    name: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7104/api/Category", formData);
      alert("Thêm danh mục thành công!");
      navigate("/categorymanagement");
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      alert("Không thể thêm danh mục!");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Thêm danh mục mới</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Tên danh mục
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

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Thêm mới
            </button>
            <button
              type="button"
              onClick={() => navigate("/categorymanagement")}
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

export default AddCategory;
