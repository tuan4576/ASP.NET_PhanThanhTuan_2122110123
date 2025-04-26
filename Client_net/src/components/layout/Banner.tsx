import { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const images = [
    "https://cdn.tgdd.vn/hoi-dap/1403305/top-10-mau-day-chuyen-vang-tay-nu-dep-nhat-chat-luong-nam(21)-800x504.jpg",
    "https://cdn.tgdd.vn/hoi-dap/1403305/top-10-mau-day-chuyen-vang-tay-nu-dep-nhat-chat-luong-nam(7)-800x494.jpg", 
    "https://cdn.tgdd.vn/hoi-dap/1403305/top-10-mau-day-chuyen-vang-tay-nu-dep-nhat-chat-luong-nam(8)-800x522.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7104/api/Category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4 mt-5 ml-4 mr-4">
        {/* Sidebar */}
        <aside className="col-span-2 bg-white shadow-lg p-4 rounded-xl">
          <p className="font-bold mb-4">Danh mục trang sức</p>
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <li key={category.id} className="border-b border-gray-300 p-2 cursor-pointer hover:pl-4 transition-all duration-300">
                {category.name}
              </li>
            ))}
          </ul>
        </aside>
        {/* Banner chính */}
        <section className="col-span-7 rounded-xl h-[500px] relative group overflow-hidden ">
          <div className="w-full h-full overflow-hidden rounded-xl">
            <img 
              src={images[currentImageIndex]}
              alt="Banner"
              className="w-full h-full object-contain bg-white"
              style={{
                maxHeight: '100%',
                maxWidth: '100%'
              }}
            />
          </div>
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImage}
              className="bg-black/50 h-10 w-10 text-white p-2 rounded-full hover:bg-black/70"
            >
              &#8592;
            </button>
            <button 
              onClick={nextImage}
              className="bg-black/50 h-10 w-10 text-white p-2 rounded-full hover:bg-black/70"
            >
              &#8594;
            </button>
          </div>
        </section>
        {/* Box bên phải */}
        <aside className="col-span-3 flex flex-col gap-4">
          <div className="bg-green-200 rounded-xl flex-1 relative overflow-hidden">
            <img 
              src="https://hidemaison.com/wp-content/uploads/2022/09/hdm-108-768x512.jpg"
              alt="Nhẫn cưới"
              className="w-full h-full object-cover absolute inset-0"
            />
            <p className="font-bold text-white p-4 relative z-10 text-shadow">Nhẫn cưới cao cấp</p>
          </div>
          <div className="bg-yellow-200 rounded-xl flex-1 relative overflow-hidden">
            <img 
              src="https://lamchutaichinh.vn/wp-content/uploads/2021/05/day-chuyen-vang-tay-nu-ngoi-sao.jpg"
              alt="Dây chuyền"
              className="w-full h-full object-cover absolute inset-0"
            />
            <p className="font-bold text-white p-4 relative z-10 text-shadow">Dây chuyền vàng</p>
          </div>
          <div className="bg-pink-200 rounded-xl flex-1 relative overflow-hidden">
            <img 
              src="https://file.hstatic.net/200000567741/file/-gom-day-chuyen-nhan-cuoi-va-hoa-tai__90deb9df830648139a747000fcd9bfeb_grande.jpg"
              alt="Bộ trang sức"
              className="w-full h-full object-cover absolute inset-0"
            />
            <p className="font-bold text-white p-4 relative z-10 text-shadow">Bộ trang sức cưới</p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Banner;
