import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // GET PRODUCTS
  // ======================
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  // ======================
  // LOADING UI
  // ======================
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Đang tải danh sách sản phẩm...</p>
      </div>
    );
  }

  // ======================
  // EMPTY STATE
  // ======================
  if (!products || products.length === 0) {
    return <p className="text-center">Không có sản phẩm nào</p>;
  }

  return (
    <div className="admin-product-list">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0 fw-bold">Quản lý kho hàng</h4>

        <button className="btn btn-primary rounded-pill">
          + Thêm sản phẩm
        </button>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Kho</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.product_id || p.id}>

                  <td>#{p.product_id}</td>

                  <td>
                    <img
                      src={p.image_url}
                      alt={p.name}
                      style={{ width: 45, height: 45, objectFit: "contain" }}
                    />
                  </td>

                  <td>{p.name}</td>

                  <td className="fw-bold text-primary">
                    {Number(p.price).toLocaleString()}đ
                  </td>

                  <td>
                    <span className={p.stock < 5 ? "text-danger" : "text-success"}>
                      {p.stock}
                    </span>
                  </td>

                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-secondary me-1">
                      ✏️
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      🗑️
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}