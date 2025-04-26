  
function Header() {
  return (
    <>
    <div className="top-0 sticky shadow px-6 py-4 flex justify-between items-center bg-white">
      <h1 className="text-xl font-semibold text-black">Trang quản lý</h1>
        <div className="flex rounded-full border-2 border-gray-500 overflow-hidden max-w-md mx-auto">
        <input type="email" placeholder="Tìm kiếm " className="w-full outline-none bg-white text-sm px-10 py-2" />
        <button type="button" className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-white">
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </button>
      </div>
        <div className="flex items-center space-x-4 relative ml-24 mr-8">
          <div className="relative group">
            <button className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600 hover:text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
                  20.118a7.5 7.5 0 0 1 14.998 0A17.933 
                  17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
            <div className="hidden group-focus-within:block  right-0 top-10 w-32 bg-white border rounded-md shadow-lg absolute z-40">
            <button
              onClick={() => console.log("Đăng xuất")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Thông tin
            </button>
            <button
              onClick={() => console.log("Đăng xuất")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cài đặt
            </button>
            <button
              onClick={() => console.log("Đăng xuất")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
