import { Outlet, Link, useLocation } from "react-router-dom";

export default function AdminLayout() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const sidebarItemStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '12px 15px',
        borderRadius: '10px',
        marginBottom: '8px',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        fontWeight: '500',
        color: isActive(path) ? '#fff' : '#94a3b8',
        backgroundColor: isActive(path) ? '#3b82f6' : 'transparent',
        boxShadow: isActive(path) ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none',
    });

    return (
        <div className="admin-wrapper" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Bùa chú ép mọi thứ về 0 */}
            <style>{`
        body { margin: 0 !important; padding: 0 !important; }
        /* Ép thẻ main ở App.jsx về 0 khi đang ở admin */
        main { padding-top: 0 !important; } 
      `}</style>

            {/* --- SIDEBAR --- */}
            <aside style={{
                width: '260px',
                background: '#0f172a',
                color: '#fff',
                padding: '25px 20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 100
            }}>
                <div className="brand-logo mb-5 px-2 d-flex align-items-center">
                    <div style={{ width: '35px', height: '35px', background: '#3b82f6', borderRadius: '8px', marginRight: '12px', display: 'grid', placeItems: 'center' }}>
                        <i className="bi bi-cpu-fill text-white"></i>
                    </div>
                    <div>
                        <h4 style={{
                            margin: 0,
                            fontWeight: '700',
                            fontSize: '1.2rem',
                            letterSpacing: '0.5px'
                        }}>
                            <span style={{ color: '#e2e8f0' }}>Tech</span>
                            <span style={{ color: '#3b82f6' }}>Sale</span>
                        </h4>
                        <small style={{
                            color: '#64748b',
                            fontSize: '0.7rem',
                            letterSpacing: '1px'
                        }}>
                            ADMIN PANEL
                        </small>
                    </div>
                </div>

                <nav className="flex-grow-1">
                    <Link to="/admin" style={sidebarItemStyle('/admin')}>
                        <i className="bi bi-grid-1x2-fill me-3"></i> Dashboard
                    </Link>
                    <Link to="/admin/products" style={sidebarItemStyle('/admin/products')}>
                        <i className="bi bi-box-seam-fill me-3"></i> Quản lý sản phẩm
                    </Link>
                    <Link to="/admin/users" style={sidebarItemStyle('/admin/users')}>
                        <i className="bi bi-people-fill me-3"></i> Quản lý người dùng
                    </Link>
                    <Link to="/admin/orders" style={sidebarItemStyle('/admin/orders')}>
                        <i className="bi bi-receipt me-3"></i> Quản lý đơn hàng
                    </Link>
                    {/* ... các link khác giữ nguyên ... */}
                </nav>

                <div className="mt-auto pt-4 border-top border-secondary">
                    <Link to="/" className="text-white-50 fw-bold d-flex align-items-center px-2 text-decoration-none">
                        <i className="bi bi-arrow-left-square-fill me-2"></i> Quay về cửa hàng
                    </Link>
                </div>
            </aside>

            {/* --- NỘI DUNG CHÍNH --- */}
            <main style={{ flex: 1, marginLeft: '260px', padding: '0px' }}>
                {/* Top Navbar: Đảm bảo marginTop là 0 */}
                <div className="d-flex justify-content-between align-items-center bg-white px-4 py-3 shadow-sm mb-4" style={{ borderBottom: '1px solid #e2e8f0', marginTop: '0' }}>
                    <div>
                        <h5 className="m-0 fw-bold text-dark">
                            {isActive('/admin') ? 'Tổng quan' : 'Quản lý kho'}
                        </h5>
                        <small className="text-muted">Hệ thống cập nhật theo thời gian thực</small>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="text-end">
                            <p className="m-0 fw-bold text-dark" style={{ fontSize: '0.9rem' }}>Nguyên Dev</p>
                            <small className="text-success" style={{ fontSize: '0.75rem' }}>● Đang trực tuyến</small>
                        </div>
                        <img src="https://ui-avatars.com/api/?name=Nguyen&background=3b82f6&color=fff&bold=true" className="rounded-circle shadow-sm" width="42" alt="avatar" />
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <div className="bg-white p-4 rounded-4 shadow-sm border border-light" style={{ minHeight: '85vh' }}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}