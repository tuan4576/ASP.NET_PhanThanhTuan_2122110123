import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface CartItem {
  cartId: number;
  productId: number;
  quantity: number;
  productName: string;
  price: number;
  image: string;
}

function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://localhost:7104/api/Cart/user/${userId}`);
        // Ensure response.data is an array
        const items = Array.isArray(response.data) ? response.data : [response.data];
        setCartItems(items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]); // Set empty cart instead of error
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (cartId: number) => {
    try {
      await axios.delete(`https://localhost:7104/api/Cart/${cartId}`);
      setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (cartId: number, productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.put(`https://localhost:7104/api/Cart/${cartId}`, {
        id: cartId,
        productId: productId,
        quantity: newQuantity
      });
      
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.cartId === cartId 
            ? {...item, quantity: newQuantity}
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity');
    }
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout...');
  };

  if (loading) return <div>Loading...</div>;
  if (error === 'User not logged in') return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: CartItem) => (
            <div key={item.cartId} className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center">
                <img 
                  src={`https://localhost:7104/images/${item.image}`} 
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <button 
                      onClick={() => handleUpdateQuantity(item.cartId, item.productId, item.quantity - 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-gray-600">Số lượng: {item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.cartId, item.productId, item.quantity + 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{item.price.toLocaleString()} VND</p>
                <p className="text-gray-600">Tổng: {(item.price * item.quantity).toLocaleString()} VND</p>
                <button
                  onClick={() => handleRemoveItem(item.cartId)}
                  className="text-red-600 hover:text-red-800 mt-2"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="text-right">
              <p className="text-xl font-bold mb-4">
                Tổng cộng: {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()} VND
              </p>
              <Link
                to="/order"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
