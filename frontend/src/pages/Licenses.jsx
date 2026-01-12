import React from "react";
import "./licenses.css";

export default function Licenses() {
  const complianceLinks = [
    { name: "Global pharmaceutical trade compliance", link: "#" },
    { name: "Compliance with international pharmaceutical standards", link: "#" },
    { name: "Pharmaceutical trade licenses and certifications", link: "#" },
    { name: "Regulatory licensing in pharma", link: "#" },
    { name: "Dermatology product regulatory standards", link: "#" },
    { name: "Global healthcare compliance frameworks", link: "#" },
  ];

  return (
    <div className="licenses-page">
      {/* Hero Section */}
      <section className="licenses-hero">
        <div className="container">
          <h1>Licenses & Certificates</h1>
          <p>
            ALYVRA Pharma Private Limited operates under a structured and compliant regulatory 
            framework aligned with Indian pharmaceutical regulations and international trade standards.
          </p>
        </div>
      </section>

      <section className="licenses-content container">
        {/* Intro Card */}
        <div className="intro-card">
          <p>
            Our licensing and certification structure supports compliant participation in
            the global pharmaceutical, nutraceutical, dermatology, and surgical equipment supply
            ecosystem, ensuring regulatory transparency and operational integrity. Our approach 
            reflects adherence to established regulatory authorities governing pharmaceutical 
            exports from India.
          </p>
        </div>

        {/* Regulatory Grid */}
        <h2 className="section-title">Regulatory Licenses & Compliance Framework</h2>
        <div className="regulatory-grid">
          
          <div className="reg-card">
            <div className="reg-icon">IEC</div>
            <h3>Importer Exporter Code (IEC)</h3>
            <p>
              Issued by the <strong>Directorate General of Foreign Trade (DGFT)</strong>, 
              the IEC is a mandatory requirement for pharmaceutical export regulations. 
              This certification enables cross-border healthcare supply chains.
            </p>
            <a href="https://www.dgft.gov.in/" target="_blank" rel="noreferrer" className="reg-link">View Authority →</a>
          </div>

          <div className="reg-card">
            <div className="reg-icon">CDSCO</div>
            <h3>Pharmaceutical Regulatory Authorization</h3>
            <p>
              Compliance is maintained in accordance with the <strong>Central Drugs Standard Control Organization (CDSCO)</strong>. 
              This ensures conformity with nationally recognized drug control regulations.
            </p>
            <a href="https://cdsco.gov.in/" target="_blank" rel="noreferrer" className="reg-link">View Authority →</a>
          </div>

          <div className="reg-card">
            <div className="reg-icon">FSSAI</div>
            <h3>Nutraceutical Regulatory Compliance</h3>
            <p>
              Governed by the <strong>Food Safety and Standards Authority of India (FSSAI)</strong>. 
              Ensures nutraceutical quality compliance and adherence to global food safety regulations.
            </p>
            <a href="https://www.fssai.gov.in/" target="_blank" rel="noreferrer" className="reg-link">View Authority →</a>
          </div>

          <div className="reg-card">
            <div className="reg-icon">MDR</div>
            <h3>Medical Device & Surgical Compliance</h3>
            <p>
              Governed by the <strong>Medical Devices Rules, India</strong>. Supports surgical 
              equipment compliance and recognized pharmaceutical industry licensing norms.
            </p>
            <a href="https://cdsco.gov.in/opencms/opencms/en/Medical-Device-Diagnostics/Medical-Device-Diagnostics/" target="_blank" rel="noreferrer" className="reg-link">View Authority →</a>
          </div>
        </div>

        {/* Global Alignment List */}
        <div className="alignment-section">
          <h3>Regulatory Integrity & Global Alignment</h3>
          <ul className="alignment-list">
            {complianceLinks.map((item, index) => (
              <li key={index}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Commitment Footer */}
        <div className="commitment-box">
          <h3>Commitment to Compliance</h3>
          <p>
            Our licensing and certification framework reflects a consistent commitment to 
            responsible participation in the global healthcare ecosystem. Regulatory documentation 
            is maintained in accordance with applicable Indian laws and international expectations.
          </p>
        </div>
      </section>
    </div>
  );
}