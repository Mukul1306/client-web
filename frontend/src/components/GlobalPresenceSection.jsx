import { useState } from "react";
import "./layout.css";

const regions = {
  Asia: "India, Nepal, Bangladesh, Sri Lanka, Myanmar, Vietnam",
  Africa: "Nigeria, Kenya, South Africa, Egypt, Ghana",
  "North America": "USA, Canada, Mexico",
  "South America": "Brazil, Chile, Peru, Colombia",
  "Gulf Country": "UAE, Saudi Arabia, Kuwait, Qatar",
  CIS: "Russia, Kazakhstan, Uzbekistan",
  Oceania: "Papua New Guinea, Fiji, Solomon Island, Vanuatu, Tonga, Samoa"
};

export default function GlobalPresenceSection({ compact = false }) {
  const [activeRegion, setActiveRegion] = useState("Asia");

  return (
    <section className={`global-wrapper ${compact ? "compact" : ""}`}>
      <h2>{compact ? "Our Global Presence" : "Global Presence"}</h2>

      {!compact && (
        <p className="global-desc">
          We have expanded our footprint across continents, delivering
          high-quality pharmaceutical products worldwide with trust and care.
        </p>
      )}

      <div className="map-box">
        <img src="/global-presence.png" alt="Global Presence Map" />
      </div>

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
        <p>{regions[activeRegion]}</p>
      </div>
    </section>
  );
}
