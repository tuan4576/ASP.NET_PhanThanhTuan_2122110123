import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  cartId: number;
  productId: number;
  quantity: number;
  productName: string;
  price: number;
  image: string;
}

interface OrderDetail {
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

function Order() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          alert('Vui lòng đăng nhập để tiếp tục');
          navigate('/login');
          return;
        }

        const response = await axios.get(`https://localhost:7104/api/Cart/user/${userId}`);
        const items = Array.isArray(response.data) ? response.data : [response.data];
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        alert('Vui lòng đăng nhập để tiếp tục');
        return;
      }

      const orderDetails: OrderDetail[] = cartItems.map(item => ({
        orderId: 0,
        productId: item.productId,
        quantity: item.quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      const orderData = {
        userId: parseInt(userId),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        orderDetails: orderDetails,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await axios.post('https://localhost:7104/api/Order', orderData);
      alert('Đặt hàng thành công!');
      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Có lỗi xảy ra khi đặt hàng');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Thông tin đặt hàng</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-2">Đơn hàng của bạn</h3>
          {cartItems.map(item => (
            <div key={item.cartId} className="flex justify-between py-2">
              <span>{item.productName} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} VND</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Tổng cộng:</span>
              <span>
                {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
}

export default Order;
