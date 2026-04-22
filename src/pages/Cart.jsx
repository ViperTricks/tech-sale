import { useEffect, useState } from 'react';
import API from '../api';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API}/cart`, {
        headers: getAuthHeaders()
      });

      const data = await res.json();

      if (data.error) {
        console.error("Backend Error:", data.error);
        setCartItems([]);
      } else {
        setCartItems(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setCartItems([]);
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (product_id, change) => {
    try {
      await fetch(`${API}/cart/update`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ product_id, change })
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (cart_item_id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      await fetch(`${API}/cart/${cart_item_id}`, { method: 'DELETE' });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };
  const totalBill = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0)
    : 0;
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vui lòng đăng nhập");
      return;
    }

    fetchCart();
  }, []);

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <h2 className="mb-4 fw-bold">GIỎ HÀNG</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">Giỏ hàng trống</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.cart_item_id}>
                  <td>
                    <img src={item.image_url} width="50" className="me-2" alt="" />
                    {item.name}
                  </td>
                  <td>{new Intl.NumberFormat('vi-VN').format(Number(item.price))}đ</td>
                  <td>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => handleUpdateQuantity(item.product_id, -1)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => handleUpdateQuantity(item.product_id, 1)}>+</button>
                  </td>
                  <td>{new Intl.NumberFormat('vi-VN').format(Number(item.price) * item.quantity)}đ</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.cart_item_id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <h4>Tổng cộng: {new Intl.NumberFormat('vi-VN').format(totalBill)}đ</h4>
          </div>
        </div>
      )}
    </div>
  );
}