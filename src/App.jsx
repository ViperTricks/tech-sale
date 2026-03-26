import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://tech-sale-api.onrender.com/users' // Địa chỉ Backend của bạn

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [editingId, setEditingId] = useState(null)

  // 1. READ: Lấy dữ liệu từ Backend khi load trang
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      alert("Vui lòng nhập đầy đủ thông tin!")
      return
    }

    if (editingId) {
      // 2. UPDATE: Gọi API Cập nhật (PUT)
      try {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        fetchUsers(); // Gọi lại hàm fetchUsers để lấy danh sách mới nhất
        setEditingId(null);
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
      }
    } else {
      // 3. CREATE: Gọi API Thêm mới (POST)
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi thêm mới:", error);
      }
    }

    // Reset form
    setFormData({ name: '', email: '' })
  }

  const handleEdit = (user) => {
    // Đảm bảo không bị lỗi nếu backend trả về email undefined
    setFormData({ name: user.name, email: user.email || '' })
    setEditingId(user.id)
  }

  const handleDelete = async (id) => {
    // 4. DELETE: Gọi API Xóa
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      fetchUsers(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Quản lý Người dùng (Fullstack)</h2>

      {/* Form thêm/sửa người dùng */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          name="name"
          placeholder="Tên người dùng"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit" style={{ cursor: 'pointer' }}>
          {editingId ? 'Cập nhật' : 'Thêm người dùng'}
        </button>
      </form>

      {/* Danh sách người dùng */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <strong>{user.name}</strong> - {user.email || 'Chưa có email'}
            </span>
            <div>
              <button onClick={() => handleEdit(user)} style={{ marginRight: '5px', cursor: 'pointer' }}>Sửa</button>
              <button onClick={() => handleDelete(user.id)} style={{ cursor: 'pointer', color: 'red' }}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      {users.length === 0 && <p>Chưa có người dùng nào. Hãy thêm mới!</p>}
    </div>
  )
}

export default App