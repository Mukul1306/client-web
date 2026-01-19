import { useState } from "react";
import axios from "axios";
import "./admin.css";

export default function EditProduct({ product, onClose, onUpdated }) {
  const [form, setForm] = useState({
    name: product.name || "",
    composition: product.composition || "",
    strength: product.strength || "",
    form: product.form || "",
    packaging: product.packaging || "",
    therapeuticUse: product.therapeuticUse || "",
    manufacturer: product.manufacturer || "",
    description: product.description || "",
    categories: product.categories || [] // Changed to 'categories' array to match your system
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const API_BASE = "https://client-web-dwcu.onrender.com";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const update = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach(key => {
        if (key === "categories") {
          // Send as JSON string to handle the array properly on the backend
          data.append(key, JSON.stringify(form[key]));
        } else {
          data.append(key, form[key]);
        }
      });

      if (image) data.append("image", image);

      await axios.put(`${API_BASE}/api/products/update/${product._id}`, data);

      alert("Product Updated Successfully");
      onUpdated();   // Refresh the main product list
      onClose();     // Close the modal/form
    } catch (err) {
      console.error(err);
      alert("Update failed. Check your connection.");
    }
  };

  return (
    <div className="admin-edit-modal">
      <div className="admin-form">
        <h3>Edit Product: {product.name}</h3>

        <div className="input-grid">
          <input
            placeholder="Brand Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Composition (Salt)"
            value={form.composition}
            onChange={e => setForm({ ...form, composition: e.target.value })}
          />

          <input
            placeholder="Strength (100mg, 250mg)"
            value={form.strength}
            onChange={e => setForm({ ...form, strength: e.target.value })}
          />

          <input
            placeholder="Dosage Form (Tablet / Syrup)"
            value={form.form}
            onChange={e => setForm({ ...form, form: e.target.value })}
          />

          <input
            placeholder="Packaging"
            value={form.packaging}
            onChange={e => setForm({ ...form, packaging: e.target.value })}
          />

          <input
            placeholder="Therapeutic Use"
            value={form.therapeuticUse}
            onChange={e => setForm({ ...form, therapeuticUse: e.target.value })}
          />
        </div>

        <label style={{marginTop: "10px", display: "block"}}>Main Division:</label>
        <select
          className="admin-input"
          value={form.categories[0] || ""}
          onChange={e => setForm({ ...form, categories: [e.target.value, ...form.categories.slice(1)] })}
        >
          <option value="">Select Main Division</option>
          <option value="Pharmaceutical">Pharmaceutical</option>
          <option value="Nutraceutical">Nutraceutical</option>
          <option value="Cosmetic / Derma">Cosmetic / Derma</option>
          <option value="Surgical Equipment">Surgical Equipment</option>
        </select>

        <textarea
          placeholder="Detailed Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <div className="file-input-group">
          <label>Replace Product Image (Optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="preview-container">
              <p>New Preview:</p>
              <img src={preview} alt="New Preview" style={{ width: "80px", borderRadius: "5px" }} />
            </div>
          )}
        </div>

        <div className="edit-actions">
          <button className="save-btn" onClick={update}>Save Changes</button>
          <button className="cancel-btn" onClick={onClose}>Discard</button>
        </div>
      </div>
    </div>
  );
}