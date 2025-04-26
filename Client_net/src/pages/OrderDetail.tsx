import { useState, useEffect } from 'react';
import axios from 'axios';

interface OrderDetailItem {
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  image: string;
  createdAt: string;
  status: string;
}

function OrderDetail() {
  const [orderDetails, setOrderDetails] = useState<OrderDetailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://localhost:7104/api/OrderDetail/user/${userId}`);
        if (response.data) {
          // Ensure we have valid data and transform if needed
          const items = Array.isArray(response.data) ? response.data : [response.data];
          // Add default values for potentially missing properties
          const processedItems = items.map(item => ({
            ...item,
            price: item.price || 0, // Đảm bảo giá không bị null/undefined
            quantity: item.quantity || 0,
            image: item.image || 'anh-avatar-cute-11.jpg'
          }));
          console.log("Processed items:", processedItems); // Log để kiểm tra dữ liệu
          setOrderDetails(processedItems);
        } else {
          setOrderDetails([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Chi tiết đơn hàng</h1>

      {orderDetails.length === 0 ? (
        <p>Không có đơn hàng nào</p>
      ) : (
        <div className="space-y-6">
          {orderDetails.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-4">
                {/* <img
                  src={`https://localhost:7104/images/${item.image}`}
                  alt={item.productName || 'Product image'}
                  className="w-24 h-24 object-cover rounded-md"
                  // onError={(e) => {
                    // const target = e.target as HTMLImageElement;
                    // target.src = 'https://localhost:7104/images/anh-avatar-cute-11.jpg';
                  // }}
                /> */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.productName || 'Unknown Product'}</h3>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  <p className="font-bold text-red-600">Đơn giá: {item.price?.toLocaleString() || '0'} VND</p>
                  <p className="text-gray-600 font-semibold">
                    Tổng tiền: {((item.price || 0) * (item.quantity || 0)).toLocaleString()} VND
                  </p>
                  {/* <p className="text-sm text-gray-500 mt-2">
                    Ngày đặt: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                  </p> */}
                </div>
                <div className="text-right">
                  {item.status && (
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {item.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
