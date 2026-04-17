
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swiper from "swiper";
import "swiper/css";
import API from "./api";
import Products from './pages/Products';
import Cart from './pages/Cart';
function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
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
  const fetchCartCount = async () => {
    try {
      const res = await fetch(`${API}/cart`);
      const data = await res.json();
      const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error(error);
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
      fetchCartCount(); // Cập nhật lại con số trên Header ngay lập tức
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
                <li className="nav-item">
                  <Link className="nav-link me-4 active" to="/">Home</Link>
                </li>

                  

                <li className="nav-item">
                  <Link className="nav-link me-4 text-primary fw-bold" to="/cart">Cart</Link>
                </li>
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


      <main style={{ paddingTop: '80px' }}> {/* Padding để không bị Header đè lên */}
        <Routes>
          <Route path="/" element={<Products products={products} addToCart={addToCart} />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </main>
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