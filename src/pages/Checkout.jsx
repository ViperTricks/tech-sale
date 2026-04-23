import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const totalAmount = location.state?.totalAmount || 0;
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({ phone: '', address: '' });

    const handlePayment = async (type) => {
        if (totalAmount <= 0 || !info.phone || !info.address) return alert("Vui lòng nhập đủ thông tin!");

        setLoading(true);
        const endpoint = type === 'MOMO' ? '/orders/create-momo' : '/orders/create-vnpay';

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                `http://localhost:3000${endpoint}`,
                { amount: totalAmount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data && res.data.payUrl) {
                localStorage.setItem('tempOrder', JSON.stringify({ ...info, method: type }));
                window.location.href = res.data.payUrl;
            } else {
                alert("Lỗi: " + (res.data.message || "Không lấy được link thanh toán"));
            }
        } catch (err) {
            alert("Lỗi kết nối Backend!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '100px', maxWidth: '450px' }}>
            <div className="card p-4 shadow border-0">
                <h3 className="text-center fw-bold mb-4">THANH TOÁN</h3>
                <p className="text-center">Tổng: <b className="text-danger">{new Intl.NumberFormat('vi-VN').format(totalAmount)}đ</b></p>
                <input className="form-control mb-2" placeholder="Số điện thoại" onChange={e => setInfo({ ...info, phone: e.target.value })} />
                <textarea className="form-control mb-3" placeholder="Địa chỉ giao hàng" onChange={e => setInfo({ ...info, address: e.target.value })} />

                <button onClick={() => handlePayment('MOMO')} className="btn w-100 mb-2 text-white" style={{ backgroundColor: '#A50064' }} disabled={loading}>
                    Ví MoMo
                </button>
                <button onClick={() => handlePayment('VNPAY')} className="btn w-100 text-white" style={{ backgroundColor: '#005baa' }} disabled={loading}>
                    Thẻ ATM / VNPAY
                </button>
            </div>
        </div>
    );
};

export default Checkout;