import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // --- 1. KHỞI TẠO STATE ---
    const totalAmount = location.state?.totalAmount || 0;
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({ phone: '', address: '' });

    // --- 2. LOGIC XỬ LÝ THANH TOÁN ---
    const handlePayment = async (type) => {
        // Kiểm tra validation cơ bản
        if (totalAmount <= 0) {
            alert("Giỏ hàng của bạn đang rỗng!");
            return navigate('/cart');
        }
        if (!info.phone || !info.address) {
            alert("Vui lòng nhập đầy đủ Số điện thoại và Địa chỉ!");
            return;
        }

        setLoading(true);
        const endpoint = type === 'MOMO' ? '/orders/create-momo' : '/orders/create-vnpay';

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                `http://localhost:3000${endpoint}`,
                { amount: totalAmount },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Lưu thông tin tạm thời để sau khi thanh toán xong quay lại dùng
            if (res.data && res.data.payUrl) {
                localStorage.setItem('tempOrder', JSON.stringify({ ...info, method: type }));
                // Chuyển hướng sang cổng thanh toán
                window.location.href = res.data.payUrl;
            } else {
                alert("Lỗi: " + (res.data.message || "Không lấy được link thanh toán"));
            }
        } catch (err) {
            console.error("Payment Error:", err);
            alert("Lỗi kết nối Backend hoặc Token hết hạn!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '120px', marginBottom: '50px' }}>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    {/* --- CARD CHÍNH --- */}
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            
                            {/* Tiêu đề */}
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-uppercase">Xác nhận đơn hàng</h2>
                                <div className="bg-primary mx-auto" style={{ height: '3px', width: '60px' }}></div>
                            </div>

                            {/* Hiển thị tổng tiền nổi bật */}
                            <div className="alert alert-light border text-center mb-4 py-3">
                                <span className="text-muted d-block mb-1">Số tiền cần thanh toán</span>
                                <h3 className="text-danger fw-bold m-0">
                                    {new Intl.NumberFormat('vi-VN').format(totalAmount)}đ
                                </h3>
                            </div>

                            {/* --- FORM NHẬP THÔNG TIN --- */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Số điện thoại người nhận</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white"><i className="bi bi-telephone"></i></span>
                                    <input 
                                        type="text" 
                                        className="form-control border-start-0" 
                                        placeholder="Ví dụ: 0912345xxx"
                                        value={info.phone}
                                        onChange={e => setInfo({ ...info, phone: e.target.value })} 
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Địa chỉ giao hàng</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white"><i className="bi bi-geo-alt"></i></span>
                                    <textarea 
                                        className="form-control border-start-0" 
                                        rows="3"
                                        placeholder="Số nhà, tên đường, phường/xã..."
                                        value={info.address}
                                        onChange={e => setInfo({ ...info, address: e.target.value })} 
                                    />
                                </div>
                            </div>

                            <p className="text-muted small mb-3 text-center">Chọn phương thức thanh toán an toàn qua:</p>

                            {/* --- CÁC NÚT THANH TOÁN --- */}
                            <div className="d-grid gap-2">
                                {/* Nút MoMo */}
                                <button 
                                    onClick={() => handlePayment('MOMO')} 
                                    className="btn py-2 btn-momo text-white fw-bold d-flex align-items-center justify-content-center"
                                    style={{ backgroundColor: '#A50064', borderRadius: '10px' }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : (
                                        <img src="https://static.mservice.io/img/logo-momo.png" width="24" className="me-2" alt="momo" />
                                    )}
                                    Thanh toán qua Ví MoMo
                                </button>

                                {/* Nút VNPAY */}
                                <button 
                                    onClick={() => handlePayment('VNPAY')} 
                                    className="btn py-2 text-white fw-bold d-flex align-items-center justify-content-center"
                                    style={{ backgroundColor: '#005baa', borderRadius: '10px' }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : (
                                        <i className="bi bi-credit-card me-2"></i>
                                    )}
                                    Thẻ ATM / QR VNPAY
                                </button>
                            </div>

                            {/* Link quay lại */}
                            <div className="text-center mt-4">
                                <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none text-muted p-0">
                                    <i className="bi bi-arrow-left me-1"></i> Quay lại chỉnh sửa giỏ hàng
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;


// 3. LUỒNG PAYMENT (MOMO + VNPAY)
// 🔹 3.1 Checkout (Frontend)
// User nhập:
// phone
// address
// Khi click:
// handlePayment('MOMO' | 'VNPAY')
// 🔹 Gửi request:
// POST /orders/create-momo
// POST /orders/create-vnpay

// Body:

// { amount: totalAmount }
// 🔹 Backend:

// (Từ controller bạn chưa gửi, nhưng flow chuẩn là:)

// 👉 Tạo URL thanh toán từ:

// MOMO
// VNPAY

// → trả về:

// { payUrl: "https://..." }
// 🔹 Frontend:
// window.location.href = payUrl;

// 👉 Redirect sang cổng thanh toán

// 🔁 3.2 Sau khi thanh toán

// User bị redirect về:

// /payment-success
// 🔹 PaymentSuccess.jsx
// Lấy params:
// momoStatus = resultCode
// vnpStatus = vnp_ResponseCode
// Nếu thành công:
// if (momoStatus === '0' || vnpStatus === '00')
// Lấy data tạm:
// tempOrder = localStorage.getItem('tempOrder')
// Gọi API:
// POST /orders/complete    