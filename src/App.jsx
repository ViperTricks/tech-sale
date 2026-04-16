import { useEffect, useState } from 'react';
import Swiper from "swiper";
import "swiper/css";
import API from "./api"; 

function App() {
  const [products, setProducts] = useState([]);

  // 1. Lấy dữ liệu sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi fetch data:", error);
    }
  };

  // 2. Xử lý thêm vào giỏ hàng
  const addToCart = async (product_id) => {
    try {
      await fetch(`${API}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: 1, product_id, quantity: 1 }),
      });
      alert("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    // Khởi tạo slider Billboard ngay khi mount
    new Swiper('.main-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-arrow-next',
        prevEl: '.swiper-arrow-prev',
      },
    });
  }, []);

  return (
    <>
      {/* --- HEADER --- */}
      <header id="header" className="site-header header-scrolled position-fixed text-black bg-light w-100" style={{ zIndex: 1000 }}>
        <nav id="header-nav" className="navbar navbar-expand-lg px-3 mb-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src="images/main-logo.png" className="logo" alt="logo" />
            </a>
            <div className="offcanvas-body">
              <ul id="navbar" className="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
                <li className="nav-item"><a className="nav-link me-4 active" href="#billboard">Home</a></li>
                <li className="nav-item"><a className="nav-link me-4" href="#body-products">Shop</a></li>
                <li className="nav-item">
                  <div className="user-items ps-5">
                    <ul className="d-flex justify-content-end list-unstyled">
                      <li className="pe-3"><a href="#"><svg className="user"><use xlinkHref="#user"></use></svg></a></li>
                      <li><a href="#"><svg className="cart"><use xlinkHref="#cart"></use></svg></a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* --- BILLBOARD (Banner Slider) --- */}
      <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
        <div className="swiper main-swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-md-6">
                    <div className="banner-content">
                      <h1 className="display-2 text-uppercase text-dark pb-5">Technology Sale</h1>
                      <a href="#body-products" className="btn btn-medium btn-dark text-uppercase">Khám phá ngay</a>
                    </div>
                  </div>
                  <div className="col-md-5">
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

      {/* --- BODY: DANH SÁCH SẢN PHẨM (Grid Layout) --- */}
      <section id="body-products" className="product-store padding-large">
        <div className="container">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Danh sách sản phẩm</h2>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((p) => (
              <div className="col" key={p.product_id}>
                <div className="product-card position-relative shadow-sm h-100 p-2">
                  {/* Ảnh sản phẩm từ image_url trong database */}
                  <div className="image-holder" style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={p.image_url || "images/product-item1.jpg"} 
                      alt={p.name} 
                      className="img-fluid"
                      style={{ maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Nút thêm nhanh */}
                  <div className="cart-concern position-absolute" style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="cart-button">
                      <button onClick={() => addToCart(p.product_id)} className="btn btn-medium btn-black text-uppercase">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Chi tiết sản phẩm */}
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <div>
                      <h3 className="card-title text-uppercase fs-6">
                        <a href="#" className="text-decoration-none text-dark">{p.name}</a>
                      </h3>
                    </div>
                    <span className="item-price text-primary fw-bold">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="footer" className="overflow-hidden mt-5 pt-5 border-top">
        <div className="container">
          <div className="row d-flex flex-wrap justify-content-between">
            <div className="col-lg-3 col-sm-6 pb-3">
              <div className="footer-menu">
                <img src="images/main-logo.png" alt="logo" className="pb-3" />
                <p>Tech-Sale: Chuyên cung cấp giải pháp công nghệ hiện đại cho bạn.</p>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6 pb-3">
              <div className="footer-menu text-uppercase">
                <h5 className="widget-title pb-2">Liên kết</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item pb-2"><a href="#">Trang chủ</a></li>
                  <li className="menu-item pb-2"><a href="#">Cửa hàng</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;