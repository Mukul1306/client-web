export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div>
          <h3>Medical Pharmacy</h3>
          <p>
            Trusted pharmaceutical products delivered with care and quality.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Gallery</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4>Contact Us</h4>
          <p>📍 Jaipur, Rajasthan</p>
          <p>📞 +91 9XXXXXXXXX</p>
          <p>✉️ info@medicalpharmacy.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Medical Pharmacy. All rights reserved.
      </div>
    </footer>
  );
}
