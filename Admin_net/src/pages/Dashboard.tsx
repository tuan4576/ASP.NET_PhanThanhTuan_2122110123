import React from "react";
import { BarChart2, ShoppingCart, User, DollarSign } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Tổng quan về các chỉ số của hệ thống</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Số lượng sản phẩm */}
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <ShoppingCart size={24} />
            <h2 className="text-3xl font-bold mt-4">120</h2>
            <p className="text-sm">Sản phẩm</p>
          </div>

          {/* Card 2: Số lượng người dùng */}
          <div className="bg-green-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <User size={24} />
            <h2 className="text-3xl font-bold mt-4">350</h2>
            <p className="text-sm">Người dùng</p>
          </div>

          {/* Card 3: Doanh thu */}
          <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <DollarSign size={24} />
            <h2 className="text-3xl font-bold mt-4">$45,000</h2>
            <p className="text-sm">Doanh thu</p>
          </div>

          {/* Card 4: Đơn hàng */}
          <div className="bg-red-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <ShoppingCart size={24} />
            <h2 className="text-3xl font-bold mt-4">240</h2>
            <p className="text-sm">Đơn hàng</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Thống kê doanh thu</h2>
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-center">
              <BarChart2 size={48} className="text-gray-600" />
            </div>
            <div className="mt-6">
              <p className="text-center text-gray-700">Biểu đồ doanh thu của 6 tháng gần đây</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  