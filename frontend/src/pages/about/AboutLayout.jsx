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
      
Twelve years ago, a group of three visionaries figured out a market gap in the pharmaceutical sector, and that is how  Alyvra Pharma Pvt. Ltd. was established. The company, under the guidance of the visionaries and promoters is serving the gap through world-class manufacturing, exporting, and supplying pharmaceutical products.    

Devoting to our vision and mission, we provide accomplished pharmaceutical products that we know are helping someone regain health. We feel proud and responsible for serving in the sector that is so closely associated with the most critical aspect of our lives: health.

We are an Indian company serving the world. Our products and services are approved, recognized, and famous internationally. We are slowly but surely creating our footprints in the global pharmaceutical sector.

We already have solid footprints in Asia Pacific, Latin America, the Middle East, Africa, and CIS countries and are expanding with manufacturing, exporting, and supplying services. We provide manufacturing and related services as well, so associating with Alyvra Pharma will be beneficial for companies as all services will be provided in one place. Alyvra Pharma Pharmaceutical has ultra-modern machines and supporting staff that are well-trained to create world-class products that are manufactured under strict national and international quality standards.

Our future vision is to become an MNC with multiple manufacturing units worldwide and create products that will help humankind become healthier.
  Alyvra Pharma is a trusted pharmaceutical company committed to delivering
        high-quality healthcare solutions with safety, innovation, and care.
      </p>
            </div>
          </section>
        )}

        {active === "mission" && (
          <section className="about-section fade">
            <p>
             <h2>Mission & Vision</h2>
  Our Mission & Vision
We were established and driven by a vision, and through our mission, a specific road map, we will materialize that vision.  

Mission:    
Analyzing and understanding market gaps and creating PMF Product market fit in each nation
Inviting and involving great minds with the company to improve the daily working process
Gather clients’ reviews and enhance the quality of our products and services
Collaborate with investors, experts, and market leaders
Vision:
Creating health awareness
Touching the maximum population by improving their health
Becoming a global pharmaceutical manufacturer, exporter, and supplier
Establishing manufacturing units in various countries</p>
          </section>
        )}

        {active === "values" && (
          <section className="about-section fade">
               
      <p>
           <h2>Business Values</h2>
      Our Business Values
At Alyvra Pharma Pvt. Ltd., our business values are the foundation of everything we do. They guide our actions, shape our culture, and define our commitment to excellence in the pharmaceutical industry. Our core values include:
       Business Value
Actiza Pharmaceutical Pvt. Ltd., like all other respected businesses, has created business values and follows them rigorously. We have weaved these values into the fundamentals of our core business idea.   

<h3>Quality Assurance</h3>
If you are dealing with Actiza Pharmaceutical, then it is inevitable that you will get quality assurance for both the products that we create and the services that we offer. We pour our sweat and blood to maintain quality standards because deep down in our hearts, we understand that we are dealing with someone’s health through our products and services. Secondly, our clients depend on us, and if they struggle to get their clients, it will create a negative impact on our business as well.

<h3>Innovation and Research</h3>
A pharmaceutical company establishes, runs, and grows to become a leader through innovation and research, relying on this fundamental truth, we, from our seeding year, have built a system where innovation and research are the foremost things we focus on. We have fabricated the idea of Alyvra Pharmaceutical Pvt. Ltd. around innovation and research. Considering our promoters had vast experience in this area, it was a natural process for us.  

<h3>Global Impact</h3>
Alyvra Pharmaceutical Pvt. Ltd. has been successful in creating a global impact through its products and services within a short period. Alyvra Pharmaceutical has formed a huge cliental in over a decade, especially in the global south. Alyvra   has become a brand for pharmaceutical manufacturing, exporting, and supplying pharmaceutical products and services. Through this, we are on the right path to achieving our vision to become a strong global leader in the pharmaceutical sector.

<h3>Ethical excellence</h3>
Any business that wants to create a unique place in its respective sector needs to practice ethics, and, through ethical excellence, only can build a company that has the capacity to bring change in the world. Our business ethics are intact, and we never compromise on whether we face profit or loss because we know all the plus and minuses are temporary, and what is permanent is the trust that ethical practice brings. Nothing can bit a company with ethical excellence.

<h3>Customer Centric approach</h3>
It is an ancient saying, “Customer is king,” but it is very relevant. We understand our kings and queens and, thus, our kingdom, which is the pharmaceutical sector, very well. Our clients have always been at the centre of all our goals, strategies, and actions, which is why we proudly describe ourselves as a customer-centric company. We have never taken a step back in taking customer feedback and improving ourselves based on that feedback. Hence, Actiza Pharmaceutical has successfully created a business model that works on a win-win formula.  
      </p>

          </section>
        )}

        {active === "management" && (
          <section className="about-section fade">
           
      <p>
         <h2>Our Management</h2>
         Management of a company that is a pharmaceutical manufacturer is crucial because the work is specific, scientifically technical, and precise. On any day, management of a pharmaceutical manufacturing company is critical as a tiny mistake can ruin weeks’ preparation of all the departments involved. And if one mistake goes overlooked, we risk a patient’s health.  

Alyvra Pharmaceutical Pvt. Ltd., we understand the delicacy of drugs and related products. Hence, our teams work hard to complete each task accurately and meticulously.  

<h3>Our Leaders’ are Our Guiding Force:</h3>
The promoters of Alyvra Pharmaceutical Pvt. Ltd. inspire the whole company and its each employee with their commitment, enthusiasm, and hard work. All three promoters have over a decade of experience in the healthcare sector, and they know in and out of this field. With the right expertise, vision, and leadership, they are proving themselves to be beacons when it comes to managing the company and its working.  

<h3>Different Departments are in Sync:</h3>
All the departments are specified with work according to the norms and their work. They all are in sync with each other to produce medicines and related products following the guidelines of WHO, GMP, and ISO. Each department has qualified experts leading their teams, and they collaborate with other departments to ensure that quality is maintained, no hurdles arise, and each batch is completed on time.

<h3>All Departments are Maintained:</h3>
According to the guidelines set by the government and health departments, each department has internal scrutiny every week, and necessary steps are being taken. The timely maintenance of all the machines is done with professional technicians, the workforce is trained regularly, and management holds surprise inspections to monitor the management of particular departments and the maintenance of decorum. </p>
          </section>
        )}
      </div>
    </div>
  );
}
