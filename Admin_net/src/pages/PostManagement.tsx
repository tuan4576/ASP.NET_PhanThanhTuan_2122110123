import React, { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, CheckCircle } from "lucide-react";

type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
  status: string;
};

const initialPosts: Post[] = [
  { id: 1, title: "Hướng dẫn lập trình React", author: "Nguyễn Văn A", date: "2025-04-10", status: "Đã duyệt" },
  { id: 2, title: "Cách sử dụng Tailwind CSS", author: "Trần Thị B", date: "2025-04-11", status: "Chưa duyệt" },
  { id: 3, title: "Giới thiệu về TypeScript", author: "Lê Minh C", date: "2025-04-12", status: "Đã duyệt" },
];

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());

  const handleEdit = (id: number) => {
    alert(`Chỉnh sửa bài đăng ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa bài đăng này?");
    if (confirm) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, status: post.status === "Đã duyệt" ? "Chưa duyệt" : "Đã duyệt" }
          : post
      )
    );
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPosts(newSelected);
  };

  const handleProcessSelected = () => {
    if (selectedPosts.size === 0) {
      alert("Vui lòng chọn bài đăng để xử lý");
    } else {
      alert(`Xử lý các bài đăng ID: ${[...selectedPosts].join(", ")}`);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý bài đăng</h1>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedPosts.size === posts.length) {
                        setSelectedPosts(new Set());
                      } else {
                        setSelectedPosts(new Set(posts.map(p => p.id)));
                      }
                    }}
                    checked={selectedPosts.size === posts.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tiêu đề</th>
                <th className="text-left p-4">Tác giả</th>
                <th className="text-left p-4">Ngày đăng</th>
                <th className="text-left p-4">Trạng thái</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.has(post.id)}
                      onChange={() => handleCheckboxChange(post.id)}
                    />
                  </td>
                  <td className="p-4">{post.id}</td>
                  <td className="p-4">{post.title}</td>
                  <td className="p-4">{post.author}</td>
                  <td className="p-4">{post.date}</td>
                  <td className="p-4">{post.status}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(post.id)}
                      className={`text-${post.status === "Đã duyệt" ? "yellow" : "green"}-600 hover:text-${post.status === "Đã duyệt" ? "yellow" : "green"}-800`}
                      title={post.status === "Đã duyệt" ? "Ẩn bài" : "Duyệt bài"}
                    >
                      {post.status === "Đã duyệt" ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Không có bài đăng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút xử lý cho các bài đăng đã chọn */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedPosts.size} bài đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
