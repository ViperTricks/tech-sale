import React, { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lưu ý: Đổi thành link Render nếu fen đã push code Backend lên online
    fetch("http://localhost:3000/users") 
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi fetch users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-5">Đang tải danh sách...</div>;

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark">Quản lý Thành viên</h4>
        <button className="btn btn-primary shadow-sm rounded-3">
          <i className="bi bi-person-plus-fill me-2"></i>Thêm mới
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Người dùng</th>
                <th>Liên hệ</th>
                <th>Vai trò</th>
                <th>Ngày tham gia</th>
                <th className="pe-4 text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id}>
                  <td className="ps-4 text-muted">#{u.user_id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${u.name}&background=random&color=fff&bold=true`} 
                        className="rounded-circle me-3" width="35" alt="avatar" 
                      />
                      <span className="fw-bold text-dark">{u.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="small fw-medium">{u.email}</div>
                    <div className="small text-muted">{u.phone || 'Chưa có SĐT'}</div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${u.role === 'admin' ? 'bg-danger' : 'bg-info-subtle text-info'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="text-muted small">
                    {new Date(u.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="pe-4 text-end">
                    <button className="btn btn-sm btn-outline-danger border-0"><i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}