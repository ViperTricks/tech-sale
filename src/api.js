const API =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://tech-sale-be.onrender.com";

export default API;