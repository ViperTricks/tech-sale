import Swiper from "swiper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products({ products, addToCart }) {
  // --- 1. STATE QUẢN LÝ VIỆC HIỂN THỊ "XEM THÊM" ---
  // Lưu trữ danh sách các category_id đang được mở rộng (hiện full)
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Khởi tạo Swiper cho Banner đầu trang
  useEffect(() => {
    new Swiper('.main-swiper', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-arrow-next',
        prevEl: '.swiper-arrow-prev',
      },
    });
  }, []);

  // --- 2. LOGIC NHÓM SẢN PHẨM THEO CATEGORY_ID ---
  const groupedProducts = products.reduce((acc, product) => {
    const { category_id } = product;
    if (!acc[category_id]) {
      acc[category_id] = [];
    }
    acc[category_id].push(product);
    return acc;
  }, {});

  // Hàm phụ trợ lấy tên danh mục
  const getCategoryName = (id) => {
    const names = {
      1: "💻 Laptop & MacBook",
      2: "📱 Điện thoại thông minh",
      3: "🎧 Phụ kiện & Thiết bị khác"
    };
    return names[id] || "📦 Danh mục khác";
  };

  // --- 3. LOGIC ĐÓNG/MỞ XEM THÊM ---
  const toggleCategory = (catId) => {
    if (expandedCategories.includes(catId)) {
      // Nếu đang mở thì lọc bỏ khỏi mảng để thu gọn
      setExpandedCategories(expandedCategories.filter(id => id !== catId));
    } else {
      // Nếu đang gọn thì thêm vào mảng để mở rộng
      setExpandedCategories([...expandedCategories, catId]);
    }
  };

  return (
    <>
      {/* --- PHẦN 1: BILLBOARD / BANNER --- */}
      <section id="billboard" className="position-relative overflow-hidden bg-light-blue py-5" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="swiper main-swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-md-6">
                    <div className="banner-content">
                      <h1 className="display-2 text-uppercase text-dark fw-bold pb-3">Tech Sale 2026</h1>
                      <p className="lead mb-5">Khám phá những thiết bị công nghệ mới nhất với mức giá ưu đãi độc quyền tại tech-sale.</p>
                      <a href="#body-products" className="btn btn-lg btn-dark text-uppercase rounded-pill px-5 shadow">Mua ngay</a>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-1">
                    <div className="image-holder">
                      <img src="images/banner-image.png" alt="banner" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: DANH SÁCH SẢN PHẨM THEO DANH MỤC --- */}
      <section id="body-products" className="product-store py-5">
        <div className="container">
          
          {Object.keys(groupedProducts).length > 0 ? (
            Object.keys(groupedProducts).map((catId) => {
              const isExpanded = expandedCategories.includes(catId);
              // Chỉ hiển thị 4 cái nếu chưa nhấn "Xem thêm"
              const allItemsInCat = groupedProducts[catId];
              const displayedItems = isExpanded ? allItemsInCat : allItemsInCat.slice(0, 4);

              return (
                <div key={catId} className="category-group mb-5 animate__animated animate__fadeIn">
                  
                  {/* Tiêu đề danh mục */}
                  <div className="display-header d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                    <h2 className="display-7 text-dark text-uppercase fw-bold m-0">
                      {getCategoryName(parseInt(catId))}
                    </h2>
                    <span className="badge bg-light text-primary border rounded-pill px-3">
                      {allItemsInCat.length} sản phẩm
                    </span>
                  </div>

                  {/* Grid hiển thị sản phẩm */}
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {displayedItems.map((p) => (
                      <div className="col" key={p.product_id}>
                        <div className="product-card card h-100 shadow-sm border-0 rounded-4 overflow-hidden position-relative">
                          
                          {/* Tag trạng thái kho hàng */}
                          {p.stock === 0 ? (
                            <span className="badge bg-secondary position-absolute m-3 px-3 py-2 rounded-pill shadow-sm" style={{ zIndex: 2, top: 0, left: 0 }}>
                              <i className="bi bi-x-circle me-1"></i> Hết hàng
                            </span>
                          ) : p.stock < 5 ? (
                            <span className="badge bg-danger position-absolute m-3 px-3 py-2 rounded-pill shadow-sm" style={{ zIndex: 2, top: 0, left: 0 }}>
                              <i className="bi bi-fire me-1"></i> Sắp hết hàng
                            </span>
                          ) : null}

                          <Link to={`/product/${p.product_id}`} className="text-decoration-none color-inherit">
                            {/* Hình ảnh */}
                            <div className="image-holder p-4" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                              <img
                                src={p.image_url || "images/product-item1.jpg"}
                                alt={p.name}
                                className="img-fluid"
                                style={{ 
                                  maxHeight: '100%', 
                                  objectFit: 'contain', 
                                  transition: 'transform 0.4s ease',
                                  filter: p.stock === 0 ? 'grayscale(100%) opacity(0.6)' : 'none'
                                }}
                                onMouseOver={e => p.stock > 0 && (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                              />
                            </div>

                            {/* Thông tin */}
                            <div className="card-body px-3 pt-0">
                              <h3 className="fs-6 fw-bold text-dark text-truncate mb-2" title={p.name}>
                                {p.name}
                              </h3>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary fw-bold fs-5">
                                  {new Intl.NumberFormat('vi-VN').format(p.price)}đ
                                </span>
                                <small className="text-muted small">Kho: {p.stock}</small>
                              </div>
                            </div>
                          </Link>

                          {/* Nút thao tác */}
                          <div className="card-footer bg-white border-0 pb-3 px-3">
                            <button
                              onClick={() => addToCart(p.product_id)}
                              className={`btn ${p.stock > 0 ? 'btn-outline-dark' : 'btn-light'} w-100 rounded-pill fw-bold transition-all`}
                              disabled={p.stock <= 0}
                            >
                              <i className={`bi ${p.stock > 0 ? 'bi-cart-plus' : 'bi-slash-circle'} me-2`}></i>
                              {p.stock > 0 ? "Thêm vào giỏ" : "Liên hệ"}
                            </button>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  {/* NÚT XEM THÊM / THU GỌN */}
                  {allItemsInCat.length > 4 && (
                    <div className="text-center mt-5">
                      <button 
                        onClick={() => toggleCategory(catId)}
                        className="btn btn-outline-primary rounded-pill px-5 py-2 fw-bold shadow-sm"
                        style={{ borderWidth: '2px' }}
                      >
                        {isExpanded ? (
                          <><i className="bi bi-chevron-up me-2"></i>Thu gọn</>
                        ) : (
                          <><i className="bi bi-plus-lg me-2"></i>Xem thêm</>
                        )}
                      </button>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <p className="text-muted fw-bold">Đang tải danh sách công nghệ...</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

// 🔹 Backend
// API:
// GET /products
// Flow:
// Frontend gọi API /products
// Backend:
// const [rows] = await pool.query("SELECT * FROM products");

// → Lấy toàn bộ sản phẩm từ DB

// Trả về JSON:
// [
//   { product_id, name, price, image_url, ... }
// ]