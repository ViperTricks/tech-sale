import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
    const [name, setName] = useState("");
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

    // ✅ validate function
    const validate = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Vui lòng nhập tên";
        }

        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email không đúng định dạng";
        }

        if (!password.trim()) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải >= 6 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        // ❌ nếu lỗi thì không gọi API
        if (!validate()) return;

        try {
            const res = await fetch(`${API}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            // ❌ nếu backend báo lỗi thì hiển thị
            if (!res.ok) {
                toast.error(data.message || "Đăng ký thất bại");
                return;
            }

            // ✅ thành công mới chuyển trang
            toast.success("Đăng ký thành công!");
            navigate("/login");

        } catch (err) {
            toast.error("Lỗi kết nối server");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            }}
        >
            <div
                style={{
                    width: "400px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    padding: "25px",
                    boxShadow: "0 0 25px rgba(0,255,255,0.2)",
                    border: "1px solid rgba(0,255,255,0.3)"
                }}
            >
                <h3 className="text-center mb-4" style={{
                    color: "#00e5ff",
                    textShadow: "0 0 10px #00e5ff"
                }}>
                    📝 Đăng ký
                </h3>

                {/* NAME */}
                <input
                    className="form-control mb-1"
                    placeholder="Tên"
                    style={inputStyle}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p style={{ color: "red", fontSize: "13px" }}>{errors.name}</p>}

                {/* EMAIL */}
                <input
                    className="form-control mb-1"
                    placeholder="Email"
                    style={inputStyle}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p style={{ color: "red", fontSize: "13px" }}>{errors.email}</p>}

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
                            right: "12px",
                            top: "38%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#00e5ff"
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>}

                <button
                    onClick={handleRegister}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#00e5ff",
                        color: "#000",
                        fontWeight: "bold",
                        boxShadow: "0 0 15px #00e5ff",
                        transition: "0.3s",
                        marginTop: "10px"
                    }}
                >
                    Đăng ký
                </button>

                <p className="text-center mt-3" style={{ color: "#ccc" }}>
                    Đã có tài khoản?{" "}
                    <Link to="/login" style={{ color: "#00e5ff" }}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
