import React, { useState } from "react";
import axios from "axios";
import "./admin.css"; // Assuming your admin styles are here

export default function AdminCatalog() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Pharmaceutical");
  const [uploading, setUploading] = useState(false);

  const API_BASE = "https://client-web-dwcu.onrender.com";

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file first.");

    setUploading(true);
    const formData = new FormData();
    formData.append("catalogPdf", file);
    formData.append("type", category);

    try {
      // Endpoint matches your backend route structure
      await axios.post(`${API_BASE}/api/catalogs/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Success: ${category} catalog has been updated!`);
      setFile(null); // Clear file after success
      
      // Reset the file input element manually if needed
      e.target.reset(); 
      
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload catalog. Check if the server is awake.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-form-container">
        <h2>Update PDF Catalogs</h2>
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
          Uploading a new PDF will automatically replace the existing one for that category.
        </p>

        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label>Catalog Category</label>
            <select 
              className="admin-input"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Pharmaceutical">Pharmaceutical</option>
              <option value="Nutraceutical">Nutraceutical</option>
              {/* IMPORTANT: Value matches the frontend download logic exactly */}
              <option value="Cosmetic / Derma">Cosmetic / Derma</option>
              <option value="Surgical Equipment">Surgical Equipment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select PDF File</label>
            <input 
              className="file-chooser"
              type="file" 
              accept="application/pdf" 
              onChange={(e) => setFile(e.target.files[0])} 
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Update Catalog"}
          </button>
        </form>
      </div>
    </div>
  );
}