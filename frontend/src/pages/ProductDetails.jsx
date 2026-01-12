import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
   const navigate = useNavigate();
  // Reference list to separate "Divisions" from "Therapeutic Classes"
  const mainDivisionsList = [
    "PHARMACEUTICAL", 
    "NUTRACEUTICAL", 
    "COSMETIC / DERMA", 
    "SURGICAL EQUIPMENT"
  ];

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className="loading">Loading Product Details...</div>;

  const getCleanTags = () => {
    if (!product.categories) return [];
    
    let parsedTags = [];
    if (Array.isArray(product.categories)) {
      parsedTags = product.categories;
    } else {
      try {
        // Handle cases where tags might be stored as a JSON string
        parsedTags = JSON.parse(product.categories);
      } catch (e) {
        // Fallback for comma-separated strings
        parsedTags = product.categories.split(",").map(t => t.trim());
      }
    }
    // Removes residual brackets or quotes from legacy data
    return parsedTags.map(t => t.toString().replace(/[[\]"]/g, "").trim());
  };

  const allTags = getCleanTags();
  
  // Filter for Main Divisions (Case-Insensitive check)
  const divisions = allTags.filter(tag => 
    mainDivisionsList.some(div => div.trim().toUpperCase() === tag.trim().toUpperCase())
  );
  
  // Everything else is a Therapeutic Tag
  const therapeuticTags = allTags.filter(tag => 
    !mainDivisionsList.some(div => div.trim().toUpperCase() === tag.trim().toUpperCase())
  );

  return (
    <div className="product-details-container">
      <div className="product-main-info">
        <div className="image-section">
          <img 
            src={`http://localhost:5000/uploads/${product.image}`} 
            alt={product.name} 
            onError={(e) => { e.target.src = "/placeholder-medicine.png"; }} 
          />
        </div>

        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <table className="details-table">
            <tbody>
              <tr>
                <td><strong>DIVISION:</strong></td>
                <td className="division-text">
                  {/* Logic: Show divisions, or fallback to first tag, or "GENERAL" */}
                  {divisions.length > 0 
                    ? divisions.join(", ") 
                    : (allTags.length > 0 ? allTags[0] : "GENERAL")}
                </td>
              </tr>
              <tr>
                <td><strong>COMPOSITION:</strong></td>
                <td>{product.composition}</td>
              </tr>
              <tr>
                <td><strong>STRENGTH:</strong></td>
                <td>{product.strength || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>FORM:</strong></td>
                <td>{product.form}</td>
              </tr>
              <tr>
                <td><strong>PACKAGING:</strong></td>
                <td>{product.packaging}</td>
              </tr>
              {/* Added: Displays the Manufacturer from your updated model */}
              <tr>
                <td><strong>MANUFACTURER:</strong></td>
                <td>{product.manufacturer || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>THERAPEUTIC USE:</strong></td>
                <td>{product.therapeuticUse || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>THERAPEUTIC TAGS:</strong></td>
                <td>
                  <div className="tag-container">
                    {therapeuticTags.length > 0 ? therapeuticTags.map((tag, i) => (
                      <span key={i} className="detail-tag">{tag}</span>
                    )) : "N/A"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="description-box">
            <h3>DESCRIPTION</h3>
            {/* White-space: pre-wrap ensures paragraphs and enters show up */}
            <p style={{ whiteSpace: "pre-wrap" }}>
              {product.description || "No detailed description provided."}
            </p>
          </div>
           <button
        className="inquiry-btn"
        onClick={() =>
          navigate("/product-inquiry", {
           // Updated Line 131
state: { productName: product.name }
          })
        }
      >
        Inquiry Now
      </button>
        </div>
      </div>
    </div>
  );
}