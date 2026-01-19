import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // REPLACE 'your_cloud_name' with your actual Cloudinary name
  const CLOUD_NAME = "your_cloud_name"; 
  const API_BASE = "https://client-web-dwcu.onrender.com";

  const mainDivisionsList = [
    "PHARMACEUTICAL", 
    "NUTRACEUTICAL", 
    "COSMETIC / DERMA", 
    "SURGICAL EQUIPMENT"
  ];

  useEffect(() => {
    axios.get(`${API_BASE}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className="loading">Loading Product Details...</div>;

  // --- SMART IMAGE LOGIC ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "/placeholder-medicine.png";
    
    // 1. If it's a full URL (already includes http)
    if (imageSource.startsWith("http")) return imageSource;

    // 2. If it's an old local file (contains a dot like .jpg or .png)
    if (imageSource.includes(".")) {
      return `${API_BASE}/uploads/${imageSource}`;
    }

    // 3. If it's a Cloudinary Public ID (random string without a dot)
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  const getCleanTags = () => {
    if (!product.categories) return [];
    let parsedTags = [];
    if (Array.isArray(product.categories)) {
      parsedTags = product.categories;
    } else {
      try {
        parsedTags = JSON.parse(product.categories);
      } catch (e) {
        parsedTags = product.categories.split(",").map(t => t.trim());
      }
    }
    return parsedTags.map(t => t.toString().replace(/[[\]"]/g, "").trim());
  };

  const allTags = getCleanTags();
  const divisions = allTags.filter(tag => 
    mainDivisionsList.some(div => div.trim().toUpperCase() === tag.trim().toUpperCase())
  );
  const therapeuticTags = allTags.filter(tag => 
    !mainDivisionsList.some(div => div.trim().toUpperCase() === tag.trim().toUpperCase())
  );

  return (
    <div className="product-details-container">
      <div className="product-main-info">
        <div className="image-section">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name} 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = "/placeholder-medicine.png"; 
            }} 
          />
        </div>

        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <table className="details-table">
            <tbody>
              <tr>
                <td><strong>DIVISION:</strong></td>
                <td className="division-text">
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
            <p style={{ whiteSpace: "pre-wrap" }}>
              {product.description || "No detailed description provided."}
            </p>
          </div>

          <button
            className="inquiry-btn"
            onClick={() =>
              navigate("/product-inquiry", {
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