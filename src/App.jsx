import { useState } from 'react'
import './App.css'

function App() {
  // State lưu trữ danh sách người dùng
  const [users, setUsers] = useState([])
  // State lưu trữ dữ liệu form đang nhập
  const [formData, setFormData] = useState({ name: '', email: '' })
  // State kiểm tra xem đang ở chế độ thêm mới hay sửa
  const [editingId, setEditingId] = useState(null)

  // Xử lý khi người dùng gõ vào input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Xử lý Thêm (Create) hoặc Cập nhật (Update)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      alert("Vui lòng nhập đầy đủ thông tin!")
      return
    }

    if (editingId) {
      // Cập nhật người dùng hiện tại
      setUsers(users.map(user =>
        user.id === editingId ? { ...user, ...formData } : user
      ))
      setEditingId(null)
    } else {
      // Thêm người dùng mới với ID là timestamp
      setUsers([...users, { id: Date.now(), ...formData }])
    }
    // Reset form
    setFormData({ name: '', email: '' })
  }

  // Xử lý đưa dữ liệu lên form để Sửa
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email })
    setEditingId(user.id)
  }

  // Xử lý Xóa (Delete)
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Quản lý Người dùng</h2>

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
              <strong>{user.name}</strong> - {user.email}
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