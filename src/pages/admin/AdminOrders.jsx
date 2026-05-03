import React, { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ login
        const res = await fetch("http://localhost:3000/orders", {
          headers: {
            "Authorization": `Bearer ${token}`, // Gửi kèm để tránh 401
            "Content-Type": "application/json"
          }
        });

        if (res.status === 401) {
          alert("Phiên đăng nhập hết hạn, vui lòng login lại!");
          return;
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Lỗi kết nối:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4">Mã đơn</th>
            <th>Khách</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.order_id}>
              <td className="ps-4 fw-bold">#ORD-{o.order_id}</td>
              <td>User {o.user_id}</td>
              <td className="text-primary fw-bold">
                {Number(o.total_price).toLocaleString()}₫
              </td>
              <td><span className="badge bg-success">{o.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}