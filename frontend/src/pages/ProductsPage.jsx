import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./productsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const navigate = useNavigate();

  const mainDivisions = [
    { name: "Pharmaceutical" },
    { name: "Nutraceutical" },
    { name: "Cosmetic / Derma" },
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
axios.get("https://client-web-dwcu.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const toggleCategory = (catName) => {
    if (catName === "All") {
      setSelectedCategories([]);
      return;
    }
    // Improved toggle logic for better state management
    const isSelected = selectedCategories.some(c => c.toLowerCase() === catName.toLowerCase());
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c.toLowerCase() !== catName.toLowerCase()));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  // --- OPTIMIZED FILTERING LOGIC ---
  const filteredProducts = products.filter((p) => {
    const search = searchTerm.toLowerCase().trim();

    // 1. Process Categories into a clean array (Safe Handling)
    let rawCats = [];
    try {
      rawCats = Array.isArray(p.categories) ? p.categories : JSON.parse(p.categories || "[]");
    } catch {
      rawCats = p.categories ? p.categories.split(",").map(c => c.trim()) : [];
    }
    
    // Safety: Ensure tags are strings and stripped of legacy bracket noise
    const cleanTags = rawCats.map(tag => 
      tag ? tag.toString().replace(/[[\]"]/g, "").trim().toLowerCase() : ""
    ).filter(t => t !== "");

    // 2. CREATE A GLOBAL SEARCH STRING (Includes null-safety)
    const globalString = [
      p.name || "",
      p.composition || "", // Salt
      p.strength || "",
      p.form || "",        // e.g., sryp
      p.packaging || "",
      p.therapeuticUse || "",
      ...cleanTags
    ].join(" ").toLowerCase();

    // 3. Match the search term
    const matchesSearch = search === "" || globalString.includes(search);

    // 4. Match Category Pills (Robust case-insensitive check)
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
              placeholder="Search by name, salt (lamon), form (sryp), etc..."
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
                <span className="cat-icon">{cat.icon}</span>
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
            // Re-cleaning tags for clean display on the cards
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
                <img 
  src={p.image} 
  alt={p.name} 
  onError={(e) => { 
    e.target.onerror = null; // Prevents infinite loop
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