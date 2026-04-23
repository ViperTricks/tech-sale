import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [isSuccess, setIsSuccess] = useState(false);

    // Tham số MoMo
    const momoStatus = searchParams.get('resultCode');
    // Tham số VNPAY
    const vnpStatus = searchParams.get('vnp_ResponseCode');

    const orderId = searchParams.get('orderId') || searchParams.get('vnp_TxnRef');
    const amount = searchParams.get('amount') || (searchParams.get('vnp_Amount') / 100);

    useEffect(() => {
        if (momoStatus === '0' || vnpStatus === '00') {
            setIsSuccess(true);

            const tempOrder = JSON.parse(localStorage.getItem('tempOrder'));

            if (tempOrder) {
                axios.post("http://localhost:3000/orders/complete", {
                    orderId,
                    phone: tempOrder.phone,
                    address: tempOrder.address,
                    method: tempOrder.method
                });

                localStorage.removeItem("tempOrder");
            }
        }
    }, [momoStatus, vnpStatus, orderId]);
    return (
        <div className="container text-center" style={{ marginTop: '150px' }}>
            {isSuccess ? (
                <div className="card p-5 shadow border-0">
                    <h1 className="display-4 text-success">✔️ Thanh toán thành công!</h1>
                    <p className="lead">Hệ thống đã ghi nhận đơn hàng <strong>{orderId}</strong>.</p>
                    <h3>Số tiền: {new Intl.NumberFormat('vi-VN').format(amount)}đ</h3>
                    <Link to="/" className="btn btn-primary mt-4">Quay lại trang chủ</Link>
                </div>
            ) : (
                <div className="card p-5 shadow border-0">
                    <h1 className="display-4 text-danger">❌ Giao dịch thất bại</h1>
                    <p className="lead">Thanh toán không thành công hoặc bạn đã hủy giao dịch.</p>
                    <p className="text-muted">Mã phản hồi: {momoStatus || vnpStatus}</p>
                    <Link to="/cart" className="btn btn-warning mt-4">Quay lại giỏ hàng</Link>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;