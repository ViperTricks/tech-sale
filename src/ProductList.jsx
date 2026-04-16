import { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu mẫu từ database của bạn (sau này sẽ fetch từ API)
    const sampleProducts = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        description: "Chip A17 Pro, camera 48MP, Titan Design",
        price: 28990000,
        image: "images/product-item1.jpg"
      },
      {
        id: 2,
        name: "MacBook Pro 16 inch M4",
        description: "Laptop cao cấp dành cho dân thiết kế và lập trình",
        price: 45990000,
        image: "images/MacBookPro16inchM4.jpg"
      },
      {
        id: 3,
        name: "AirPods Pro 2",
        description: "Âm thanh không gian, chống ồn chủ động",
        price: 5990000,
        image: "images/product-item3.jpg"
      },
      {
        id: 4,
        name: "ASUS ROG Zephyrus G14",
        description: "Laptop gaming mạnh mẽ, màn hình 120Hz",
        price: 32990000,
        image: "images/ASUS-ROG-Zephyrus-G14.jpg"
      },
      {
        id: 5,
        name: "Samsung Galaxy Watch 6",
        description: "Đồng hồ thông minh theo dõi sức khỏe",
        price: 8990000,
        image: "images/product-item5.jpg"
      },
      {
        id: 6,
        name: "Logitech MX Master 3S",
        description: "Chuột không dây cao cấp cho dân văn phòng",
        price: 2490000,
        image: "images/product-item6.jpg"
      },
    ];

    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const addToCart = (product) => {
    alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Đang tải sản phẩm...</div>;
  }

  return (
    <section id="products" className="product-store padding-large">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-4">
            <h2 className="display-7 text-dark text-uppercase">Sản phẩm</h2>
          </div>

          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div className="col" key={product.id}>
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="img-fluid"
                    />
                  </div>

                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <button 
                        className="btn btn-medium btn-black"
                        onClick={() => addToCart(product)}
                      >
                        Thêm vào giỏ
                        <svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg>
                      </button>
                    </div>
                  </div>

                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">{product.name}</a>
                    </h3>
                    <span className="item-price text-primary">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>

                  <p className="text-muted small mt-1 mb-0">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList; 