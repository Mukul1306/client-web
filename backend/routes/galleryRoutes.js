const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const upload = require("../middleware/upload");
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
   ADD IMAGE (UPLOAD)
========================= */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newImage = new Gallery({
      image: req.file.filename
    });

    await newImage.save();

    res.json({
      message: "Image uploaded successfully",
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

    // delete image file
    if (img.image) {
      const filePath = path.join(__dirname, "..", "uploads", img.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
