import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(true);
    const [statusMessage, setStatusMessage] = useState("Đang xử lý đơn hàng...");

    const momoStatus = searchParams.get('resultCode');
    const vnpStatus = searchParams.get('vnp_ResponseCode');
    const orderId = searchParams.get('orderId') || searchParams.get('vnp_TxnRef');
    useEffect(() => {
        const finalizeOrder = async () => {
            // Kiểm tra trạng thái thành công
            if (momoStatus === '0' || vnpStatus === '00') {
                const tempOrder = JSON.parse(localStorage.getItem('tempOrder'));
                const token = localStorage.getItem('token'); // Token từ lúc đăng nhập

                if (tempOrder && token) {
                    try {
                        const response = await axios.post("http://localhost:3000/orders/complete", {
                            orderId,
                            phone: tempOrder.phone,
                            address: tempOrder.address,
                            method: tempOrder.method
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        if (response.data.success) {
                            setStatusMessage("✔️ Thanh toán thành công và đã ghi nhận đơn hàng!");
                            localStorage.removeItem("tempOrder");
                        }
                    } catch (err) {
                        console.error("Lỗi:", err);

                        setStatusMessage("❌ Có lỗi xảy ra khi cập nhật đơn hàng.");
                    }
                }
            } else {
                setStatusMessage("❌ Giao dịch không thành công hoặc bị hủy.");
            }
            setIsProcessing(false);
        };

        finalizeOrder();
    }, [momoStatus, vnpStatus, orderId]);

    return (
        <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Phần Header màu sắc dựa trên trạng thái */}
                        <div className={`p-4 text-center ${statusMessage.includes('✔️') ? 'bg-success' : 'bg-danger'} text-white`}>
                            {isProcessing ? (
                                <div className="spinner-border text-light" role="status"></div>
                            ) : (
                                <i className={`bi ${statusMessage.includes('✔️') ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} style={{ fontSize: '3rem' }}></i>
                            )}
                        </div>

                        <div className="card-body p-5 text-center">
                            {/* Thông báo trạng thái */}
                            <h2 className={`fw-bold mb-3 ${statusMessage.includes('✔️') ? 'text-success' : 'text-danger'}`}>
                                {isProcessing ? "Đang xử lý giao dịch..." : statusMessage.replace('✔️', '').replace('❌', '')}
                            </h2>

                            <p className="text-muted mb-4">
                                {statusMessage.includes('✔️')
                                    ? "Cảm ơn bạn đã tin tưởng lựa chọn tech-sale. Đơn hàng của bạn đang được chuẩn bị."
                                    : "Giao dịch gặp sự cố hoặc đã bị hủy. Nếu có thắc mắc, vui lòng liên hệ hỗ trợ."}
                            </p>

                            {/* Khung thông tin mã đơn hàng */}
                            <div className="bg-light p-3 rounded-3 mb-4 border">
                                <span className="text-uppercase small text-muted d-block">Mã đơn hàng của bạn</span>
                                <strong className="fs-5 text-dark">{orderId || "N/A"}</strong>
                            </div>

                            {/* Nút điều hướng */}
                            <div className="d-grid gap-2">
                                <Link to="/" className="btn btn-primary btn-lg rounded-pill fw-bold py-3 shadow-sm">
                                    <i className="bi bi-house-door me-2"></i> Quay lại trang chủ
                                </Link>
                                {/* Nếu thất bại, có thể hiện thêm nút hỗ trợ */}
                                {!statusMessage.includes('✔️') && (
                                    <Link to="/contact" className="btn btn-outline-secondary rounded-pill fw-bold">
                                        Liên hệ hỗ trợ
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Footer trang trí */}
                        <div className="card-footer bg-white border-0 pb-4 text-center">
                            <small className="text-muted">Hệ thống thanh toán an toàn qua MoMo & VNPAY</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;


