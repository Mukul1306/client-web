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
              <p>ALYVRA Pharma Private Limited is a premier pharmaceutical exporter from India.</p>
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
        
        <section className="paradigm-section">
      <div className="container">
        <div className="paradigm-wrapper">
          
          {/* Header Section */}
          <div className="paradigm-header" data-aos="fade-down">
            <span className="subtitle">Excellence in Supply Chain</span>
            <h2 className="main-title">A Paradigm in Global Pharmaceutical Supply</h2>
            <div className="title-underline"></div>
          </div>

          <div className="paradigm-content-grid">
            {/* Left Column: Text */}
            <div className="paradigm-text" data-aos="fade-right">
              <p className="lead-text">
                <strong>ALYVRA Pharma Private Limited</strong> stands as a symbol of vitality, reliability, and excellence in the global pharmaceutical supply chain. Our name reflects a deep commitment to trust, well-being, and the advancement of healthcare worldwide.
              </p>
              <p>
                As a dedicated player in pharmaceutical exporting and supply, we deliver products that consistently comply with international quality standards. Every aspect of our operations is guided by a systematic, compliance-driven approach, ensuring stringent regulatory and safety protocols.
              </p>
              <p>India has emerged as a trusted hub for pharmaceutical manufacturing and a primary supplier to the world. ALYVRA Pharma proudly represents India as a dedicated export partner, supporting healthcare systems internationally with reliability and professionalism. Our corporate office, strategically located in Jaipur, Rajasthan, India, serves as a central hub for coordinating international operations, export logistics, and supply chain management, enabling us to efficiently meet the needs of global healthcare partners.</p>
              <p>
Through our commitment to innovation, quality, and compliance, ALYVRA Pharma is focused on enhancing healthcare outcomes worldwide, building strong partnerships, and providing stakeholders with trustworthy and consistent pharmaceutical solutions.</p>
              <div className="accreditation-badges">
                <div className="badge-item">WHO</div>
                <div className="badge-item">GMP</div>
                <div className="badge-item">ISO 9001</div>
              </div>
            </div>

            {/* Right Column: Key Focus Points */}
            <div className="paradigm-features" data-aos="fade-left">
              <div className="feature-card">
                <h4>Global Reach</h4>
                <p>Strategically located in <strong>Jaipur, Rajasthan, India</strong>, serving as a central hub for international logistics and supply chain management.</p>
              </div>
              <div className="feature-card highlighted">
                <h4>India: The Trusted Hub</h4>
                <p>Representing India as a primary supplier to the world, supporting healthcare systems internationally with professional export partnerships.</p>
              </div>
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="paradigm-footer" data-aos="zoom-in">
            <p>
              Through innovation and quality, ALYVRA Pharma is focused on enhancing healthcare outcomes worldwide and providing stakeholders with trustworthy solutions.
            </p>
            <Link to="/about" className="learn-more-btn">Discover Our Legacy</Link>
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
    {/* --- SECTION 1: PHARMACEUTICAL MEDICINES (Image Left) --- */}
<section className="global-journey-section">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      <div className="journey-visual">
        <div className="globe-wrapper">
          <img src="/pharmacetucial.png" alt="Pharmaceutical Medicines" className="floating-globe" />
          <div className="experience-badge"><span className="text">Medicines</span></div>
        </div>
      </div>
      <div className="journey-content">
        <h2 className="section-title">Pharmaceutical Medicines</h2>
        <div className="story-block">
          <p className="highlight-text">Designed to prevent, diagnose, and treat a wide range of medical conditions.</p>
          <p>
            Our products are developed with a strong focus on quality and safety, adhering to guidelines from the 
            <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="content-link"> WHO</a> and 
            regulatory frameworks like the <a href="https://www.fda.gov" target="_blank" rel="noopener noreferrer" className="content-link"> FDA</a>, 
            ensuring international professional expectations.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- SECTION 2: NUTRACEUTICAL MEDICINES (Image Right) --- */}
<section className="global-journey-section">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      <div className="journey-content">
        <h2 className="section-title">Nutraceutical Medicines</h2>
        <div className="story-block">
          <p className="highlight-text">Supporting overall health, wellness, and preventive care through nutrition.</p>
          <p>
            Developed based on rigorous research, our formulations are inspired by standards from the 
            <a href="https://www.nih.gov" target="_blank" rel="noopener noreferrer" className="content-link"> NIH</a>, 
            emphasizing evidence-based safety and contributing to better health outcomes for consumers.
          </p>
        </div>
      </div>
      <div className="journey-visual">
        <div className="globe-wrapper">
          <img src="/nutraceutical.png" alt="Nutraceuticals" className="floating-globe" />
          <div className="experience-badge"><span className="text">nutraceutical</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- SECTION 3: DERMA MEDICINES (Image Left) --- */}
<section className="global-journey-section">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      <div className="journey-visual">
        <div className="globe-wrapper">
          <img src="/cosmetic.PNG" alt="Derma Medicines" className="floating-globe" />
          <div className="experience-badge"><span className="text">Cosmetic & Derma</span></div>
        </div>
      </div>
      <div className="journey-content">
        <h2 className="section-title">Derma Medicines</h2>
        <div className="story-block">
          <p className="highlight-text">Comprehensive skincare treatments for acne, pigmentation, and skin repair.</p>
          <p>
            Our standards are guided by global professional bodies such as the 
            <a href="https://www.aad.org" target="_blank" rel="noopener noreferrer" className="content-link"> American Academy of Dermatology</a>, 
            ensuring the highest level of safety and effectiveness for optimal skin health.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- SECTION 4: SURGICAL EQUIPMENT (Image Right) --- */}
<section className="global-journey-section">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      <div className="journey-content">
        <h2 className="section-title">Surgical Equipment</h2>
        <div className="story-block">
          <p className="highlight-text">Precision and reliability for modern medical procedures.</p>
          <p>
            Evaluated according to stringent international quality standards, our practices are informed by 
            <a href="https://www.iso.org" target="_blank" rel="noopener noreferrer" className="content-link"> ISO</a> 
            benchmarks, supporting healthcare professionals in delivering efficient and safe patient care.
          </p>
        </div>
      </div>
      <div className="journey-visual">
        <div className="globe-wrapper">
          <img src="/Surgical Equipment.png" alt="Surgical Equipment" className="floating-globe" />
          <div className="experience-badge"><span className="text">Surgical</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* REPEAT SECTIONS FOR OTHER CATEGORIES */}
      {/* ... (Apply getImageUrl to all img tags in your journey sections) ... */}

      <GlobalPresenceSection compact />

      {/* ===== CERTIFICATION SECTION ===== */}
     
    </div>
  );
}