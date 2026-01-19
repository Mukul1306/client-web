import { useState } from "react";
import axios from "axios";
import "./admin.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    composition: "",
    strength: "",
    form: "",
    packaging: "",
    therapeuticUse: "",
    manufacturer: "", // Fixed: Field is here
    description: "",
    categories: [] 
  });

  const [categoryInput, setCategoryInput] = useState(""); 
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const API_BASE = "https://client-web-dwcu.onrender.com";

  const mainDivisions = [
    "Pharmaceutical", "Nutraceutical", "Cosmetic / Derma", "Surgical Equipment"
  ];

  const therapeuticClasses = [
    "Antibiotics", "Antidiabetic", "Anti-cold / Allergy / Steroids", 
    "Analgesics / NSAIDs", "Hormones", "Antifungal / Antiviral", 
    "Iron / Multivitamin / Orthopaedic", "PPI / Laxatives", 
    "Antihypertensive", "Appetiser", "OTC", "Antiemetic", 
    "Protein Powder", "Weight Management", "Antidepressant", "Critical Care"
  ];

  const allAvailableCategories = [...mainDivisions, ...therapeuticClasses];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addCategoryTag = (val) => {
    const value = typeof val === "string" ? val : categoryInput.trim();
    if (value && !form.categories.includes(value)) {
      setForm({ ...form, categories: [...form.categories, value] });
      setCategoryInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCategoryTag();
    }
  };

  const removeTag = (indexToRemove) => {
    setForm({ ...form, categories: form.categories.filter((_, i) => i !== indexToRemove) });
  };

  const submit = async () => {
    if (!form.name || !image) {
        return alert("Product name and image are mandatory!");
    }

    try {
      const data = new FormData();
      Object.keys(form).forEach(key => {
        if (key === "categories") {
          data.append(key, JSON.stringify(form[key]));
        } else {
          data.append(key, form[key]);
        }
      });
      data.append("image", image);

      await axios.post(`${API_BASE}/api/products/add`, data);
      
      alert("Product Added Successfully!");
      
      // Reset form properly
      setForm({
        name: "", composition: "", strength: "", form: "", 
        packaging: "", therapeuticUse: "", manufacturer: "",
        description: "", categories: []
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error adding product. Check console.");
    }
  };

  return (
    <div className="admin-form">
      <h2>Add New Medicine</h2>

      <div className="input-grid">
        <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Composition (Salt)" value={form.composition} onChange={e => setForm({...form, composition: e.target.value})} />
        <input placeholder="Strength (e.g. 500mg)" value={form.strength} onChange={e => setForm({...form, strength: e.target.value})} />
        <input placeholder="Form (Tablet/Syrup)" value={form.form} onChange={e => setForm({...form, form: e.target.value})} />
        <input placeholder="Packaging" value={form.packaging} onChange={e => setForm({...form, packaging: e.target.value})} />
        <input placeholder="Therapeutic Use" value={form.therapeuticUse} onChange={e => setForm({...form, therapeuticUse: e.target.value})} />
        <input placeholder="Manufacturer Name" value={form.manufacturer} onChange={e => setForm({...form, manufacturer: e.target.value})} />
      </div>

      <div className="category-manager">
        <label>Quick Add Main Division:</label>
        <div className="quick-select-btns">
          {mainDivisions.map(cat => (
            <button 
              key={cat} 
              type="button" 
              className={`mini-add-btn ${form.categories.includes(cat) ? "disabled" : ""}`}
              onClick={() => addCategoryTag(cat)}
              disabled={form.categories.includes(cat)}
            >
              + {cat}
            </button>
          ))}
        </div>

        <label style={{marginTop: '15px', display: 'block'}}>Assigned Categories:</label>
        <div className="tags-display">
          {form.categories.map((cat, i) => (
            <span key={i} className="tag">
              {cat} <span className="close-icon" onClick={() => removeTag(i)}>×</span>
            </span>
          ))}
        </div>
        
        <div className="tag-input-row">
          <input 
            list="cat-defaults"
            value={categoryInput} 
            onChange={e => setCategoryInput(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Search or type category..."
          />
          <datalist id="cat-defaults">
            {allAvailableCategories.map(c => <option key={c} value={c} />)}
          </datalist>
          <button type="button" className="add-tag-btn" onClick={() => addCategoryTag()}>Add</button>
        </div>
      </div>

      <textarea placeholder="Product Description (Rich details...)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      
      <div className="file-input-group">
        <label>Product Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="admin-img-preview" style={{width: '100px', marginTop: '10px', borderRadius: '8px'}} />}
      </div>
      
      <button className="save-btn" onClick={submit}>Save Product to Inventory</button>
    </div>
  );
}