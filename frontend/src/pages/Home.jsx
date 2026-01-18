import { useEffect, useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import GlobalPresenceSection from "../components/GlobalPresenceSection";


import "./home.css";
import { Link } from "react-router-dom";


export default function Home() {
  const [selectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    const { search } = useOutletContext();

  useEffect(() => {
    axios
     .get("https://client-web-dwcu.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

const filteredProducts = products.filter((p) => {
  const text = `${p.name} ${p.composition || ""} ${p.manufacturer || ""}`
    .toLowerCase();

  const matchesSearch = text.includes(search.toLowerCase());

  const matchesCategory =
    selectedCategory === "All"
      ? true
      : p.category &&
        p.category.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase();

  return matchesSearch && matchesCategory;
});


  return (
    <div className="home-wrapper">

      {/* ===== HERO ===== */}
      {/* ===== HERO SECTION ===== */}
<section className="hero-modern">
  <div className="hero-inner">

    {/* LEFT CONTENT */}
      <div className="hero-left">
        <h1>
        Your Trusted <br />
        <span> Alyvra Pharma</span>
        </h1>

        <p>
        Safe medicines, fast delivery, and professional healthcare guidance
        all in one place.
      </p>

        <div className="hero-buttons">
        <button className="btn-primary" onClick={() => navigate("/about")}>About Us</button>
        <button className="btn-outline" onClick={() => navigate("/all-products")}>View Product</button>
        </div>

        {/* CATEGORY ICONS */}
      <div className="hero-categories">
        <div className="hero-cat">💊 Pharmaceutical</div>
        <div className="hero-cat">🩺 Nutraceutical</div>
        <div className="hero-cat">🧴Cosmetic / Derma</div>
        <div className="hero-cat">🩺 Surgical Equipment</div>
      </div>
    </div>
    {/* RIGHT IMAGE */}
    <div className="hero-right">  
      <img src="/image-removebg-preview (1).png" alt="Alyvrapharma Healthcare Products" />
    </div>

  </div>
</section>



   
   <section className="home-intro">
  <div className="container">
    <div className="intro-grid">
      <div className="intro-text">
        <span className="subtitle">Welcome to ALYVRA Pharma</span>
        <h1>Advancing Global Healthcare through Quality Excellence</h1>
        <p>
          ALYVRA Pharma Private Limited is a premier pharmaceutical exporter from India, 
          dedicated to bridging the gap between high-quality medicine and global accessibility. 
          Our operations are anchored in a robust regulatory framework and a commitment 
          to therapeutic integrity.
        </p>
       
      </div>
      <div className="intro-visual-card">
        <div className="floating-badge">ISO & GMP Certified</div>
        <h3>Our Core Philosophy</h3>
        <p>Transparency in documentation, accuracy in supply, and adherence to international medical standards define every shipment we process.</p>
       <Link to="/about">
    <button className="primary-btn">Explore More</button>
  </Link>
      </div>
    </div>
  </div>
</section>
   

      {/* ===== PRODUCTS ===== */}
      <section className="featured-products">
        <div className="featured-header">
  <h2>Our Featured Products</h2>
  <p>High quality pharmaceutical products manufactured with care</p>
</div>

{/* Home Page: Restricted to exactly 3 products */}
<div className="featured-grid">
  {filteredProducts.slice(0, 3).map((p) => (
    <div key={p._id} className="featured-card">
      <div
        className="product-click"
        onClick={() => navigate(`/product/${p._id}`)}
      >
       <img src={p.image} alt={p.name} />
       
        <div className="product-details">
          <h4>{p.name}</h4>
          {p.composition && <p><strong>Composition:</strong> {p.composition}</p>}
          {p.form && <p><strong>Form:</strong> {p.form}</p>}
          <p className="product-company">Regulatory Ready</p>
        </div>
      </div>

      <button
        className="inquiry-btn"
        onClick={() =>
          navigate("/product-inquiry", {
            state: { productName: p.name }
          })
        }
      >
        Inquiry Now
      </button>
    </div>
  ))}
</div>

<div className="show-more-container">
  <button 
    className="read-more-main-btn" 
    onClick={() => navigate("/all-products")} // Updated to match the new page route
  >
    Read More Products →
  </button>
</div>
        
        <section className="home-about-overview">
  <div className="container">
    <div className="about-overview-card">
      <div className="overview-content">
        <h2>A Paradigm in Global Pharmaceutical Supply</h2>
        <p className="brand-meaning">
          <strong>ALYVRA</strong> represents our commitment to <strong>Vitality and Reliability</strong>. 
          We possess an unwavering dedication to fostering a healthier global community.
        </p>
        
        <p>
          <strong>ALYVRA Pharma Private Limited</strong> has emerged as a benchmark in 
          pharmaceutical exporting and supply, delivering products that strictly adhere to 
          international quality standards. We believe in a systematic, compliance-driven approach; 
          hence, our business maintains <strong>WHO, GMP, and ISO accreditations</strong>.
        </p>

        <p>
          India has become the epicenter for pharmaceutical manufacturing and a primary supplier 
          to the world. We are proud to represent India as a dedicated export powerhouse with 
          our corporate office strategically located in <strong>Surat, Gujarat, India</strong>.
        </p>

        <div className="location-badge">
          <i className="fas fa-map-marker-alt"></i> Corporate Office: Jaipur , India
        </div>
      </div>
    </div>
  </div>
</section>

<section className="global-journey-section">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      
      {/* Visual Side */}
      <div className="journey-visual" data-aos="zoom-in" data-aos-delay="200">
        <div className="globe-wrapper">
          <img src="/pharmacetucial.png" alt="Global Presence" className="floating-globe" />
          <div className="experience-badge">
            <span className="years"></span>
            <span className="text"> Pharmaceutical</span>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="journey-content">
        <h2 className="section-title">A Legacy of Vision & Excellence</h2>
        
        <div className="story-block">
          <p className="highlight-text">
            Twelve years ago, a group of three visionaries identified a critical market gap 
            in the pharmaceutical sector. This sparked the foundation of <strong>Alyvra Pharma Pvt. Ltd.</strong>
          </p>
          
          <p>
            Under the strategic guidance of our promoters, we have evolved into a global bridge, 
            serving that gap through world-class manufacturing, exporting, and supplying 
            premium pharmaceutical products across international borders.
          </p>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <i className="fas fa-microscope"></i>
            <span>Quality Mfg.</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-globe-americas"></i>
            <span>Global Export</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<section className="global-journey-section opposite">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      
      {/* Content Side (Now on the Left) */}
      <div className="journey-content" data-aos="fade-right">
        <h4 className="section-subtitle">OUR GLOBAL JOURNEY</h4>
        <h2 className="section-title">A Legacy of Vision & Excellence</h2>
        
        <div className="story-block">
          <p className="highlight-text">
            Twelve years ago, a group of three visionaries identified a critical market gap 
            in the pharmaceutical sector. This sparked the foundation of <strong>Alyvra Pharma Pvt. Ltd.</strong>
          </p>
          
          <p>
            Under the strategic guidance of our promoters, we have evolved into a global bridge, 
            serving that gap through world-class manufacturing, exporting, and supplying 
            premium pharmaceutical products across international borders.
          </p>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <i className="fas fa-check-circle"></i>
            <span>WHO-GMP Certified</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-shipping-fast"></i>
            <span>Global Supply Chain</span>
          </div>
        </div>
      </div>

      {/* Visual Side (Now on the Right) */}
      <div className="journey-visual" data-aos="fade-left" data-aos-delay="200">
        <div className="globe-wrapper">
          {/* Replace with your globe/world map image */}
          <img src="/Surgical Equipment.png" alt="Global Presence" className="floating-globe" />
          <div className="experience-badge left-badge">
            <span className="years"></span>
            <span className="text"> Surgical Equipment</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<section className="global-journey-section">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      
      {/* Visual Side */}
      <div className="journey-visual" data-aos="zoom-in" data-aos-delay="200">
        <div className="globe-wrapper">
          <img src="/ChatGPT Image Jan 12, 2026, 12_18_45 PM.png" alt="Global Presence" className="floating-globe" />
          <div className="experience-badge">
            <span className="years"></span>
            <span className="text"> Nutraceutical</span>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="journey-content">
        <h2 className="section-title">A Legacy of Vision & Excellence</h2>
        
        <div className="story-block">
          <p className="highlight-text">
            Twelve years ago, a group of three visionaries identified a critical market gap 
            in the pharmaceutical sector. This sparked the foundation of <strong>Alyvra Pharma Pvt. Ltd.</strong>
          </p>
          
          <p>
            Under the strategic guidance of our promoters, we have evolved into a global bridge, 
            serving that gap through world-class manufacturing, exporting, and supplying 
            premium pharmaceutical products across international borders.
          </p>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <i className="fas fa-microscope"></i>
            <span>Quality Mfg.</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-globe-americas"></i>
            <span>Global Export</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<section className="global-journey-section opposite">
  <div className="container">
    <div className="journey-card" data-aos="fade-up">
      
      {/* Content Side (Now on the Left) */}
      <div className="journey-content" data-aos="fade-right">
        <h4 className="section-subtitle">OUR GLOBAL JOURNEY</h4>
        <h2 className="section-title">A Legacy of Vision & Excellence</h2>
        
        <div className="story-block">
          <p className="highlight-text">
            Twelve years ago, a group of three visionaries identified a critical market gap 
            in the pharmaceutical sector. This sparked the foundation of <strong>Alyvra Pharma Pvt. Ltd.</strong>
          </p>
          
          <p>
            Under the strategic guidance of our promoters, we have evolved into a global bridge, 
            serving that gap through world-class manufacturing, exporting, and supplying 
            premium pharmaceutical products across international borders.
          </p>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <i className="fas fa-check-circle"></i>
            <span>WHO-GMP Certified</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-shipping-fast"></i>
            <span>Global Supply Chain</span>
          </div>
        </div>
      </div>

      {/* Visual Side (Now on the Right) */}
      <div className="journey-visual" data-aos="fade-left" data-aos-delay="200">
        <div className="globe-wrapper">
          {/* Replace with your globe/world map image */}
          <img src="/Surgical Equipment.png" alt="Global Presence" className="floating-globe" />
          <div className="experience-badge left-badge">
            <span className="years"></span>
            <span className="text"> Cosmetic / Derma</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
                    <GlobalPresenceSection compact />
                    <div className="certification-block" style={{ borderTop: '1px solid #eee', paddingTop: '50px', textAlign: 'center' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '15px' }}>Our Facilities Accredited & Complied</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px', color: '#666', fontSize: '15px' }}>
            With WHO-GMP standards, we offer seamless service from the Plant registration to Development/Registration, and Commercialisation of the products globally.
          </p>
          
          {/* This uses your uploaded image for the logos */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
             <img 
               src="/lincence.png" 
               alt="Accreditations - WHO, ISO, Star Export House" 
               style={{ width: '100%', maxWidth: '1000px', height: 'auto' }} 
             />
          </div>
        </div>
      </section>
    </div>
  );
}
