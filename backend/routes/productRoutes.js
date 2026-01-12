const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Newest first
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD PRODUCT
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const productData = { ...req.body };

    // Ensure categories is saved as a clean Array
    if (req.body.categories) {
      try {
        productData.categories = JSON.parse(req.body.categories);
      } catch (e) {
        // Fallback: If it's a simple string like "Pharma", convert to ["Pharma"]
        productData.categories = req.body.categories.split(",").map(cat => cat.trim());
      }
    }

    const product = new Product({
      ...productData,
      image: req.file ? req.file.filename : ""
    });

    await product.save();
    res.json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Backend Update Route (PUT /api/products/update/:id)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Safely parse Therapeutic Tags
    if (req.body.categories) {
      try {
        updateData.categories = typeof req.body.categories === "string" 
          ? JSON.parse(req.body.categories) 
          : req.body.categories;
      } catch (e) {
        updateData.categories = req.body.categories.split(",");
      }
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      { $set: updateData }, 
      { new: true }
    );
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update database entry" });
  }
});

// DELETE PRODUCT
router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const imagePath = path.join(__dirname, "..", "uploads", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;