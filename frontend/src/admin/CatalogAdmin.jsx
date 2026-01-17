import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CatalogAdmin() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Pharmaceutical");
  const [loading, setLoading] = useState(false);
  const [catalogs, setCatalogs] = useState([]); // State to hold real data from DB

  // 1. Function to fetch the list of catalogs from backend
  const fetchCatalogs = async () => {
    try {
    // Fetches the catalog list from your live Render server
const res = await axios.get("https://client-web-dwcu.onrender.com/api/catalogs/list");

      setCatalogs(res.data);
    } catch (err) {
      console.error("Error fetching catalogs:", err);
    }
  };

  // 2. Fetch catalogs when the page loads
  useEffect(() => {
    fetchCatalogs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");

    setLoading(true);
    const formData = new FormData();
    formData.append("catalogPdf", file);
   formData.append("type", category.replace("/", "_"));


    try {
      await axios.post("https://client-web-dwcu.onrender.com/api/catalogs/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
      alert("Catalog updated successfully!");
      fetchCatalogs(); // Refresh the list after upload
    } catch (err) {
      alert("Upload failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Function to handle Deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this catalog? This will remove the file from the server.")) {
      try {
      // This sends the delete request to your live Render server
await axios.delete(`https://client-web-dwcu.onrender.com/api/catalogs/${id}`);
        alert("Catalog deleted successfully!");
        fetchCatalogs(); // Refresh the list after deletion
      } catch (err) {
        console.error("Delete error:", err);
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
            <option value="Cosmetic/Derma">Cosmetic/Derma</option>
            <option value="Surgical Equipment">Surgical Equipment</option>
          </select>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "UPLOAD PDF"}
          </button>
        </form>

        <div className="admin-list-section" style={{ marginTop: "40px" }}>
          <h3>Published Catalogs</h3>
          <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={{ padding: "10px" }}>Catalog Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalogs.length > 0 ? (
                catalogs.map((cat) => (
                  <tr key={cat._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}><strong>{cat.type}</strong></td>
                    <td><span className="status-badge">Live</span></td>
                    <td style={{ display: "flex", gap: "10px", padding: "10px" }}>
                    <a
 href={`https://client-web-dwcu.onrender.com/api/catalogs/download/${encodeURIComponent(cat.type)}`}
  className="view-btn"
  style={{ color: "blue", textDecoration: "none" }}
>
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(cat._id)}
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