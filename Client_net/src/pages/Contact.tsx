import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert('Cảm ơn bạn đã gửi liên hệ!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Gửi liên hệ cho chúng tôi</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              />
              <input
                type="text"
                name="subject"
                placeholder="Chủ đề"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              />
            </div>

            <textarea
              name="message"
              placeholder="Nội dung tin nhắn..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h3>
          <div className="space-y-4 text-gray-700 text-sm">
            <div>
              <strong>Địa chỉ:</strong>
              <p>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
            </div>
            <div>
              <strong>Điện thoại:</strong>
              <p>0909 123 456</p>
            </div>
            <div>
              <strong>Email:</strong>
              <p>lienhe@shopcuatoi.vn</p>
            </div>
            <div>
              <strong>Thời gian làm việc:</strong>
              <p>Thứ 2 - Thứ 7: 8:00 - 17:00</p>
            </div>
          </div>

          {/* Bản đồ demo (có thể thay bằng Google Map thật) */}
          <div className="mt-6">
            <iframe
              title="Map"
              src="https://maps.google.com/maps?q=Ho%20Chi%20Minh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-60 rounded-md border"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
