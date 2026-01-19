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
    // Replace slashes with underscores for the physical file name
    const rawType = req.body.type || "unknown";
    const safeType = rawType.replace(/\//g, "_"); 
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

    const rawType = req.body.type; // e.g., "Cosmetic/Derma"
    const pdfUrl = req.file.filename;

    // We search/save using the RAW type (with slash) so it's easy to find later
    const oldCatalog = await Catalog.findOne({ type: rawType });
    if (oldCatalog) {
      const oldPath = path.join(uploadDir, oldCatalog.pdfUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await Catalog.findOneAndUpdate(
      { type: rawType },
      { pdfUrl, updatedAt: Date.now() },
      { upsert: true }
    );

    res.status(200).json({ message: "Upload success!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= FIXED DOWNLOAD =================
// The (:type*) syntax allows slashes in the URL (captures Cosmetic/Derma)
router.get('/download/:type', async (req, res) => {
  try {
    // Captured string like "Cosmetic/Derma"
    const type = req.params.type || req.params[0]; 

    const catalog = await Catalog.findOne({ type: type });
    if (!catalog) return res.status(404).send("Catalog entry not found in database");

    const filePath = path.join(uploadDir, catalog.pdfUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("PDF file missing from storage");
    }

    // Clean filename for the user download
    const downloadName = type.replace(/\//g, "_");
    res.download(filePath, `${downloadName}-Catalog.pdf`);
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