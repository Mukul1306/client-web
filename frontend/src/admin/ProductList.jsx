import { useEffect, useState } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import "./admin.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  // Update these with your real details
  const CLOUD_NAME = "your_cloud_name"; 
  const API_BASE = "https://client-web-dwcu.onrender.com";

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inventory");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --- SMART IMAGE HELPER ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "/placeholder-med.png";
    if (imageSource.startsWith("http")) return imageSource;
    if (imageSource.includes(".")) return `${API_BASE}/uploads/${imageSource}`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const ok = window.confirm("Delete this product permanently?");
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/api/products/delete/${id}`);
      toast.success("Product deleted");
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // SEARCH FILTER
  const filteredProducts = products.filter((p) =>
    `${p.name} ${p.composition} ${p.manufacturer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* FIXED NAVIGATION PLACEMENT */}
      <div className="admin-nav">
        <Link to="/admin" className="admin-nav-link active">Inventory</Link>
        <Link to="/admin/add" className="admin-nav-link">Add Product</Link>
        <Link to="/admin/catalogs" className="admin-nav-link">Catalogs</Link>
        <Link to="/admin/gallery" className="admin-nav-link">Gallery</Link>
        <Link to="/admin/blogs" className="admin-nav-link">Blogs</Link>
      </div>

      <div className="admin-form">
        <div className="admin-header">
          <h2>Product Inventory ({filteredProducts.length})</h2>
          <input
            type="text"
            placeholder="Search by name, salt, or manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search"
          />
        </div>

        {/* EDIT MODAL */}
        {editingProduct && (
          <div className="modal-overlay">
            <EditProduct
              product={editingProduct}
              onClose={() => setEditingProduct(null)}
              onUpdated={loadProducts}
            />
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="admin-grid">
          {filteredProducts.length === 0 && (
            <div className="no-results">
               <p>No products found matching your search.</p>
            </div>
          )}

          {filteredProducts.map((p) => (
            <div className="admin-card" key={p._id}>
              <div className="admin-img">
                <img
                  src={getImageUrl(p.image)}
                  alt={p.name}
                  onError={(e) => { e.target.src = "/placeholder-med.png"; }}
                />
              </div>

              <div className="admin-info">
                <h4>{p.name}</h4>
                <p className="composition">{p.composition}</p>
                <div className="admin-meta">
                   <span>{p.form}</span> • <span>{p.packaging}</span>
                </div>
                <small>Mfg: {p.manufacturer || "N/A"}</small>
              </div>

              <div className="admin-actions">
                <button
                  className="edit-btn"
                  onClick={() => setEditingProduct(p)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}