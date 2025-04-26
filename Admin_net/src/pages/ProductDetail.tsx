import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chi tiết sản phẩm</h1>
        
        <div className="space-y-4">
          <div className="mb-4">
            <img 
              src={`https://localhost:7104/images/${product.image}`}
              alt={product.name}
              className="w-full h-[32rem] object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-gray-600">Tên sản phẩm</h2>
              <p className="font-semibold">{product.name}</p>
            </div>

            <div>
              <h2 className="text-gray-600">Giá</h2>
              <p className="font-semibold">{product.price.toLocaleString('vi-VN')} VNĐ</p>
            </div>

            <div className="col-span-2">
              <h2 className="text-gray-600">Mô tả</h2>
              <p className="font-semibold">{product.description}</p>
            </div>

            <div>
              <h2 className="text-gray-600">Ngày tạo</h2>
              <p className="font-semibold">
                {new Date(product.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>

            <div>
              <h2 className="text-gray-600">Cập nhật lần cuối</h2>
              <p className="font-semibold">
                {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
