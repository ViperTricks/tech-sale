import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      fetch(`${API}/user/${localUser.id}`)
        .then(res => res.json())
        .then(data => setUser(data));
    }
  }, []);

  if (!user) return <h3 className="text-center mt-5">Không tải được dữ liệu 😢</h3>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", margin: "auto", borderRadius: "15px" }}>
        <h3 className="text-center mb-4">👤 Thông tin cá nhân</h3>

        <p><b>ID:</b> {user.user_id}</p>
        <p><b>Tên:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>SĐT:</b> {user.phone || "Chưa có"}</p>
        <p><b>Địa chỉ:</b> {user.address || "Chưa có"}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;