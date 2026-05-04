import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Swiper from "swiper";
import "swiper/css";
import API from "./api";

import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminLayout from './layouts/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts'
import Profile from "./pages/Profile";
import ProductDetail from './pages/ProductDetail';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.includes("/admin");
  const isAdmin = user?.role === "admin";

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!Array.isArray(data)) return;

      const total = data.reduce((s, i) => s + i.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setAllUsers(data);
  };

  // ================= ADD TO CART =================
  const addToCart = async (product_id) => {
    try {
      if (loadingCart) return;

      const token = localStorage.getItem("token");

      if (!token) {
        toast.warn("Vui lòng đăng nhập");
        navigate("/login");
        return;
      }

      await fetch(`${API}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ product_id, quantity: 1 }),
      });

      toast.success("Thêm vào giỏ hàng!");
      fetchCartCount();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCartCount(0);
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  // ================= INIT =================
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (token) fetchCartCount();
    }

    fetchProducts();

    const swiper = new Swiper(".main-swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
      },
    });

    return () => swiper.destroy();
  }, []);

  // ================= ADMIN DATA =================
  useEffect(() => {
    if (isAdminPage && isAdmin) {
      fetchOrders();
      fetchUsers();
    }
  }, [isAdminPage, isAdmin]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />

      {/* HEADER */}
      {!isAdminPage && (
        <header className="bg-light border-bottom position-fixed w-100">
          <div className="container d-flex justify-content-between align-items-center py-2">

            <Link to="/" className="fw-bold fs-4 text-decoration-none">
              MiniStore<span className="text-primary">.</span>
            </Link>

            <div className="d-flex gap-3 align-items-center">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart ({cartCount})</Link>

              {/* 🔥 ADMIN BUTTON */}
              {isAdmin && (
                <Link
                  to="/admin/products"
                  style={{
                    background: "linear-gradient(135deg,#ff4d4d,#ff9900)",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: "600",
                  }}
                >
                  ⚙ Admin
                </Link>
              )}
            </div>

            <div className="d-flex gap-2 align-items-center">
              {user ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>

          </div>
        </header>
      )}

      {/* MAIN */}
      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Products products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* 🔥 ADMIN PROTECTED */}
          <Route
            path="/admin/*"
            element={isAdmin ? <AdminLayout /> : <Navigate to="/" />}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders orders={orders} />} />
            <Route path="users" element={<AdminUsers users={allUsers} />} />
          </Route>

          <Route path="*" element={<Products products={products} addToCart={addToCart} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;