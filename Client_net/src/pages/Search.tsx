import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Search() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7104/api/Category')
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Bộ lọc tìm kiếm</h2>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Khoảng giá</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="price1" className="mr-2"/>
                  <label htmlFor="price1">Dưới 1 triệu</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price2" className="mr-2"/>
                  <label htmlFor="price2">1 - 3 triệu</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price3" className="mr-2"/>
                  <label htmlFor="price3">3 - 5 triệu</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price4" className="mr-2"/>
                  <label htmlFor="price4">Trên 5 triệu</label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Danh mục</h3>
              <div className="space-y-2">
                {categories.map((category: any) => (
                  <div key={category.id} className="flex items-center">
                    <input type="checkbox" id={`cat${category.id}`} className="mr-2"/>
                    <label htmlFor={`cat${category.id}`}>{category.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Áp dụng
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:w-3/4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Hiển thị 24 sản phẩm</span>
            <select className="border rounded-lg px-4 py-2">
              <option>Sắp xếp theo</option>
              <option>Giá: Thấp đến cao</option>
              <option>Giá: Cao đến thấp</option>
              <option>Mới nhất</option>
              <option>Phổ biến nhất</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <img
                    src="https://cdn.tgdd.vn/hoi-dap/1403305/top-10-mau-day-chuyen-vang-tay-nu-dep-nhat-chat-luong-nam(21)-800x504.jpg"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button className="p-2 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Sản phẩm {item}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-500 font-bold">1,000,000 VND</span>
                    <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 rounded-lg border border-blue-500 bg-blue-500 text-white">1</button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100">2</button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100">3</button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Search
