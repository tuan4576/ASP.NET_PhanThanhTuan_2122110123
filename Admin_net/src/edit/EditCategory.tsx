import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Category/${id}`);
        setFormData({
          name: response.data.name
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin danh mục:", error);
        alert("Không thể lấy thông tin danh mục!");
        navigate("/categorymanagement");
      }
    };
    fetchCategory();
  }, [id, navigate]);

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
      await axios.put(`https://localhost:7104/api/Category/${id}`, formData);
      alert("Cập nhật danh mục thành công!");
      navigate("/categorymanagement");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      alert("Không thể cập nhật danh mục!");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa danh mục</h1>
        
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Pencil size={18} />
              Cập nhật
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

export default EditCategory;
