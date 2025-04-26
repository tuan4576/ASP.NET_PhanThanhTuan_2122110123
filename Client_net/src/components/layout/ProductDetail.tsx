import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
        return;
      }

      const cartData = {
        userId: parseInt(userId),
        productId: parseInt(id!),
        quantity: quantity
      };

      await axios.post('https://localhost:7104/api/Cart', cartData);
      alert('Thêm vào giỏ hàng thành công!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={`https://localhost:7104/images/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">
                {product.price?.toLocaleString()} VND
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice?.toLocaleString()} VND
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Số lượng</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x py-2"
                />
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className="text-gray-500">Còn {product.stock} sản phẩm</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
