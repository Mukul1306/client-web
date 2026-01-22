import { useState } from "react";
import "./about.css";

export default function AboutLayout() {
  const [active, setActive] = useState("overview");

  return (

    

    <div className="about-wrapper">
      {/* ===== PAGE HEADER ===== */}
      <div className="about-header">

        <h1>About Us</h1>
       
      </div>

      {/* ===== NAV TABS ===== */}
      <div className="about-tabs">
        <button
          className={active === "overview" ? "active" : ""}
          onClick={() => setActive("overview")}
        >
          Company Overview
        </button>
        <button
          className={active === "mission" ? "active" : ""}
          onClick={() => setActive("mission")}
        >
          Mission & Vision
        </button>
        <button
          className={active === "values" ? "active" : ""}
          onClick={() => setActive("values")}
        >
          Business Values
        </button>
        <button
          className={active === "management" ? "active" : ""}
          onClick={() => setActive("management")}
        >
          Management
        </button>
      </div>

      {/* ===== CONTENT CARD ===== */}
      <div className="about-content-card">
        {active === "overview" && (
          <section className="about-section fade">
          
            <div>
              <h2>Company Overview</h2>
      <h3> Alyvra Pharma Pvt. Ltd.</h3>
      <p>
  Is a healthcare-focused organization committed to delivering dependable, high-quality medical and wellness solutions across a wide range of healthcare segments. The company operates with a strong emphasis on quality assurance, regulatory alignment, and professional integrity, ensuring that all activities are conducted in accordance with established healthcare standards. By maintaining a disciplined and structured approach, Alyvra Pharma supports effective patient care while meeting the expectations of healthcare professionals and institutions within an increasingly complex and regulated healthcare environment.

The company’s diversified portfolio includes pharmaceutical medicines, nutraceutical products, dermatology-focused solutions, and surgical equipment, enabling Alyvra Pharma to address varied therapeutic and healthcare requirements. Each product category is carefully selected and managed with detailed attention to safety, consistency, and compliance with applicable regulatory guidelines. Alyvra Pharma aligns its offerings with globally recognized medical and wellness practices, ensuring reliability, quality, and confidence across all segments.

Alyvra Pharma operates with a comprehensive understanding of the healthcare supply and distribution landscape. Through structured coordination within established supply networks, the company supports the availability and continuity of essential healthcare solutions. Its operational approach is guided by scientific knowledge, nutritional and medical insights, and continuous assessment of healthcare trends, allowing the organization to respond responsibly to evolving industry needs.

The company places significant emphasis on building and maintaining long-term professional relationships within the healthcare ecosystem. By fostering transparency, accountability, and collaborative engagement, Alyvra Pharma works closely with healthcare professionals, institutions, and partners to support consistent standards of care and wellness. This relationship-focused approach strengthens trust and reinforces the company’s professional standing within the healthcare community.

By remaining aligned with global healthcare developments, quality benchmarks, and evolving regulatory expectations, Alyvra Pharma continues to strengthen its presence as a dependable and responsible participant in the healthcare sector. The company remains focused on sustainable growth, operational excellence, and long-term value creation, positioning itself as a trusted healthcare partner committed to maintaining high standards and industry credibility.
      </p>
            </div>
          </section>
        )}

        {active === "mission" && (
          <section className="about-section fade">
            <p>
             <h2>Mission & Vision</h2>
              Our Mission  <br />

At Alyvra Pharma, our mission is to make a meaningful impact on the healthcare and wellness ecosystem by ensuring access to reliable, high-quality solutions across pharmaceutical medicines, nutraceutical products, dermatological treatments, and surgical equipment. We are committed to upholding the highest standards of quality, safety, and regulatory compliance, ensuring that every product and solution we associate with meets internationally recognized healthcare and wellness benchmarks. Our focus extends beyond products; it encompasses the delivery of dependable solutions that empower healthcare professionals and institutions to provide effective, evidence-based care.  

We strive to bridge the gap between scientific advancement and practical healthcare solutions. By continuously monitoring emerging medical research, global wellness trends, and evolving clinical requirements, Alyvra Pharma ensures that its offerings are relevant, reliable, and aligned with modern medical and wellness practices. Every decision we make is guided by integrity, accountability, and a patient-centered mindset, reflecting our commitment to fostering better health outcomes and contributing responsibly to the healthcare ecosystem.  <br />

Our Vision <br />

Alyvra Pharma envisions becoming a leading, trusted, and forward-thinking partner within the healthcare and wellness sector. Our vision is to be recognized for consistently delivering solutions that are reliable, safe, and of the highest professional standards across pharmaceutical, nutraceutical, dermatological, and surgical domains. We aim to build a lasting reputation for credibility, operational excellence, and innovation, supporting healthcare professionals and institutions in meeting both current and future medical challenges.  

We aspire to create long-term value for the healthcare community by embracing scientific innovation, technological advancement, and global best practices. By fostering strong professional relationships, promoting transparency, and staying attuned to industry trends, Alyvra Pharma seeks to remain agile and responsive in a rapidly evolving healthcare landscape. Our vision is grounded in sustainable growth, ethical leadership, and a commitment to improving healthcare and wellness outcomes for communities around the world, establishing Alyvra Pharma as a reliable and respected name in the global healthcare sector.</p>
          </section>
        )}

        {active === "values" && (
          <section className="about-section fade">
               
      <p>
           <h2>Business Values</h2>
     
 Business Values

At Alyvra Pharma, our business values are the foundation upon which every strategy, decision, and operation is built. These principles are deeply embedded in the company’s culture and guide our interactions with healthcare professionals, partners, and stakeholders. By consistently adhering to these values, Alyvra Pharma ensures that it operates with integrity, accountability, and professionalism, creating a strong framework for sustainable growth and long-term credibility within the healthcare sector. Our values not only shape our internal processes but also define how we are perceived by the communities and institutions we serve.

Commitment to Quality and Compliance  
Alyvra Pharma places the highest priority on quality and compliance in every aspect of its operations. This commitment is reflected in rigorous internal processes, continual monitoring, and adherence to globally recognized regulatory frameworks. The company ensures that every solution it facilitates meets stringent safety, efficacy, and reliability standards. Beyond regulatory requirements, Alyvra Pharma emphasizes best practices that reinforce operational excellence, creating a consistent standard of reliability that healthcare professionals and institutions can depend on. By focusing on quality and compliance, the company strengthens trust and ensures that its contributions to the healthcare ecosystem are meaningful and dependable.

Integrity and Ethical Practices  
Integrity and ethics are central to how Alyvra Pharma conducts its business. The company prioritizes transparent communication, honest interactions, and accountability across all operations. Every decision is evaluated not only for its business impact but also for its alignment with ethical standards, ensuring that trust is maintained with all stakeholders. Alyvra Pharma’s emphasis on integrity fosters a culture where responsible decision-making is the norm, reinforcing the company’s credibility in the healthcare sector. Ethical practices guide not only daily operations but also long-term strategies, ensuring that the organization remains a dependable and respected partner.

Patient and Professional Focus  
Alyvra Pharma places the needs of healthcare professionals and the communities they serve at the center of its business approach. Every strategy, initiative, and operational process is designed to support effective healthcare delivery and improved patient outcomes. By understanding real-world challenges faced by professionals and aligning practices with the highest standards of care, Alyvra Pharma ensures that its contributions have a tangible, positive impact. This patient- and professional-focused mindset drives innovation, enhances service quality, and strengthens the company’s role as a trusted participant in the healthcare ecosystem.

Collaborative Partnerships  
Collaboration is a key pillar of Alyvra Pharma’s business philosophy. The company actively fosters long-term relationships with healthcare professionals, institutions, and industry partners, recognizing that collective expertise and shared objectives drive meaningful outcomes. These partnerships are built on mutual trust, transparency, and commitment to quality, creating an environment where all parties can benefit and grow. By prioritizing collaboration, Alyvra Pharma strengthens its professional network, ensures the consistent delivery of solutions, and positions itself as a reliable partner capable of responding to the evolving needs of the healthcare sector.

Adaptability and Responsiveness  
In an industry that is constantly changing due to scientific advancement, regulatory updates, and evolving healthcare demands, adaptability is crucial. Alyvra Pharma embraces change proactively, continuously monitoring trends and adjusting strategies to maintain relevance and operational effectiveness. This approach enables the company to respond quickly and responsibly to emerging challenges, ensuring resilience while maintaining consistency in service and quality. By combining foresight with operational flexibility, Alyvra Pharma remains agile, prepared, and capable of sustaining long-term success in a dynamic healthcare environment.

Accountability and Sustainability  
Alyvra Pharma emphasizes accountability and sustainability as essential components of its operations. Through structured governance, continuous evaluation of practices, and a commitment to responsible growth, the company ensures that its impact on the healthcare ecosystem is positive, enduring, and ethically sound. Every initiative is assessed for its long-term implications, ensuring that decisions contribute to lasting value for stakeholders, partners, and communities. This dedication to accountability and sustainable practices reinforces Alyvra Pharma’s reputation as a dependable and conscientious partner in the healthcare sector, committed to creating meaningful and enduring outcomes.

Through these comprehensive business values, Alyvra Pharma continues to establish itself as a professional, reliable, and trusted participant in the healthcare industry, dedicated to excellence, ethical practices, and sustainable, long-term growth.      </p>

          </section>
        )}

        {active === "management" && (
          <section className="about-section fade">
           
      <p>
         <h2>Our Management</h2>
        

The management team at Alyvra Pharma is the driving force behind the company’s strategic direction, operational excellence, and long-term sustainability. Comprised of experienced professionals with deep insights into the healthcare ecosystem, the leadership team brings a blend of strategic foresight, operational expertise, and ethical governance. Their approach ensures that the organization operates with discipline, accountability, and a strong focus on delivering value to stakeholders while maintaining credibility and trust across the healthcare sector.

Alyvra Pharma’s management emphasizes structured and transparent decision-making. Every initiative, project, and operational activity is carefully assessed through comprehensive analysis, risk evaluation, and alignment with best practices. This disciplined approach allows the organization to maintain consistency, mitigate risks, and uphold high standards in an ever-evolving and highly regulated industry. The leadership team’s ability to anticipate challenges and proactively plan for contingencies ensures stability, reliability, and operational resilience across all levels of the company.

Operational excellence is a key focus area for the management team. Through clearly defined processes, continuous monitoring, and rigorous performance evaluation, management ensures that organizational objectives are achieved efficiently and effectively. This approach fosters a culture of accountability, collaboration, and high performance, enabling seamless coordination between teams, stakeholders, and external partners. By emphasizing operational rigor, the management ensures that Alyvra Pharma maintains its reputation for reliability and professionalism.

The management also places significant emphasis on ethical leadership and governance. Transparent communication, integrity in decision-making, and responsible oversight are fundamental principles that guide the company’s operations. These practices not only strengthen stakeholder confidence but also establish a strong foundation for long-term credibility, fostering trust with partners, institutions, and professionals across the industry.

Adaptability and forward-thinking are integral to the management philosophy at Alyvra Pharma. The team actively monitors emerging trends, regulatory developments, and shifts in the healthcare landscape, enabling timely and informed strategic responses. By combining insight with operational agility, the management ensures that the company remains relevant, resilient, and capable of addressing future challenges effectively.

Through a combination of experience, ethical governance, strategic planning, and operational discipline, the management team at Alyvra Pharma continues to guide the organization toward sustainable growth, operational excellence, and enduring trust within the healthcare ecosystem. Their leadership reflects a commitment to professionalism, responsibility, and long-term value creation for all stakeholders. </p>
          </section>
        )}
      </div>
    </div>
  );
}
