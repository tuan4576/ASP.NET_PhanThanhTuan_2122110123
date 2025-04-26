
function Footer() {
    return (
    <>
    <footer className="font-sans tracking-wide bg-white px-10   border-t-2 pt-5 mt-5">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <div>
      <h4 className="text-gray-950 font-bold text-lg mb-6">Sản phẩm</h4>
      <ul className="space-y-5">
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3  bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950  text-[15px] transition-all no-underline">Nhẫn</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3  bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Dây chuyền</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3  bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Bông tai</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3  bg-gray-950  rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Trang sức cưới</a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-gray-950 font-bold text-lg mb-6">Dịch vụ</h4>
      <ul className="space-y-5">
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Khắc tên miễn phí</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Bảo hành trọn đời</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Đổi trả trong 7 ngày</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Tư vấn phong thủy</a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-gray-950 font-bold text-lg mb-6">Thông tin</h4>
      <ul className="space-y-5">
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Tin tức trang sức</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Cẩm nang chọn trang sức</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Chính sách bảo mật</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Điều khoản mua bán</a>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-gray-950 font-bold text-lg mb-6">Liên hệ</h4>
      <ul className="space-y-5">
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Hotline: 1900 9876</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Email: support@trangsuc.com</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Địa chỉ: 456 Đường XYZ, Quận ABC, TP.HCM</a>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 inline-block mr-3 bg-gray-950 rounded-full"></span>
          <a href="#st" className="text-gray-950 text-[15px] transition-all no-underline">Giờ mở cửa: 9:00 - 21:00</a>
        </li>
      </ul>
    </div>
  </div>
  <div className="border-t text-center border-[#6b5f5f] pt-8 mt-8">
    <p className="text-gray-400 text-base text-center">Copyright © {new Date().getFullYear()} Trang Sức Việt.</p>
  </div>
</footer>



    </>
    )
}

export default Footer
