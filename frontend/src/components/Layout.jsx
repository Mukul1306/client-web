import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // 1. Added axios import
import "./layout.css";
import { FaDownload } from "react-icons/fa";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [catalogs, setCatalogs] = useState([]); // 2. Added state to store catalog data

  const closeMenu = () => setMenuOpen(false);

  // 3. FETCH CATALOGS FROM API
  useEffect(() => {
    axios.get("https://client-web-dwcu.onrender.com/api/catalogs/list")
      .then(res => setCatalogs(res.data))
      .catch(err => console.error("Error loading catalogs:", err));
  }, []);

  // 4. ADDED THE MISSING DOWNLOAD FUNCTION
 const handleDownload = async (type) => {
  const item = catalogs.find(c => c.type === type);
  
  if (item && item.pdfUrl) {
    try {
      // 1. Fetch the file as a blob to bypass browser "view" mode
      const response = await fetch(item.pdfUrl);
      const blob = await response.blob();
      
      // 2. Create a temporary local URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // 3. Create a hidden 'a' tag and click it programmatically
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}-Catalog.pdf`); // This forces download
      document.body.appendChild(link);
      link.click();
      
      // 4. Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback: If blob fetch fails, try opening in new tab
      window.open(item.pdfUrl, "_blank");
    }
  } else {
    alert("Catalog not found. Please upload it in the Admin panel.");
  }
};

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          {/* LOGO */}
          <Link to="/" className="logo-img">
            <img src="/logo.png" alt="Alyvrapharma" />
          </Link>

          <div className="header-actions">
            <div className="catalog-dropdown">
              <button className="catalog-btn">
                <FaDownload className="icon" /> 
                <span>Get Catalogs</span>
              </button>
              
              <div className="dropdown-content">
                {/* These buttons now have the handleDownload function to call */}
                <button onClick={() => handleDownload("Pharmaceutical")}>Pharmaceutical</button>
                <button onClick={() => handleDownload("Nutraceutical")}>Nutraceutical</button>
                <button onClick={() => handleDownload("Cosmetic/Derma")}>Cosmetic & Derma</button>
                <button onClick={() => handleDownload("Surgical Equipment")}>Surgical Equipment</button>
              </div>
            </div>
          </div>

          {/* HAMBURGER */}
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* NAV */}
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/all-products" onClick={closeMenu}>Products</Link> 
            <Link to="/blogs" onClick={closeMenu}>Articles</Link>
            <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/global-presence" className="global-btn" onClick={closeMenu}>
              Global Presence
            </Link>
            <Link to="/licenses" onClick={closeMenu}>Licenses & Certificates</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <main className="site-content">
        <Outlet context={{ search: query }} />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h3>Alyvrapharma</h3>
            <p>Trusted healthcare products with quality, safety and care.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-products">Products</Link> </li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/licenses">Licenses & Certificates</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <p>📍10, Shri Ram Vihar, Jagatpura, Jaipur, Jaipur- 302017, Rajasthan, India</p>
            <p>📞 +91 9993336473</p>
            <p>✉️ info@alyvrapharma.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Alyvrapharma. All rights reserved.
        </div>
      </footer>
    </>
  );
}