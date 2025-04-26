
function Hot() {
  return (
    <div>
      <div className="bg-white text-gray-900">
  <div className="font-sans">
    <div className="p-6 mx-auto lg:max-w-7xl sm:max-w-full">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">Sản phẩm bán chạy nhất</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Product Card */}
        <div className="bg-white shadow-lg border rounded-2xl p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 relative hover:shadow-2xl">
          <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
          </div>
          <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
            <div className="block h-full w-full transition-transform duration-300">
              <img src="https://hidemaison.com/wp-content/uploads/2022/09/hdm8.jpg" className="h-full w-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300">Tên sản phẩm</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-500">500.000 VND</span>
                <span className="text-sm text-gray-500 line-through">700.000 VND</span>
              </div>
              <button 
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Add more product cards here */}
        <div className="bg-white shadow-lg border rounded-2xl p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 relative hover:shadow-2xl">
          <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
          </div>
          <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
            <div className="block h-full w-full transition-transform duration-300">
              <img src="https://hidemaison.com/wp-content/uploads/2022/09/hdm22.jpg" className="h-full w-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300">Tên sản phẩm</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-500">500.000 VND</span>
                <span className="text-sm text-gray-500 line-through">700.000 VND</span>
              </div>
              <button 
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg border rounded-2xl p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 relative hover:shadow-2xl">
          <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
          </div>
          <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
            <div className="block h-full w-full transition-transform duration-300">
              <img src="https://hidemaison.com/wp-content/uploads/2022/09/hdm5-768x768.jpg" className="h-full w-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300">Tên sản phẩm</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-500">500.000 VND</span>
                <span className="text-sm text-gray-500 line-through">700.000 VND</span>
              </div>
              <button 
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg border rounded-2xl p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 relative hover:shadow-2xl">
          <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
          </div>
          <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
            <div className="block h-full w-full transition-transform duration-300">
              <img src="https://hidemaison.com/wp-content/uploads/2022/09/hdm-102.jpg" className="h-full w-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300">Tên sản phẩm</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-500">500.000 VND</span>
                <span className="text-sm text-gray-500 line-through">700.000 VND</span>
              </div>
              <button 
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Hot
