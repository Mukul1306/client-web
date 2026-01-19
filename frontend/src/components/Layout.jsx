import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./layout.css";
import { FaDownload } from "react-icons/fa";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const [query] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
            
            {/* DROPDOWN MENU */}
          <div className="dropdown-content">
  <a href="https://client-web-dwcu.onrender.com/api/catalogs/download/Pharmaceutical">Pharmaceutical</a>
  <a href="https://client-web-dwcu.onrender.com/api/catalogs/download/Nutraceutical">Nutraceutical</a>
  <a href="https://client-web-dwcu.onrender.com/api/catalogs/download/Cosmetic%2FDerma">
    Cosmetic & Derma
  </a>
  <a href="https://client-web-dwcu.onrender.com/api/catalogs/download/Surgical Equipment">Surgical Equipment</a>
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
            <Link to="/all-products">Products</Link> 
            <Link to="/blogs" onClick={closeMenu}>Articles</Link>
            <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/global-presence" className="global-btn">
  Global Presence
</Link>
<Link to="/licenses">Licenses & Certificates</Link>
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
