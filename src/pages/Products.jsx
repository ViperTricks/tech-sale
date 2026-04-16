import { useEffect, useState } from "react";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  const addToCart = async (product_id) => {
    await fetch(`${API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_id: 1,
        product_id,
        quantity: 1,
      }),
    });

    alert("Đã thêm vào giỏ hàng");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>

      {products.map((p) => (
        <div key={p.product_id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{p.name}</h3>
          <p>Giá: {p.price}</p>

          <button onClick={() => addToCart(p.product_id)}>
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
}