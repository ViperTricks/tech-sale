import { useState, useEffect } from "react";

// Đổi tên từ 'admin' thành 'AdminProducts' cho chuẩn React
export default function AdminProducts({ products }) {
  
  // Kiểm tra nếu products chưa có dữ liệu thì hiện loading hoặc thông báo
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Đang tải danh sách sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="admin-product-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0 fw-bold text-dark">Quản lý kho hàng</h4>
        <button className="btn btn-primary rounded-pill shadow-sm">
          <i className="bi bi-plus-lg me-1"></i> Thêm sản phẩm mới
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá bán</th>
                <th>Trạng thái kho</th>
                <th className="pe-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.product_id}>
                  <td className="ps-4 text-muted">#{p.product_id}</td>
                  <td>
                    <img 
                        src={p.image_url} 
                        alt={p.name} 
                        style={{ width: '45px', height: '45px', objectFit: 'contain' }} 
                        className="rounded bg-white border p-1" 
                    />
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{p.name}</div>
                    <small className="text-muted">ID: {p.category_id}</small>
                  </td>
                  <td className="fw-bold text-primary">
                    {new Intl.NumberFormat('vi-VN').format(p.price)}đ
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${p.stock < 5 ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`} style={{ padding: '8px 12px' }}>
                      {p.stock < 5 ? `Sắp hết (${p.stock})` : `Sẵn hàng (${p.stock})`}
                    </span>
                  </td>
                  <td className="pe-4 text-center">
                    <button className="btn btn-sm btn-outline-secondary border-0 me-1" title="Sửa">
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger border-0" title="Xóa">
                        <i className="bi bi-trash3"></i>
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