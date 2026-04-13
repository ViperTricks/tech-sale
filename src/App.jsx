// src/App.jsx
import { useEffect } from 'react'
import Swiper from "swiper"
import "swiper/css"

function App() {
  useEffect(() => {
  new Swiper('.main-swiper', {
    loop: true,
  })

  new Swiper('.product-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
  })

  new Swiper('.product-watch-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
  })
}, [])
  return (
    <>
      <div>
    <div className="search-popup">
        <div className="search-popup-container">

          <form role="search" method="get" className="search-form" action="">
            <input type="search" id="search-form" className="search-field" placeholder="Type and press enter" defaultValue="" name="s" />
            <button type="submit" className="search-submit"><svg className="search"><use xlinkHref="#search"></use></svg></button>
          </form>

          <h5 className="cat-list-title">Browse Categories</h5>
          
          <ul className="cat-list">
            <li className="cat-list-item">
              <a href="#" title="Mobile Phones">Mobile Phones</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Smart Watches">Smart Watches</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Headphones">Headphones</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Accessories">Accessories</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Monitors">Monitors</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Speakers">Speakers</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Memory Cards">Memory Cards</a>
            </li>
          </ul>

        </div>
    </div>
    
    <header id="header" className="site-header header-scrolled position-fixed text-black bg-light">
      <nav id="header-nav" className="navbar navbar-expand-lg px-3 mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">
            <img src="images/main-logo.png" className="logo"/>
          </a>
          <button className="navbar-toggler d-flex d-lg-none order-3 p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <svg className="navbar-icon">
              <use xlinkHref="#navbar-icon"></use>
            </svg>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
            <div className="offcanvas-header px-4 pb-0">
              <a className="navbar-brand" href="index.html">
                <img src="images/main-logo.png" className="logo"/>
              </a>
              <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"></button>
            </div>
            <div className="offcanvas-body">
              <ul id="navbar" className="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link me-4 active" href="#billboard">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-4" href="#company-services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-4" href="#mobile-products">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-4" href="#smart-watches">Watches</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-4" href="#yearly-sale">Sale</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-4" href="#latest-blog">Blog</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link me-4 dropdown-toggle link-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Pages</a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="about.html" className="dropdown-item">About</a>
                    </li>
                    <li>
                      <a href="blog.html" className="dropdown-item">Blog</a>
                    </li>
                    <li>
                      <a href="shop.html" className="dropdown-item">Shop</a>
                    </li>
                    <li>
                      <a href="cart.html" className="dropdown-item">Cart</a>
                    </li>
                    <li>
                      <a href="checkout.html" className="dropdown-item">Checkout</a>
                    </li>
                    <li>
                      <a href="single-post.html" className="dropdown-item">Single Post</a>
                    </li>
                    <li>
                      <a href="single-product.html" className="dropdown-item">Single Product</a>
                    </li>
                    <li>
                      <a href="contact.html" className="dropdown-item">Contact</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <div className="user-items ps-5">
                    <ul className="d-flex justify-content-end list-unstyled">
                      <li className="search-item pe-3">
                        <a href="#" className="search-button">
                          <svg className="search">
                            <use xlinkHref="#search"></use>
                          </svg>
                        </a>
                      </li>
                      <li className="pe-3">
                        <a href="#">
                          <svg className="user">
                            <use xlinkHref="#user"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="cart.html">
                          <svg className="cart">
                            <use xlinkHref="#cart"></use>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
      <div className="swiper main-swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-md-6">
                  <div className="banner-content">
                    <h1 className="display-2 text-uppercase text-dark pb-5">Your Products Are Great.</h1>
                    <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="image-holder">
                    <img src="images/banner-image.png" alt="banner"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="container">
              <div className="row d-flex flex-wrap align-items-center">
                <div className="col-md-6">
                  <div className="banner-content">
                    <h1 className="display-2 text-uppercase text-dark pb-5">Technology Hack You Won't Get</h1>
                    <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="image-holder">
                    <img src="images/banner-image.png" alt="banner"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-icon swiper-arrow swiper-arrow-prev">
        <svg className="chevron-left">
          <use xlinkHref="#chevron-left" />
        </svg>
      </div>
      <div className="swiper-icon swiper-arrow swiper-arrow-next">
        <svg className="chevron-right">
          <use xlinkHref="#chevron-right" />
        </svg>
      </div>
    </section>
    <section id="company-services" className="padding-large">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box d-flex">
              <div className="icon-box-icon pe-3 pb-3">
                <svg className="cart-outline">
                  <use xlinkHref="#cart-outline" />
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">Free delivery</h3>
                <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box d-flex">
              <div className="icon-box-icon pe-3 pb-3">
                <svg className="quality">
                  <use xlinkHref="#quality" />
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">Quality guarantee</h3>
                <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box d-flex">
              <div className="icon-box-icon pe-3 pb-3">
                <svg className="price-tag">
                  <use xlinkHref="#price-tag" />
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">Daily offers</h3>
                <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box d-flex">
              <div className="icon-box-icon pe-3 pb-3">
                <svg className="shield-plus">
                  <use xlinkHref="#shield-plus" />
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">100% secure payment</h3>
                <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Mobile Products</h2>
            <div className="btn-right">
              <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
            </div>
          </div>
          <div className="swiper product-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item1.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Iphone 10</a>
                    </h3>
                    <span className="item-price text-primary">$980</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item2.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Iphone 11</a>
                    </h3>
                    <span className="item-price text-primary">$1100</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item3.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Iphone 8</a>
                    </h3>
                    <span className="item-price text-primary">$780</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item4.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Iphone 13</a>
                    </h3>
                    <span className="item-price text-primary">$1500</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item5.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Iphone 12</a>
                    </h3>
                    <span className="item-price text-primary">$1300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-pagination position-absolute text-center"></div>
    </section>
    <section id="smart-watches" className="product-store padding-large position-relative">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Smart Watches</h2>
            <div className="btn-right">
              <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
            </div>
          </div>
          <div className="swiper product-watch-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item6.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Pink watch</a>
                    </h3>
                    <span className="item-price text-primary">$870</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item7.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">Heavy watch</a>
                    </h3>
                    <span className="item-price text-primary">$680</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item8.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">spotted watch</a>
                    </h3>
                    <span className="item-price text-primary">$750</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item9.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">black watch</a>
                    </h3>
                    <span className="item-price text-primary">$650</span>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="product-card position-relative">
                  <div className="image-holder">
                    <img src="images/product-item10.jpg" alt="product-item" className="img-fluid"/>
                  </div>
                  <div className="cart-concern position-absolute">
                    <div className="cart-button d-flex">
                      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline"></use></svg></a>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between pt-3">
                    <h3 className="card-title text-uppercase">
                      <a href="#">black watch</a>
                    </h3>
                    <span className="item-price text-primary">$750</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-pagination position-absolute text-center"></div>
    </section>
    <section id="yearly-sale" className="bg-light-blue overflow-hidden mt-5 padding-xlarge" style={{backgroundImage: 'url("images/single-image1.png")', backgroundPosition: 'right', backgroundRepeat: 'no-repeat'}}>
      <div className="row d-flex flex-wrap align-items-center">
        <div className="col-md-6 col-sm-12">
          <div className="text-content offset-4 padding-medium">
            <h3>10% off</h3>
            <h2 className="display-2 pb-5 text-uppercase text-dark">New year sale</h2>
            <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Sale</a>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          
        </div>
      </div>
    </section>
    <section id="latest-blog" className="padding-large">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Latest Posts</h2>
            <div className="btn-right">
              <a href="blog.html" className="btn btn-medium btn-normal text-uppercase">Read Blog</a>
            </div>
          </div>
          <div className="post-grid d-flex flex-wrap justify-content-between">
            <div className="col-lg-4 col-sm-12">
              <div className="card border-none me-3">
                <div className="card-image">
                  <img src="images/post-item1.jpg" alt="" className="img-fluid"/>
                </div>
              </div>
              <div className="card-body text-uppercase">
                <div className="card-meta text-muted">
                  <span className="meta-date">feb 22, 2023</span>
                  <span className="meta-category">- Gadgets</span>
                </div>
                <h3 className="card-title">
                  <a href="#">Get some cool gadgets in 2023</a>
                </h3>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="card border-none me-3">
                <div className="card-image">
                  <img src="images/post-item2.jpg" alt="" className="img-fluid"/>
                </div>
              </div>
              <div className="card-body text-uppercase">
                <div className="card-meta text-muted">
                  <span className="meta-date">feb 25, 2023</span>
                  <span className="meta-category">- Technology</span>
                </div>
                <h3 className="card-title">
                  <a href="#">Technology Hack You Won't Get</a>
                </h3>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="card border-none me-3">
                <div className="card-image">
                  <img src="images/post-item3.jpg" alt="" className="img-fluid"/>
                </div>
              </div>
              <div className="card-body text-uppercase">
                <div className="card-meta text-muted">
                  <span className="meta-date">feb 22, 2023</span>
                  <span className="meta-category">- Camera</span>
                </div>
                <h3 className="card-title">
                  <a href="#">Top 10 Small Camera In The World</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="testimonials" className="position-relative">
      <div className="container">
        <div className="row">
          <div className="review-content position-relative">
            <div className="swiper-icon swiper-arrow swiper-arrow-prev position-absolute d-flex align-items-center">
              <svg className="chevron-left">
                <use xlinkHref="#chevron-left" />
              </svg>
            </div>
            <div className="swiper testimonial-swiper">
              <div className="quotation text-center">
                <svg className="quote">
                  <use xlinkHref="#quote" />
                </svg>
              </div>
              <div className="swiper-wrapper">
                <div className="swiper-slide text-center d-flex justify-content-center">
                  <div className="review-item col-md-10">
                    <i className="icon icon-review"></i>
                    <blockquote>“Tempus oncu enim pellen tesque este pretium in neque, elit morbi sagittis lorem habi mattis Pellen tesque pretium feugiat vel morbi suspen dise sagittis lorem habi tasse morbi.”</blockquote>
                    <div className="rating">
                      <svg className="star star-fill">
                        <use xlinkHref="#star-fill"></use>
                      </svg>
                      <svg className="star star-fill">
                        <use xlinkHref="#star-fill"></use>
                      </svg>
                      <svg className="star star-fill">
                        <use xlinkHref="#star-fill"></use>
                      </svg>
                      <svg className="star star-half">
                        <use xlinkHref="#star-half"></use>
                      </svg>
                      <svg className="star star-empty">
                        <use xlinkHref="#star-empty"></use>
                      </svg>
                    </div>
                    <div className="author-detail">
                      <div className="name text-dark text-uppercase pt-2">Emma Chamberlin</div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide text-center d-flex justify-content-center">
                  <div className="review-item col-md-10">
                    <i className="icon icon-review"></i>
                    <blockquote>“A blog is a digital publication that can complement a website or exist independently. A blog may include articles, short posts, listicles, infographics, videos, and other digital content.”</blockquote>
                    <div className="rating">
                      <svg className="star star-fill">
                        <use xlinkHref="#star-fill"></use>
                      </svg>
                      <svg className="star star-fill">
                        <use xlinkHref="#star-fill"></use>
                      </svg>
                      <svg className="star star-fill">
                        <use xlinkHref="#star-fill"></use>
                      </svg>
                      <svg className="star star-half">
                        <use xlinkHref="#star-half"></use>
                      </svg>
                      <svg className="star star-empty">
                        <use xlinkHref="#star-empty"></use>
                      </svg>
                    </div>
                    <div className="author-detail">
                      <div className="name text-dark text-uppercase pt-2">Jennie Rose</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-icon swiper-arrow swiper-arrow-next position-absolute d-flex align-items-center">
              <svg className="chevron-right">
                <use xlinkHref="#chevron-right" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </section>
    <section id="subscribe" className="container-grid padding-large position-relative overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
            <div className="col-md-6 col-sm-12">
              <div className="display-header pe-3">
                <h2 className="display-7 text-uppercase text-light">Subscribe Us Now</h2>
                <p>Get latest news, updates and deals directly mailed to your inbox.</p>
              </div>
            </div>
            <div className="col-md-5 col-sm-12">
              <form className="subscription-form validate">
                <div className="input-group flex-wrap">
                  <input className="form-control btn-rounded-none" type="email" name="EMAIL" placeholder="Your email address here" required=""/>
                  <button className="btn btn-medium btn-primary text-uppercase btn-rounded-none" type="submit" name="subscribe">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="instagram" className="padding-large overflow-hidden no-padding-top">
      <div className="container">
        <div className="row">
          <div className="display-header text-uppercase text-dark text-center pb-3">
            <h2 className="display-7">Shop Our Insta</h2>
          </div>
          <div className="d-flex flex-wrap">
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item1.jpg" alt="instagram" className="insta-image"/>
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item2.jpg" alt="instagram" className="insta-image"/>
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item3.jpg" alt="instagram" className="insta-image"/>
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item4.jpg" alt="instagram" className="insta-image"/>
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item5.jpg" alt="instagram" className="insta-image"/>
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
          </div>
        </div>
      </div>
    </section>
    <footer id="footer" className="overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="footer-top-area">
            <div className="row d-flex flex-wrap justify-content-between">
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="footer-menu">
                  <img src="images/main-logo.png" alt="logo"/>
                  <p>Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa volutpat aenean odio erat nullam fringilla.</p>
                  <div className="social-links">
                    <ul className="d-flex list-unstyled">
                      <li>
                        <a href="#">
                          <svg className="facebook">
                            <use xlinkHref="#facebook" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg className="instagram">
                            <use xlinkHref="#instagram" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg className="twitter">
                            <use xlinkHref="#twitter" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg className="linkedin">
                            <use xlinkHref="#linkedin" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg className="youtube">
                            <use xlinkHref="#youtube" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 pb-3">
                <div className="footer-menu text-uppercase">
                  <h5 className="widget-title pb-2">Quick Links</h5>
                  <ul className="menu-list list-unstyled text-uppercase">
                    <li className="menu-item pb-2">
                      <a href="#">Home</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">About</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Shop</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Blogs</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="footer-menu text-uppercase">
                  <h5 className="widget-title pb-2">Help & Info Help</h5>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item pb-2">
                      <a href="#">Track Your Order</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Returns Policies</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Shipping + Delivery</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Contact Us</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">Faqs</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="footer-menu contact-item">
                  <h5 className="widget-title text-uppercase pb-2">Contact Us</h5>
                  <p>Do you have any queries or suggestions? <a href="mailto:">yourinfo@gmail.com</a>
                  </p>
                  <p>If you need support? Just give us a call. <a href="">+55 111 222 333 44</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </footer>
    <div id="footer-bottom">
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-between">
          <div className="col-md-4 col-sm-6">
            <div className="Shipping d-flex">
              <p>We ship with:</p>
              <div className="card-wrap ps-2">
                <img src="images/dhl.png" alt="visa"/>
                <img src="images/shippingcard.png" alt="mastercard"/>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="payment-method d-flex">
              <p>Payment options:</p>
              <div className="card-wrap ps-2">
                <img src="images/visa.jpg" alt="visa"/>
                <img src="images/mastercard.jpg" alt="mastercard"/>
                <img src="images/paypal.jpg" alt="paypal"/>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="copyright">
              <p>© Copyright 2023 MiniStore. Design by <a href="https://templatesjungle.com/">TemplatesJungle</a> Distribution by <a href="https://themewagon.com">ThemeWagon</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  
    </>
  )
}

export default App