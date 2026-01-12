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

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const ok = window.confirm("Delete this product permanently?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
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
// ADMIN NAVIGATION
<div className="admin-nav">
  <Link to="/admin" className="admin-nav-link">Products</Link>
  <Link to="/admin/add" className="admin-nav-link">Add Product</Link>
  <Link to="/admin/gallery" className="admin-nav-link">Gallery</Link>
  <Link to="/admin/blogs" className="admin-nav-link">Blogs</Link>
</div>

  return (
    <div className="admin-form">
      <div className="admin-header">
        <h2>Product List</h2>

        
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="admin-search"
      />

      {/* EDIT MODAL */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={loadProducts}
        />
      )}

      {/* PRODUCTS */}
      <div className="admin-grid">
        {filteredProducts.length === 0 && (
          <p style={{ color: "#777" }}>No products found</p>
        )}

        {filteredProducts.map((p) => (
          <div className="admin-card" key={p._id}>
            {/* IMAGE */}
            <div className="admin-img">
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                />
              )}
            </div>

            {/* INFO */}
            <div className="admin-info">
              <h4>{p.name}</h4>
              <p className="composition">{p.composition}</p>
              <small>By {p.manufacturer}</small>
            </div>

            {/* ACTIONS */}
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
  );
}
