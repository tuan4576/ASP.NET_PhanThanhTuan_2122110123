import React, { useState } from "react";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

type Review = {
  id: number;
  reviewerName: string;
  product: string;
  rating: number;
  reviewDate: string;
  status: string;
};

const initialReviews: Review[] = [
  { id: 1, reviewerName: "Nguyễn Văn A", product: "Sản phẩm 1", rating: 4, reviewDate: "2025-04-10", status: "Đã duyệt" },
  { id: 2, reviewerName: "Trần Thị B", product: "Sản phẩm 2", rating: 5, reviewDate: "2025-04-11", status: "Chưa duyệt" },
  { id: 3, reviewerName: "Lê Minh C", product: "Sản phẩm 3", rating: 3, reviewDate: "2025-04-12", status: "Đã duyệt" },
];

const ReviewManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReviews, setSelectedReviews] = useState<Set<number>>(new Set());

  const handleEdit = (id: number) => {
    alert(`Chỉnh sửa đánh giá ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa đánh giá này?");
    if (confirm) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? { ...review, status: review.status === "Đã duyệt" ? "Chưa duyệt" : "Đã duyệt" }
          : review
      )
    );
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedReviews);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReviews(newSelected);
  };

  const handleProcessSelected = () => {
    if (selectedReviews.size === 0) {
      alert("Vui lòng chọn đánh giá để xử lý");
    } else {
      alert(`Xử lý các đánh giá ID: ${[...selectedReviews].join(", ")}`);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý đánh giá</h1>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedReviews.size === reviews.length) {
                        setSelectedReviews(new Set());
                      } else {
                        setSelectedReviews(new Set(reviews.map(r => r.id)));
                      }
                    }}
                    checked={selectedReviews.size === reviews.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên người đánh giá</th>
                <th className="text-left p-4">Sản phẩm</th>
                <th className="text-left p-4">Điểm đánh giá</th>
                <th className="text-left p-4">Ngày đánh giá</th>
                <th className="text-left p-4">Trạng thái</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedReviews.has(review.id)}
                      onChange={() => handleCheckboxChange(review.id)}
                    />
                  </td>
                  <td className="p-4">{review.id}</td>
                  <td className="p-4">{review.reviewerName}</td>
                  <td className="p-4">{review.product}</td>
                  <td className="p-4">{review.rating}</td>
                  <td className="p-4">{review.reviewDate}</td>
                  <td className="p-4">{review.status}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(review.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(review.id)}
                      className={`text-${review.status === "Đã duyệt" ? "yellow" : "green"}-600 hover:text-${review.status === "Đã duyệt" ? "yellow" : "green"}-800`}
                      title={review.status === "Đã duyệt" ? "Ẩn đánh giá" : "Duyệt đánh giá"}
                    >
                      {review.status === "Đã duyệt" ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    Không có đánh giá nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút xử lý cho các đánh giá đã chọn */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedReviews.size} đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
