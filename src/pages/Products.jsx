import Swiper from "swiper";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Products({ products, addToCart }) {
  useEffect(() => {
    // Khởi tạo Swiper cho riêng trang Products
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
      {/* --- BILLBOARD --- */}
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

      {/* --- DANH SÁCH SẢN PHẨM --- */}
      <section id="body-products" className="product-store padding-large">
        <div className="container">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Danh sách sản phẩm</h2>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((p) => (
  <div className="col" key={p.product_id}>
    <div className="product-card position-relative shadow-sm h-100 p-2">

      {/* 🔥 CLICK ĐỂ XEM CHI TIẾT */}
      <Link
        to={`/product/${p.product_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          className="image-holder"
          style={{
            height: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src={p.image_url || "images/product-item1.jpg"}
            alt={p.name}
            className="img-fluid"
            style={{ maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>

        <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
          <h3 className="card-title text-uppercase fs-6">{p.name}</h3>
          <span className="text-primary fw-bold">
            {new Intl.NumberFormat('vi-VN').format(p.price)}đ
          </span>
        </div>
      </Link>

      {/* 🔥 NÚT ADD TO CART */}
      <div
        className="cart-concern position-absolute"
        style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <button
          onClick={() => addToCart(p.product_id)}
          className="btn btn-medium btn-black text-uppercase"
        >
          Add to Cart
        </button>
      </div>

    </div>
  </div>
))}
          </div>
        </div>
      </section>
    </>
  );
}