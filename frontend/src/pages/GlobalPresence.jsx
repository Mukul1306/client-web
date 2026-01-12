import { useState } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed
import "./globalPresence.css";

const regions = {
  Asia: "India, Nepal, Bangladesh, Sri Lanka, Myanmar, Vietnam",
  Africa: "Nigeria, Kenya, South Africa, Egypt, Ghana",
  "North America": "USA, Canada, Mexico",
  "South America": "Brazil, Chile, Peru, Colombia",
  "Gulf Country": "UAE, Saudi Arabia, Kuwait, Qatar",
  CIS: "Russia, Kazakhstan, Uzbekistan",
  Oceania: "Papua New Guinea, Fiji, Solomon Island, Vanuatu, Tonga, Samoa"
};

export default function GlobalPresence() {
  const [activeRegion, setActiveRegion] = useState("Asia");

  return (
    <div className="global-page-container">
      
      {/* 1. REGULATORY CONTENT SECTION */}
      <section className="regulatory-framework-section">
        <div className="global-hero-content">
          <h1>Global Regulatory & Quality Framework</h1>
          <p className="global-desc">
            <strong>ALYVRA Pharma Private Limited</strong> operates with a globally aligned regulatory and quality framework across 
            pharmaceutical formulations, nutraceutical products, dermatology solutions, and surgical equipment supplies. 
            Our product portfolio is presented through a unified <Link to="/products" className="content-link">Products section</Link>, 
            structured for clarity, regulatory transparency, and ease of access for global partners.
          </p>
        </div>

        <div className="framework-grid">
          <div className="framework-text">
            <p>
              India plays a significant role in the global pharmaceutical supply ecosystem, supported by established regulatory 
              systems, manufacturing capability, and export governance 
              (<a href="https://www.ibef.org/industry/pharmaceutical-india" target="_blank" rel="noopener noreferrer" className="external-link">Reference: IBEF Overview</a>).
            </p>
            <p>
              Our organizational structure is aligned with internationally accepted pharmaceutical manufacturing standards in 
              <Link to="/about" className="content-link"> India</Link>, supporting quality-driven operations, documentation accuracy, and 
              regulatory readiness for cross-border business engagement.
            </p>
            <p>
              The global pharmaceutical demand continues to expand across regulated healthcare markets, driven by 
              preventive medicine and nutrition-based interventions 
              (<a href="https://www.who.int/teams/health-product-policy-and-standards" target="_blank" rel="noopener noreferrer" className="external-link">Reference: WHO Medicines</a>).
            </p>
          </div>

          <div className="compliance-card">
            <h3>Regulatory & Export Compliance</h3>
            <p>
              ALYVRA Pharma follows Indian regulatory requirements applicable to pharmaceutical exports 
              (<Link to="/licenses" className="content-link">Licenses & Certificates</Link>), including:
            </p>
            <ul className="compliance-list">
              <li><strong>IEC:</strong> Importer Exporter Code issued by the <a href="https://www.dgft.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-link">DGFT</a>.</li>
              <li><strong>CDSCO:</strong> Governed by the <a href="https://cdsco.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-link">Central Drugs Standard Control Organization</a>.</li>
              <li><strong>GMP:</strong> Good Manufacturing Practices under Indian Drugs & Cosmetics Rules.</li>
              <li><strong>FSSAI:</strong> Nutraceutical compliance regulated by the <a href="https://www.fssai.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-link">FSSAI</a>.</li>
              <li><strong>Medical Device Rules:</strong> Compliance as per Indian Medical Device Rules.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. MAP SECTION */}
      <div className="map-section-wrapper">
        <div className="map-box">
          <img src="/global-presence.png" alt="Global Presence Map" className="main-map" />
        </div>

        {/* 3. REGIONS SECTION */}
        <div className="global-wrapper">
          <div className="region-tabs">
            {Object.keys(regions).map((region) => (
              <button
                key={region}
                className={activeRegion === region ? "active" : ""}
                onClick={() => setActiveRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="region-content">
            <p className="countries-list">
              <span className="region-label">{activeRegion}:</span> {regions[activeRegion]}
            </p>
          </div>
        </div>
      </div>

      {/* 4. FINAL CTA */}
      <div className="trusted-footer">
        <h3>Trusted Indian Pharmaceutical Company</h3>
        <p>
          Aligned with recognized international trade expectations 
          (<a href="https://www.trade.gov/pharmaceuticals-industry-expos" target="_blank" rel="noopener noreferrer" className="external-link">Reference: ITA Overview</a>).
        </p>
        <p>For detailed information <Link to="/contact" className="cta-link">Please Contact Us</Link>.</p>
      </div>

    </div>
  );
}