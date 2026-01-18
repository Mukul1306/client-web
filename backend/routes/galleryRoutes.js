const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const upload = require("../middleware/upload"); // This is now your Cloudinary middleware
const fs = require("fs");
const path = require("path");

/* =========================
   GET ALL IMAGES
========================= */
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ _id: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ADD IMAGE (UPLOAD TO CLOUDINARY)
========================= */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newImage = new Gallery({
      // FIXED: Save the full permanent URL (req.file.path) instead of just the filename
      image: req.file.path 
    });

    await newImage.save();

    res.json({
      message: "Image uploaded successfully to Cloudinary",
      image: newImage
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   DELETE IMAGE
========================= */
router.delete("/delete/:id", async (req, res) => {
  try {
    const img = await Gallery.findById(req.params.id);

    if (!img) {
      return res.status(404).json({ message: "Image not found" });
    }

    // NOTE: We no longer use fs.unlinkSync because the file is not on your server's disk.
    // The image is now a URL (https://res.cloudinary.com/...)
    
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Image record deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;