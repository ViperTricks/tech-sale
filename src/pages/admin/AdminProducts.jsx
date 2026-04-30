import { useState, useEffect } from "react";

const API = "http://localhost:3000";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // ======================
  // FORM STATE (FIXED)
  // ======================
  const [form, setForm] = useState({
    name: "",
    price: "",
    image_url: "",
    stock: "",
    description: "",
    category_id: "",
  });

  // ======================
  // FETCH PRODUCTS
  // ======================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/products?t=${Date.now()}`);
      const data = await res.json();

      setProducts(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================
  // ADD
  // ======================
  const handleAdd = () => {
    setForm({
      name: "",
      price: "",
      image_url: "",
      stock: "",
      description: "",
      category_id: "",
    });

    setEditId(null);
    setIsModalOpen(true);
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      image_url: product.image_url || "",
      stock: product.stock || "",
      description: product.description || "",
      category_id: product.category_id || "",
    });

    setEditId(product.product_id);
    setIsModalOpen(true);
  };

  // ======================
  // DELETE (SOFT DELETE)
  // ======================
  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn chắc chắn muốn xóa?");
    if (!ok) return;

    try {
      await fetch(`${API}/products/${id}/delete`, {
        method: "PUT",
      });

      setProducts((prev) =>
        prev.filter((p) => p.product_id !== id)
      );

      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // SUBMIT (CREATE / UPDATE)
  // ======================
  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        image_url: form.image_url,
        stock: Number(form.stock),
        description: form.description,
        category_id: Number(form.category_id),
      };

      const url = editId
        ? `${API}/products/${editId}`
        : `${API}/products`;

      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setIsModalOpen(false);
      setEditId(null);

      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // LOADING
  // ======================
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  // ======================
  // UI
  // ======================
  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h4>Quản lý sản phẩm</h4>

        <button className="btn btn-primary" onClick={handleAdd}>
          + Thêm sản phẩm
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Kho</th>
            <th>Loại</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>#{p.product_id}</td>

              <td>
                <img
                  src={p.image_url}
                  width="45"
                  height="45"
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
              </td>

              <td>{p.name}</td>

              <td className="fw-bold text-primary">
                {Number(p.price).toLocaleString()}đ
              </td>

              <td>{p.stock}</td>

              <td>
                {p.category_id === 1
                  ? "💻 Laptop & MacBook"
                  : p.category_id === 2
                  ? "📱 Điện thoại"
                  : p.category_id === 3
                  ? "🎧 Phụ kiện"
                  : ""}
              </td>

              <td className="d-flex gap-2">

                <button
                  onClick={() => handleEdit(p)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => handleDelete(p.product_id)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "none",
                    background: "#ef4444",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <h5>{editId ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h5>

              <input
                className="form-control mb-2"
                placeholder="Tên"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Giá"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Ảnh URL"
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Kho"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />

              {/* DESCRIPTION */}
              <input
                className="form-control mb-2"
                placeholder="Mô tả sản phẩm"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              {/* CATEGORY */}
              <select
                className="form-control mb-2"
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
              >
                <option value="">-- Chọn loại sản phẩm --</option>
                <option value="1">💻 Laptop & MacBook</option>
                <option value="2">📱 Điện thoại thông minh</option>
                <option value="3">🎧 Phụ kiện & Thiết bị khác</option>
              </select>

              <div className="d-flex gap-2">
                <button onClick={handleSubmit} className="btn btn-success">
                  Lưu
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Hủy
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}