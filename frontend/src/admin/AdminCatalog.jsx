import React, { useState } from "react";
import axios from "axios";

export default function AdminCatalog() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Pharmaceutical");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("catalogPdf", file);
    formData.append("type", category);

    try {
      await axios.post("http://localhost:5000/api/catalogs/upload", formData);
      alert("Catalog Uploaded Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-form-container">
        <h2>Update PDF Catalogs</h2>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label>Catalog Type</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Pharmaceutical">Pharmaceutical</option>
              <option value="Nutraceutical">Nutraceutical</option>
              <option value="Cosmetic/Derma">Cosmetic/Derma</option>
              <option value="Surgical Equipment">Surgical Equipment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select PDF File</label>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={(e) => setFile(e.target.files[0])} 
            />
          </div>

          <button type="submit" className="btn-primary">Update Catalog</button>
        </form>
      </div>
    </div>
  );
}