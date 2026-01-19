import "./about.css";

export default function CompanyOverview() {
  return (
    <div className="company-overview-container">
      <h2>Company Overview</h2>
      <h3>Reliable Healthcare Solutions for a Global Market</h3>
      
      <p className="intro-text">
        <strong>Alyvra Pharma Private Limited</strong> is a healthcare-focused organization 
        committed to delivering dependable, high-quality medical and wellness solutions. 
        We operate with a strong emphasis on quality assurance, regulatory alignment, 
        and professional integrity, ensuring that all activities are conducted in 
        accordance with established global healthcare standards.
      </p>

      <div className="overview-content">
        <section className="overview-block">
          <h4>Diversified Portfolio</h4>
          <p>
            Our portfolio includes pharmaceutical medicines, nutraceutical products, 
            dermatology-focused solutions, and surgical equipment. Each category is 
            managed with detailed attention to safety, consistency, and compliance with 
            applicable regulatory guidelines.
          </p>
        </section>

        <section className="overview-block">
          <h4>Operational Excellence</h4>
          <p>
            Alyvra Pharma supports the availability and continuity of essential 
            healthcare solutions through structured coordination within established 
            supply networks. Our approach is guided by scientific knowledge and a 
            continuous assessment of evolving industry needs.
          </p>
        </section>

        <section className="overview-block">
          <h4>Professional Partnerships</h4>
          <p>
            By fostering transparency and accountability, we work closely with 
            healthcare professionals and institutions. This relationship-focused 
            approach strengthens trust and reinforces our standing as a dependable 
            participant in the healthcare sector.
          </p>
        </section>

        <section className="overview-block">
          <h4>Future-Focused Growth</h4>
          <p>
            We remain aligned with global quality benchmarks and regulatory 
            expectations. Alyvra Pharma is focused on sustainable growth and 
            long-term value creation, positioning itself as a trusted healthcare 
            partner committed to industry credibility.
          </p>
        </section>
      </div>
    </div>
  );
}