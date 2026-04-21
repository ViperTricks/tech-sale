import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams(); // 🔥 lấy id từ URL
  const [product, setProduct] = useState(null);

  const fetchProductDetail = async () => {
    try {
      const res = await fetch(`${API}/products/${id}`);
      const data = await res.json();

      // ⚠️ nếu backend trả về array thì dùng data[0]
      setProduct(data);
    } catch (err) {
      console.error("Lỗi lấy chi tiết sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-dark"></div>
        <p className="mt-3">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <section className="product-detail padding-large">
      <div className="container">
        <div className="row align-items-center">

          {/* 🔥 ẢNH SẢN PHẨM */}
          <div className="col-md-6">
            <div
              className="image-holder shadow-sm p-3 bg-white"
              style={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={product.image_url || "/images/product-item1.jpg"}
                alt={product.name}
                className="img-fluid"
                style={{ maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* 🔥 THÔNG TIN SẢN PHẨM */}
          <div className="col-md-6">
            <h2 className="text-uppercase fw-bold">{product.name}</h2>

            <h3 className="text-primary fw-bold mt-3">
              {new Intl.NumberFormat("vi-VN").format(product.price)}đ
            </h3>

            <p className="mt-3 text-muted">
              {product.description || "Chưa có mô tả sản phẩm"}
            </p>

            {/* 🔥 NÚT */}
            <div className="mt-4 d-flex gap-3">
              <button
                onClick={() => addToCart(product.product_id)}
                className="btn btn-dark text-uppercase"
              >
                🛒 Add to Cart
              </button>

              <button className="btn btn-outline-dark text-uppercase">
                ⚡ Mua ngay
              </button>
            </div>

            {/* 🔥 CHÍNH SÁCH */}
            <div className="mt-4 text-muted small">
              ✔ Bảo hành 12 tháng <br />
              ✔ Giao hàng toàn quốc <br />
              ✔ Đổi trả 7 ngày
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}