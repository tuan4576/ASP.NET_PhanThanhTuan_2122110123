import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, CheckCircle } from "lucide-react";
import axios from "axios";

type Order = {
  id: number;
  userId: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  orderDetails: any; // You may want to type this more specifically based on your needs
  createdAt: string;
  updatedAt: string;
};

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7104/api/Order');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      setLoading(false);
      console.error('Error fetching orders:', err);
    }
  };

  const handleAdd = async () => {
    alert("Thêm đơn hàng mới");
  };

  const handleEdit = async (id: number) => {
    alert(`Sửa đơn hàng ID: ${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa đơn hàng này?");
    if (confirm) {
      try {
        await axios.delete(`https://localhost:7104/api/Order/${id}`);
        setOrders(orders.filter((o) => o.id !== id));
      } catch (err) {
        alert('Có lỗi xảy ra khi xóa đơn hàng');
      }
    }
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOrders(newSelected);
  };

  const handleProcessSelected = async () => {
    if (selectedOrders.size === 0) {
      alert("Vui lòng chọn đơn hàng để xử lý");
      return;
    }
    
    try {
      alert(`Xử lý các đơn hàng ID: ${[...selectedOrders].join(", ")}`);
    } catch (err) {
      alert('Có lỗi xảy ra khi xử lý đơn hàng');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) return <div className="w-full p-6">Đang tải...</div>;
  if (error) return <div className="w-full p-6 text-red-500">{error}</div>;

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm đơn hàng
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
                      if (selectedOrders.size === orders.length) {
                        setSelectedOrders(new Set());
                      } else {
                        setSelectedOrders(new Set(orders.map(o => o.id)));
                      }
                    }}
                    checked={selectedOrders.size === orders.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên khách hàng</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Số điện thoại</th>
                <th className="text-left p-4">Địa chỉ</th>
                <th className="text-left p-4">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.id)}
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </td>
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">{order.email}</td>
                  <td className="p-4">{order.phone}</td>
                  <td className="p-4">{order.address}</td>
                  <td className="p-4">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedOrders.size} đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
