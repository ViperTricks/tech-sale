
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Swiper from "swiper";
import "swiper/css";
import API from "./api";
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from "./pages/Profile";

function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
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
  // 3. Xử lý đăng xuất
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
      <header
        className="bg-light border-bottom position-fixed w-100"
        style={{ zIndex: 1000 }}
      >
        <div className="container d-flex align-items-center justify-content-between py-2">

          {/* LEFT: LOGO */}
          <Link className="navbar-brand fw-bold fs-4" to="/" style={{ color: "#333" }}>
            MiniStore<span style={{ color: "#0d6efd" }}>.</span>
          </Link>

          {/* CENTER: MENU */}
          <div className="d-flex align-items-center gap-4">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link fw-semibold text-primary" to="/cart">
              Cart
            </Link>
          </div>

          {/* RIGHT: AUTH */}
          <div className="d-flex align-items-center gap-3">
            {user ? (

              <button
                onClick={logout}
                style={{
                  border: "none",
                  background: "#ff4d4f",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "8px"
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="nav-link" to="/profile">Profile</Link>
                <Link className="nav-link" to="/login">Đăng nhập</Link>
                <Link className="nav-link " to="/register"> Đăng ký</Link>
              </>
            )}
          </div>

        </div>
      </header>


      <main style={{ paddingTop: '80px' }}> {/* Padding để không bị Header đè lên */}
        <Routes>
          <Route path="/" element={<Products products={products} addToCart={addToCart} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
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