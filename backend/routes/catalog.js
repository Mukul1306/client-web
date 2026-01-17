const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Catalog = require('../models/Catalog');

// AUTOMATIC FOLDER CREATION
const uploadDir = path.join(__dirname, '../uploads/catalogs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const rawType = req.body.type || "unknown";
    const safeType = rawType.replace(/\//g, "_"); // cosmetic_derma
    cb(null, `${safeType}-${Date.now()}.pdf`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }
});


// ================= LIST =================
router.get('/list', async (req, res) => {
  try {
    const catalogs = await Catalog.find().sort({ updatedAt: -1 });
    res.status(200).json(catalogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= UPLOAD =================
router.post('/upload', upload.single('catalogPdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file received" });

    const rawType = req.body.type;
    const safeType = rawType.replace(/\//g, "_");
    const pdfUrl = req.file.filename;

    const oldCatalog = await Catalog.findOne({ type: safeType });
    if (oldCatalog) {
      const oldPath = path.join(uploadDir, oldCatalog.pdfUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await Catalog.findOneAndUpdate(
      { type: safeType },
      { pdfUrl, updatedAt: Date.now() },
      { upsert: true }
    );

    res.status(200).json({ message: "Upload success!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ================= DOWNLOAD =================
router.get('/download/:type', async (req, res) => {
  try {
    const rawType = decodeURIComponent(req.params.type); // Cosmetic/Derma
    const safeType = rawType.replace(/\//g, "_");

    const catalog = await Catalog.findOne({ type: safeType });
    if (!catalog) return res.status(404).send("Catalog not found");

    const filePath = path.join(uploadDir, catalog.pdfUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("PDF missing from storage");
    }

    res.download(filePath, `${rawType}-Catalog.pdf`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= DELETE =================
router.delete('/:id', async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) return res.status(404).json({ message: "Catalog not found" });

    const filePath = path.join(uploadDir, catalog.pdfUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Catalog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Catalog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
