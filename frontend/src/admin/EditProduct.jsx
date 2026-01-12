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
    category: product.category || ""
  });

  const [image, setImage] = useState(null);

  const update = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach(key => {
        data.append(key, form[key]);
      });

      if (image) data.append("image", image);

      await axios.put(
        `http://localhost:5000/api/products/update/${product._id}`,
        data
      );

      alert("Product Updated Successfully");
      onUpdated();   // refresh list
      onClose();     // close edit form

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="admin-form">
      <h3>Edit Product</h3>

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
       <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Pharmaceutical">Pharmaceutical</option>
        <option value="Nutraceutical">Nutraceutical</option>
        <option value="Cosmetic / Derma">Cosmetic / Derma</option>
        <option value="Surgical Equipment">Surgical Equipment</option>
      </select>

      <input
        placeholder="Therapeutic Use"
        value={form.therapeuticUse}
        onChange={e => setForm({ ...form, therapeuticUse: e.target.value })}
      />


      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Category (Tablet / Syrup / Injection / Equipment)"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />

      <div className="edit-actions">
        <button className="edit-btn" onClick={update}>Update</button>
        <button className="delete-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
