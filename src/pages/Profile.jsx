import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warn("Vui lòng đăng nhập");
        navigate("/login");
        return;
      }

      const res = await fetch(`${API}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      setUser(data);

      // 🔥 set form khi load
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || ""
      });

    } catch (error) {
      toast.error("Không lấy được thông tin user");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // 🔥 tạo newUser
      const newUser = { ...user, ...form };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      toast.success("Cập nhật thành công");
      setEditing(false);

    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Đang tải...</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">Không có dữ liệu 😢</div>;
  }

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "500px",
          margin: "auto",
          borderRadius: "15px"
        }}
      >
        <h3 className="text-center mb-4">👤 Thông tin cá nhân</h3>
        <p>
          <b>Tên:</b>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          ) : (
            user.name
          )}
        </p>

        <p><b>Email:</b> {user.email}</p>

        <p>
          <b>SĐT:</b>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          ) : (
            user.phone || "Chưa có"
          )}
        </p>

        <p>
          <b>Địa chỉ:</b>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          ) : (
            user.address || "Chưa có"
          )}
        </p>

        <div className="text-center mt-3">
          {editing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleUpdate}>
                Lưu
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;