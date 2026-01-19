import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CatalogAdmin() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Pharmaceutical");
  const [loading, setLoading] = useState(false);
  const [catalogs, setCatalogs] = useState([]);

  const API_BASE = "https://client-web-dwcu.onrender.com";

  const fetchCatalogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/catalogs/list`);
      setCatalogs(res.data);
    } catch (err) {
      console.error("Error fetching catalogs:", err);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");

    setLoading(true);
    const formData = new FormData();
// Append "type" FIRST so the backend has it before processing the file
formData.append("type", category); 
formData.append("catalogPdf", file)

    try {
      await axios.post(`${API_BASE}/api/catalogs/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Catalog updated successfully!");
      setFile(null); // Clear input
      fetchCatalogs(); 
    } catch (err) {
      alert("Upload failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this catalog?")) {
      try {
        await axios.delete(`${API_BASE}/api/catalogs/${id}`);
        alert("Catalog deleted successfully!");
        fetchCatalogs();
      } catch (err) {
        alert("Failed to delete catalog.");
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-form-container">
        <h2>Update Product Catalogs</h2>
        <form onSubmit={handleUpload}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Pharmaceutical">Pharmaceutical</option>
            <option value="Nutraceutical">Nutraceutical</option>
            {/* Added spaces to match your division filter list */}
            <option value="Cosmetic / Derma">Cosmetic / Derma</option>
            <option value="Surgical Equipment">Surgical Equipment</option>
          </select>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit" disabled={loading} className="upload-btn">
            {loading ? "Uploading..." : "UPLOAD PDF"}
          </button>
        </form>

        <div className="admin-list-section" style={{ marginTop: "40px" }}>
          <h3>Published Catalogs</h3>
          <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Catalog Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalogs.length > 0 ? (
                catalogs.map((cat) => (
                  <tr key={cat._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}><strong>{cat.type}</strong></td>
                    <td><span className="status-badge live">Live</span></td>
                    <td style={{ display: "flex", gap: "10px", padding: "10px" }}>
                      <a
                        href={`${API_BASE}/api/catalogs/download/${encodeURIComponent(cat.type)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="view-btn"
                        style={{ color: "blue", textDecoration: "none" }}
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="delete-btn-table"
                        style={{
                          background: "#ff4d4d",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                    No catalogs uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}