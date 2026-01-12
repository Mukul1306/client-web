const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g., Zithrocor
  composition: { type: String, required: true },    // e.g., Azithromycin (Salt)
  strength: { type: String },                       // e.g., 500mg
  form: { type: String },                           // e.g., Tablet / Syrup
  packaging: { type: String },                      // e.g., 10x3 Tablets
  therapeuticUse: { type: String },                 // e.g., Antibiotic
  manufacturer: { type: String }, 
  description: { type: String }, 
  
  // FIX: Changed to Array to store both Division (Pharma) and Class (Antibiotic)
  categories: { type: [String], default: [] }, 
  
  image: { type: String },
  type: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now } // Added for better sorting
});

module.exports = mongoose.model("Product", ProductSchema);