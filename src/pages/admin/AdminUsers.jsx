import React, { useEffect, useState } from "react";

const API = "http://localhost:3000";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
    address: "",
    password: "",
    status: "active"
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      setUsers(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "customer",
      address: "",
      password: "",
      status: "active"
    });
    setErrors({});
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (u) => {
    setForm({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      role: u.role || "customer",
      address: u.address || "",
      password: "",
      status: u.status || "active"
    });
    setErrors({});
    setEditId(u.user_id);
    setIsModalOpen(true);
  };

  // ======================
  // FIX VALIDATION PASSWORD
  // ======================
  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Thiếu tên";
    if (!form.email.trim()) err.email = "Thiếu email";

    // create user
    if (!editId) {
      if (!form.password.trim()) {
        err.password = "Thiếu mật khẩu";
      } else if (form.password.trim().length < 6) {
        err.password = "Mật khẩu phải >= 6 ký tự";
      }
    }

    // edit user có nhập password thì check
    if (editId && form.password.trim() !== "") {
      if (form.password.trim().length < 6) {
        err.password = "Mật khẩu phải >= 6 ký tự";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xoá?")) return;
    await fetch(`${API}/users/${id}/delete`, { method: "PUT" });
    fetchUsers();
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const url = editId ? `${API}/users/${editId}` : `${API}/users`;
    const method = editId ? "PUT" : "POST";

    const payload = { ...form };

    // không gửi password rỗng khi edit
    if (editId && !payload.password.trim()) {
      delete payload.password;
    }

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setIsModalOpen(false);
    setEditId(null);
    fetchUsers();
  };

  if (loading) return <div className="text-center py-5">⏳ Loading...</div>;

  return (
    <div className="container-fluid p-4">

      {/* HEADER (GIỮ NGUYÊN) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👤 Quản lý Users</h3>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Thêm user
        </button>
      </div>

      {/* TABLE (GIỮ NGUYÊN + STATUS) */}
      <div className="card">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>#{u.user_id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td><span className="badge bg-secondary">{u.role}</span></td>

                <td>
                  <span className={`badge ${
                    u.status === "active" ? "bg-success" : "bg-warning"
                  }`}>
                    {u.status}
                  </span>
                </td>

                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(u)}>
                    ✏️
                  </button>

                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.user_id)}>
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (GIỮ NGUYÊN UI CỦA BẠN) */}
      {isModalOpen && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5>{editId ? "Sửa user" : "Thêm user"}</h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)} />
              </div>

              <div className="modal-body">

                <input
                  className="form-control mb-1"
                  placeholder="Tên"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}

                <input
                  className="form-control mt-2 mb-1"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}

                <input
                  className="form-control mt-2"
                  placeholder="SĐT"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <input
                  className="form-control mt-2"
                  placeholder="Địa chỉ"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />

                <input
                  className="form-control mt-2 mb-1"
                  type="password"
                  placeholder="Mật khẩu"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}

                <select
                  className="form-select mt-2"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>

                {/* ✔ GIỮ STATUS NHƯ CŨ */}
                {editId && (
                  <select
                    className="form-select mt-2"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setIsModalOpen(false)}>
                  Huỷ
                </button>

                <button className="btn btn-success" onClick={handleSubmit}>
                  Lưu
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}