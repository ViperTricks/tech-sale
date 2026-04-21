import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const inputStyle = {
        borderRadius: "10px",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(0,255,255,0.3)",
        color: "#fff",
    };
    const handleLogin = async () => {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            alert("Đăng nhập thành công!");
            navigate("/");
        } else {
            alert(data.message || "Đăng nhập thất bại");
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
                    width: "380px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    padding: "25px",
                    boxShadow: "0 0 25px rgba(0,255,255,0.2)",
                    border: "1px solid rgba(0,255,255,0.3)"
                }}
            >
                <h3
                    className="text-center mb-4"
                    style={{
                        color: "#00e5ff",
                        textShadow: "0 0 10px #00e5ff"
                    }}
                >
                    🔐 Đăng nhập
                </h3>

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    style={inputStyle}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Mật khẩu"
                    style={inputStyle}
                    onChange={(e) => setPassword(e.target.value)}
                />

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
                        transition: "0.3s"
                    }}
                >
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