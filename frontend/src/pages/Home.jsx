import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import GlobalPresenceSection from "../components/GlobalPresenceSection";
import "./home.css";

export default function Home() {
  const [selectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { search } = useOutletContext();

  // REPLACE 'your_cloud_name' with your actual Cloudinary name
  const CLOUD_NAME = "your_cloud_name"; 
  const API_BASE = "https://client-web-dwcu.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // SMART IMAGE HELPER
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "https://via.placeholder.com/400?text=No+Image";
    if (imageSource.startsWith("http")) return imageSource;
    if (imageSource.includes(".")) return `${API_BASE}/uploads/${imageSource}`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  const filteredProducts = products.filter((p) => {
    const text = `${p.name} ${p.composition || ""} ${p.manufacturer || ""}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" ? true : 
      p.category && p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-wrapper">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-modern">
        <div className="hero-inner">
          <div className="hero-left">
            <h1>Your Trusted <br /><span> Alyvra Pharma</span></h1>
            <p>Safe medicines, fast delivery, and professional healthcare guidance all in one place.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate("/about")}>About Us</button>
              <button className="btn-outline" onClick={() => navigate("/all-products")}>View Product</button>
            </div>
            <div className="hero-categories">
              <div className="hero-cat">💊 Pharmaceutical</div>
              <div className="hero-cat">🩺 Nutraceutical</div>
              <div className="hero-cat">🧴 Cosmetic / Derma</div>
              <div className="hero-cat">🩺 Surgical Equipment</div>
            </div>
          </div>
          <div className="hero-right">
            {/* If this image is on Cloudinary, replace the src with the Public ID */}
            <img src="/image-removebg-preview (1).png" alt="Healthcare Products" />
          </div>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="home-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text">
              <span className="subtitle">Welcome to ALYVRA Pharma</span>
              <h1>Advancing Global Healthcare through Quality Excellence</h1>
              <p>ALYVRA Pharma Private Limited is a premier pharmaceutical exporter from India...</p>
            </div>
            <div className="intro-visual-card">
              <div className="floating-badge">ISO & GMP Certified</div>
              <h3>Our Core Philosophy</h3>
              <p>Transparency in documentation and adherence to international medical standards.</p>
              <Link to="/about"><button className="primary-btn">Explore More</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured-products">
        <div className="featured-header">
          <h2>Our Featured Products</h2>
          <p>High quality pharmaceutical products manufactured with care</p>
        </div>
        <div className="featured-grid">
          {filteredProducts.slice(0, 3).map((p) => (
            <div key={p._id} className="featured-card">
              <div className="product-click" onClick={() => navigate(`/product/${p._id}`)}>
                {/* FIXED: Using getImageUrl helper for product images */}
                <img src={getImageUrl(p.image)} alt={p.name} />
                <div className="product-details">
                  <h4>{p.name}</h4>
                  {p.composition && <p><strong>Comp:</strong> {p.composition}</p>}
                  <p className="product-company">Regulatory Ready</p>
                </div>
              </div>
              <button className="inquiry-btn" onClick={() => navigate("/product-inquiry", { state: { productName: p.name } })}>
                Inquiry Now
              </button>
            </div>
          ))}
        </div>
        <div className="show-more-container">
          <button className="read-more-main-btn" onClick={() => navigate("/all-products")}>Read More Products →</button>
        </div>
      </section>

      {/* ===== GLOBAL JOURNEY SECTIONS (CLOUDINARY READY) ===== */}
      <section className="global-journey-section">
        <div className="container">
          <div className="journey-card" data-aos="fade-up">
            <div className="journey-visual">
              <div className="globe-wrapper">
                {/* Replace CLOUD_ID with actual ID from your Cloudinary */}
                <img src={getImageUrl("pharmacetucial")} alt="Pharmaceutical" className="floating-globe" />
                <div className="experience-badge"><span className="text">Pharmaceutical</span></div>
              </div>
            </div>
            <div className="journey-content">
              <h2 className="section-title">A Legacy of Vision & Excellence</h2>
              <div className="story-block">
                <p className="highlight-text">Twelve years ago, we identified a critical market gap...</p>
                <p>We have evolved into a global bridge, supplying premium products across international borders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REPEAT SECTIONS FOR OTHER CATEGORIES */}
      {/* ... (Apply getImageUrl to all img tags in your journey sections) ... */}

      <GlobalPresenceSection compact />

      {/* ===== CERTIFICATION SECTION ===== */}
      <div className="certification-block" style={{ borderTop: '1px solid #eee', paddingTop: '50px', textAlign: 'center' }}>
        <h2>Our Facilities Accredited & Complied</h2>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <img src="/lincence.png" alt="Accreditations" style={{ width: '100%', maxWidth: '1000px', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
}