import React from 'react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Khai trương cửa hàng mới tại TP.HCM',
    description: 'Chúng tôi hân hạnh khai trương cửa hàng mới với nhiều ưu đãi hấp dẫn dành cho khách hàng trong tuần lễ đầu tiên.',
    image: 'https://apj.vn/wp-content/uploads/2023/06/LTH738-3.jpg',
    date: '15/04/2025',
    category: 'Thông báo',
  },
  {
    id: 2,
    title: 'Chương trình khuyến mãi 30/4 - 1/5',
    description: 'Hàng loạt sản phẩm giảm giá lên đến 50%, đừng bỏ lỡ cơ hội mua sắm giá rẻ.',
    image: 'https://culacstudio.com/wp-content/uploads/2019/06/p-trang-suc-4-2048x1367.jpg',
    date: '12/04/2025',
    category: 'Khuyến mãi',
  },
  {
    id: 3,
    title: 'Tuyển dụng nhân viên bán hàng',
    description: 'Cơ hội làm việc tại môi trường năng động, lương thưởng hấp dẫn. Nộp hồ sơ ngay hôm nay!',
    image: 'http://kann.com.vn/wp-content/uploads/2024/06/Doji-1.jpg',
    date: '10/04/2025',
    category: 'Tuyển dụng',
  },
  {
    id: 4,
    title: 'Chính sách đổi trả mới 2025',
    description: 'Chúng tôi cập nhật chính sách đổi trả dễ dàng và minh bạch hơn để phục vụ khách hàng tốt hơn.',
    image: 'https://hoangphucphoto.com/wp-content/uploads/2023/10/boi-canh-chup-ts.png',
    date: '05/04/2025',
    category: 'Chính sách',
  },
];

const News: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Tin tức & Thông báo</h1>
        <p className="text-gray-500 text-lg">Cập nhật những thông tin mới nhất từ cửa hàng của chúng tôi</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news) => (
          <div key={news.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img src={news.image} alt={news.title} className="w-full h-56 object-cover" />
            <div className="p-5">
              <span className="text-sm text-blue-600 font-semibold">{news.category}</span>
              <h2 className="text-xl font-bold mt-2 mb-1 text-gray-800">{news.title}</h2>
              <p className="text-gray-600 text-sm">{news.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-400">{news.date}</span>
                <button className="text-blue-600 hover:underline text-sm">Xem chi tiết →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
