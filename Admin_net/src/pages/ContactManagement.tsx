import React, { useState } from "react";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  contactDate: string;
  status: string;
};

const initialContacts: Contact[] = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123456789", contactDate: "2025-04-10", status: "Chưa xử lý" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", phone: "0987654321", contactDate: "2025-04-11", status: "Đã xử lý" },
  { id: 3, name: "Lê Minh C", email: "c@gmail.com", phone: "0112233445", contactDate: "2025-04-12", status: "Chưa xử lý" },
];

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());

  const handleEdit = (id: number) => {
    alert(`Chỉnh sửa liên hệ ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa liên hệ này?");
    if (confirm) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, status: contact.status === "Đã xử lý" ? "Chưa xử lý" : "Đã xử lý" }
          : contact
      )
    );
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedContacts(newSelected);
  };

  const handleProcessSelected = () => {
    if (selectedContacts.size === 0) {
      alert("Vui lòng chọn liên hệ để xử lý");
    } else {
      alert(`Xử lý các liên hệ ID: ${[...selectedContacts].join(", ")}`);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý liên hệ</h1>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedContacts.size === contacts.length) {
                        setSelectedContacts(new Set());
                      } else {
                        setSelectedContacts(new Set(contacts.map(c => c.id)));
                      }
                    }}
                    checked={selectedContacts.size === contacts.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Số điện thoại</th>
                <th className="text-left p-4">Ngày liên hệ</th>
                <th className="text-left p-4">Trạng thái</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.has(contact.id)}
                      onChange={() => handleCheckboxChange(contact.id)}
                    />
                  </td>
                  <td className="p-4">{contact.id}</td>
                  <td className="p-4">{contact.name}</td>
                  <td className="p-4">{contact.email}</td>
                  <td className="p-4">{contact.phone}</td>
                  <td className="p-4">{contact.contactDate}</td>
                  <td className="p-4">{contact.status}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(contact.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(contact.id)}
                      className={`text-${contact.status === "Đã xử lý" ? "yellow" : "green"}-600 hover:text-${contact.status === "Đã xử lý" ? "yellow" : "green"}-800`}
                      title={contact.status === "Đã xử lý" ? "Ẩn liên hệ" : "Duyệt liên hệ"}
                    >
                      {contact.status === "Đã xử lý" ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    Không có liên hệ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút xử lý cho các liên hệ đã chọn */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedContacts.size} liên hệ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
