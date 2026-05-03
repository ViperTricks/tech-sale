import React, { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // ======================
        // HANDLE 401
        // ======================
        if (res.status === 401) {
          alert("Phiên đăng nhập hết hạn!");
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        // ======================
        // SAFE CHECK (QUAN TRỌNG)
        // ======================
        setOrders(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Lỗi kết nối:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ======================
  // LOADING STATE
  // ======================
  if (loading) {
    return <p className="text-center mt-4">Đang tải đơn hàng...</p>;
  }

  // ======================
  // SAFE DATA
  // ======================
  const safeOrders = Array.isArray(orders) ? orders : [];

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
          {safeOrders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Không có đơn hàng
              </td>
            </tr>
          ) : (
            safeOrders.map((o) => (
              <tr key={o.order_id}>
                <td className="ps-4 fw-bold">
                  #ORD-{o.order_id}
                </td>

                <td>User {o.user_id}</td>

                <td className="text-primary fw-bold">
                  {Number(o.total_price).toLocaleString()}₫
                </td>

                <td>
                  <span className="badge bg-success">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}