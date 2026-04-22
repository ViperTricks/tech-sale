import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const inputStyle = {
        borderRadius: "10px",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(0,255,255,0.3)",
        color: "#fff",
    };

    // ✅ validate
    const validate = () => {
        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email không đúng định dạng";
        }

        if (!password.trim()) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        // ❌ nếu lỗi thì dừng
        if (!validate()) {
            return;
        }

        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Đăng nhập thất bại");
                return;
            }

            // ✅ lưu user + token (nếu có)
            localStorage.setItem("user", JSON.stringify(data.user));
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            setUser(data.user);

            toast.success("Đăng nhập thành công!");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {
            toast.error("Lỗi kết nối server");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            }}>

            <div style={{
                width: "380px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                padding: "25px",
                boxShadow: "0 0 25px rgba(0,255,255,0.2)",
                border: "1px solid rgba(0,255,255,0.3)"
            }}>

                <h3 className="text-center mb-4"
                    style={{ color: "#00e5ff", textShadow: "0 0 10px #00e5ff" }}>
                    🔐 Đăng nhập
                </h3>

                {/* EMAIL */}
                <input
                    className="form-control mb-1"
                    placeholder="Email"
                    style={inputStyle}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p style={{ color: "red", fontSize: "13px" }}>{errors.email}</p>
                )}

                {/* PASSWORD */}
                <div style={{ position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control mb-1"
                        placeholder="Mật khẩu"
                        style={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#00e5ff"
                        }}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && (
                    <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>
                )}

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#00e5ff",
                        color: "#000",
                        fontWeight: "bold",
                        boxShadow: "0 0 15px #00e5ff",
                        marginTop: "10px"
                    }}>
                    Đăng nhập
                </button>

                <p className="text-center mt-3" style={{ color: "#ccc" }}>
                    Chưa có tài khoản?{" "}
                    <Link to="/register" style={{ color: "#00e5ff" }}>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;