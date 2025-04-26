import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";

type OrderDetail = {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
};

const OrderDetail: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get('https://localhost:7104/api/OrderDetail');
      setOrderDetails(response.data);
      setLoading(false);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      setLoading(false);
      console.error('Error fetching order details:', err);
    }
  };

  if (loading) return <div className="w-full p-6">Đang tải...</div>;
  if (error) return <div className="w-full p-6 text-red-500">{error}</div>;

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Mã đơn hàng</th>
                <th className="text-left p-4">Tên sản phẩm</th>
                {/* <th className="text-left p-4">Số lượng</th> */}
                <th className="text-left p-4">Đơn giá</th>
                <th className="text-left p-4">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail) => (
                <tr key={detail.id} className="border-t border-gray-200">
                  <td className="p-4">{detail.id}</td>
                  <td className="p-4">{detail.orderId}</td>
                  <td className="p-4">{detail.productName}</td>
                  {/* <td className="p-4">{detail.quantity}</td> */}
                  <td className="p-4">{detail.price?.toLocaleString('vi-VN') ?? 0} đ</td>
                  <td className="p-4">{detail.total?.toLocaleString('vi-VN') ?? 0} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
