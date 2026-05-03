import { Outlet, Link, useLocation } from "react-router-dom";

const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { return null; }
};

export default function AdminLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const user = getUser();

  const sidebarItemStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    borderRadius: "10px",
    marginBottom: "8px",
    transition: "all .3s ease",
    textDecoration: "none",
    fontWeight: "500",
    color: isActive(path) ? "#fff" : "#94a3b8",
    backgroundColor: isActive(path) ? "#3b82f6" : "transparent",
    boxShadow: isActive(path) ? "0 4px 12px rgba(59,130,246,.4)" : "none",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <style>{`body{margin:0!important;padding:0!important}main{padding-top:0!important}`}</style>

      <aside style={{
        width: 260, background: "#0f172a", color: "#fff", padding: "25px 20px",
        display: "flex", flexDirection: "column", position: "fixed", height: "100vh", zIndex: 100
      }}>
        <nav>
          <Link to="/admin" style={sidebarItemStyle("/admin")}><i className="bi bi-grid-1x2-fill me-3"></i>Dashboard</Link>
          <Link to="/admin/products" style={sidebarItemStyle("/admin/products")}><i className="bi bi-box-seam-fill me-3"></i>Sản phẩm</Link>
          <Link to="/admin/users" style={sidebarItemStyle("/admin/users")}><i className="bi bi-people-fill me-3"></i>Người dùng</Link>
          <Link to="/admin/orders" style={sidebarItemStyle("/admin/orders")}><i className="bi bi-receipt me-3"></i>Đơn hàng</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, marginLeft: 260 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", background: "#fff" }}>
          <div>
            <h5 style={{ margin: 0 }}>{isActive("/admin") ? "Tổng quan" : "Quản lý"}</h5>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>{user?.name || "Admin"}</span>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Admin")}&background=3b82f6&color=fff`}
              width="40"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}