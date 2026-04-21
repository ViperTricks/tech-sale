import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const inputStyle = {
        borderRadius: "10px",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(0,255,255,0.3)",
        color: "#fff",
    };
    const handleRegister = async () => {
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone,
                address
            }),
        });

        const data = await res.json();
        alert(data.message);
        navigate("/login");
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
                <h3
                    className="text-center mb-4"
                    style={{
                        color: "#00e5ff",
                        textShadow: "0 0 10px #00e5ff"
                    }}
                >
                    📝 Đăng ký
                </h3>

                <input
                    className="form-control mb-3"
                    placeholder="Tên"
                    style={inputStyle}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <input
                    className="form-control mb-3"
                    placeholder="Số điện thoại"
                    style={inputStyle}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Địa chỉ"
                    style={inputStyle}
                    onChange={(e) => setAddress(e.target.value)}
                />

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
                        transition: "0.3s"
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