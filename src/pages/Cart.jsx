import { useEffect, useState } from "react";
import API from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await fetch(`${API}/cart`);
    const data = await res.json();
    setCart(data);
  };

  const checkout = async () => {
    await fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        shipping_address: "HCM",
        phone: "0123456789",
      }),
    });

    alert("Đã đặt hàng");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <h2>Giỏ hàng</h2>

      {cart.map((item) => (
        <div key={item.cart_item_id}>
          <p>Product ID: {item.product_id}</p>
          <p>Số lượng: {item.quantity}</p>
        </div>
      ))}

      <button onClick={checkout}>Thanh toán</button>
    </div>
  );
}