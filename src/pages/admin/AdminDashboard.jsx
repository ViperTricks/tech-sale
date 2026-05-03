import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState("week"); 
  const [isLoading, setIsLoading] = useState(true); 
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null); // 👈 THÊM: bắt lỗi thay vì crash trắng màn hình

  useEffect(() => {
    const fetchRealData = async () => {
      setIsLoading(true);
      setError(null); // reset lỗi mỗi lần fetch
      try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`http://localhost:3000/dashboard?range=${timeFilter}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.status === 401) {
          alert("Phiên đăng nhập hết hạn!");
          return;
        }

        // 👈 THÊM: kiểm tra response.ok trước khi parse
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.detail || `Lỗi server: ${response.status}`);
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu thống kê:", err);
        setError(err.message); // 👈 lưu lỗi để hiện thông báo, không crash
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealData();
  }, [timeFilter]);

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
  const yAxisFormatter = (value) => {
    if (value >= 1000000) return `${value / 1000000}tr`;
    if (value >= 1000) return `${value / 1000}k`;
    return value;
  };

  // --- LOADING ---
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <h5 className="text-muted">Đang đồng bộ dữ liệu...</h5>
        </div>
      </div>
    );
  }

  // --- LỖI (thay vì crash trắng màn hình) ---
  if (error) {
    return (
      <div className="container-fluid py-3">
        {/* Vẫn giữ nút filter để user có thể đổi sang kỳ khác */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-dark m-0">
            <i className="bi bi-bar-chart-fill text-primary me-2"></i>Báo cáo thống kê
          </h3>
          <div className="btn-group shadow-sm">
            <button className={`btn ${timeFilter === 'day' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTimeFilter('day')}>Hôm nay</button>
            <button className={`btn ${timeFilter === 'week' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTimeFilter('week')}>Tuần này</button>
            <button className={`btn ${timeFilter === 'month' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTimeFilter('month')}>Tháng này</button>
          </div>
        </div>
        <div className="alert alert-warning d-flex align-items-center gap-2 rounded-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-5"></i>
          <div>
            Không có dữ liệu cho kỳ này. <strong>{error}</strong>
          </div>
        </div>
      </div>
    );
  }

  // --- KHÔNG CÓ DATA ---
  if (!dashboardData) return null;

  // --- GIAO DIỆN CHÍNH ---
  return (
    <div className="container-fluid py-3 fade-in">
      <style>{`.fade-in { animation: fadeIn 0.4s; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

      {/* TIÊU ĐỀ */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark m-0">
          <i className="bi bi-bar-chart-fill text-primary me-2"></i>Báo cáo thống kê
        </h3>
        <div className="btn-group shadow-sm">
          <button className={`btn ${timeFilter === 'day' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTimeFilter('day')}>Hôm nay</button>
          <button className={`btn ${timeFilter === 'week' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTimeFilter('week')}>Tuần này</button>
          <button className={`btn ${timeFilter === 'month' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTimeFilter('month')}>Tháng này</button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3">
            <h6 className="text-muted text-uppercase fw-semibold mb-2">Đơn hàng mới</h6>
            <h2 className="fw-bold text-primary m-0">{dashboardData.stats.totalOrders}</h2>
            {dashboardData.stats.trendOrder && (
              <small className={`fw-bold mt-1 ${dashboardData.stats.trendOrder.startsWith('▲') ? 'text-success' : 'text-danger'}`}>
                {dashboardData.stats.trendOrder} so với kỳ trước
              </small>
            )}
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 bg-primary text-white">
            <h6 className="text-white-50 text-uppercase fw-semibold mb-2">Tổng Doanh Thu</h6>
            {/* 👈 FIX: clamp font + nowrap để số không bị vỡ dòng */}
            <h2 className="fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)', whiteSpace: 'nowrap' }}>
              {new Intl.NumberFormat("vi-VN").format(dashboardData.stats.totalRevenue)}đ
            </h2>
            {dashboardData.stats.trendRev && (
              <small className="text-white fw-bold mt-1">
                {dashboardData.stats.trendRev} so với kỳ trước
              </small>
            )}
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3">
            <h6 className="text-muted text-uppercase fw-semibold mb-2">Khách hàng</h6>
            <h2 className="fw-bold text-success m-0">{dashboardData.stats.totalUsers}</h2>
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ */}
      <div className="row">
        {/* Line Chart - Doanh thu */}
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold text-dark mb-4">Biểu đồ doanh thu</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={dashboardData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={yAxisFormatter} />
                  <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN").format(value) + "đ"} />
                  <Line type="monotone" dataKey="doanhThu" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart - Trạng thái */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold text-dark mb-4">Trạng thái đơn hàng</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={dashboardData.orderStatusData}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {dashboardData.orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart - Top sản phẩm */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold text-dark mb-4">Top sản phẩm bán chạy</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={dashboardData.topProductsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="banRa" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}