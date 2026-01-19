import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./productsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const navigate = useNavigate();

  // REPLACE 'your_cloud_name' with your actual Cloudinary name
  const CLOUD_NAME = "your_cloud_name"; 
  const API_BASE = "https://client-web-dwcu.onrender.com";

  const mainDivisions = [
    { name: "Pharmaceutical" },
    { name: "Nutraceutical"},
    { name: "Cosmetic / Derma"},
    { name: "Surgical Equipment" }
  ];

  const therapeuticClasses = [
    "Antibiotics", "Antidiabetic", "Anti-cold / Allergy / Steroids", 
    "Analgesics / NSAIDs", "Hormones", "Antifungal / Antiviral", 
    "Iron / Multivitamin / Orthopaedic", "PPI / Laxatives", 
    "Antihypertensive", "Appetiser", "OTC", "Antiemetic", 
    "Protein Powder", "Weight Management", "Antidepressant", "Critical Care"
  ];

  useEffect(() => {
    axios.get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // --- SMART IMAGE HELPER ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "/placeholder-medicine.png";
    if (imageSource.startsWith("http")) return imageSource;
    if (imageSource.includes(".")) return `${API_BASE}/uploads/${imageSource}`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  const toggleCategory = (catName) => {
    if (catName === "All") {
      setSelectedCategories([]);
      return;
    }
    const isSelected = selectedCategories.some(c => c.toLowerCase() === catName.toLowerCase());
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c.toLowerCase() !== catName.toLowerCase()));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  const filteredProducts = products.filter((p) => {
    const search = searchTerm.toLowerCase().trim();
    let rawCats = [];
    try {
      rawCats = Array.isArray(p.categories) ? p.categories : JSON.parse(p.categories || "[]");
    } catch {
      rawCats = p.categories ? p.categories.split(",").map(c => c.trim()) : [];
    }
    
    const cleanTags = rawCats.map(tag => 
      tag ? tag.toString().replace(/[[\]"]/g, "").trim().toLowerCase() : ""
    ).filter(t => t !== "");

    const globalString = [
      p.name || "",
      p.composition || "",
      p.strength || "",
      p.form || "",
      p.packaging || "",
      p.therapeuticUse || "",
      ...cleanTags
    ].join(" ").toLowerCase();

    const matchesSearch = search === "" || globalString.includes(search);
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.some(sel => 
        cleanTags.includes(sel.toLowerCase().trim())
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="full-products-page">
      <div className="products-hero-section">
        <div className="search-wrapper">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name, salt, form, etc..."
              className="modern-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")} className="clear-search">×</button>}
          </div>
        </div>

        <div className="filter-group">
          <div className="category-grid">
            <div 
              className={`category-pill ${selectedCategories.length === 0 ? "active" : ""}`} 
              onClick={() => toggleCategory("All")}
            >
              All Products
            </div>
            {mainDivisions.map((cat) => (
              <div 
                key={cat.name}
                className={`category-pill ${selectedCategories.some(sel => sel.toLowerCase() === cat.name.toLowerCase()) ? "active" : ""}`} 
                onClick={() => toggleCategory(cat.name)}
              >
                <span className="cat-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-group second-group">
          <div className="category-grid-mini">
            {therapeuticClasses.map((name) => (
              <div 
                key={name}
                className={`mini-pill ${selectedCategories.some(sel => sel.toLowerCase() === name.toLowerCase()) ? "active" : ""}`} 
                onClick={() => toggleCategory(name)}
              >
                {name} {selectedCategories.some(sel => sel.toLowerCase() === name.toLowerCase()) && "✓"}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-title">
        <div className="title-flex">
          <h2>Our Medical Range</h2>
          <span className="count-badge">{filteredProducts.length} Items Found</span>
        </div>
      </div>

      <div className="products-grid-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => {
            let displayTags = [];
            try {
              const parsed = Array.isArray(p.categories) ? p.categories : JSON.parse(p.categories || "[]");
              displayTags = parsed.map(t => t.toString().replace(/[[\]"]/g, "").trim());
            } catch {
              displayTags = p.categories ? p.categories.split(",").map(t => t.replace(/[[\]"]/g, "").trim()) : [];
            }

            return (
              <div key={p._id} className="featured-card">
                <div className="card-click-area" onClick={() => navigate(`/product/${p._id}`)}>
                  <div className="card-image-box">
                    {/* FIXED: Using getImageUrl helper */}
                    <img 
                      src={getImageUrl(p.image)} 
                      alt={p.name} 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = "/placeholder-medicine.png"; 
                      }}
                    />
                  </div>
                  <div className="product-details">
                    <div className="category-tags">
                      {displayTags.slice(0, 2).map((name, i) => (
                        <span key={i} className="tag-label">{name}</span>
                      ))}
                    </div>
                    <h4>{p.name}</h4>
                    <p className="composition-text"><strong>Salt:</strong> {p.composition}</p>
                    <div className="card-meta">
                      <span>{p.form}</span> <span className="divider">|</span> <span>{p.strength}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="inquiry-btn" onClick={() => navigate("/product-inquiry", { state: { productName: p.name } })}>
                    Inquiry Now
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results-box">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
            <button onClick={() => {setSearchTerm(""); setSelectedCategories([]);}} className="reset-btn">Clear All</button>
          </div>
        )}
      </div>
    </div>
  );
}