const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Catalog = require('../models/Catalog');

// AUTOMATIC FOLDER CREATION LOGIC
const uploadDir = path.join(__dirname, '../uploads/catalogs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Replaces slashes with dashes to prevent folder path errors
    const type = req.body.type ? req.body.type.replace(/\//g, '-') : 'unknown';
    cb(null, `${type}-${Date.now()}.pdf`);
  }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 } // Allow up to 20MB
});

// --- GET ROUTE (LIST ALL) ---
// Used by Admin Panel to show the list of existing catalogs
router.get('/list', async (req, res) => {
  try {
    const catalogs = await Catalog.find().sort({ updatedAt: -1 });
    res.status(200).json(catalogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- POST ROUTE (UPLOAD) ---
router.post('/upload', upload.single('catalogPdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file received" });

    const { type } = req.body;
    const pdfUrl = req.file.filename;

    // Optional: If you want to delete the OLD physical file before updating with a NEW one:
    const oldCatalog = await Catalog.findOne({ type });
    if (oldCatalog) {
        const oldPath = path.join(uploadDir, oldCatalog.pdfUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await Catalog.findOneAndUpdate(
      { type },
      { pdfUrl, updatedAt: Date.now() },
      { upsert: true }
    );

    res.status(200).json({ message: "Upload success!" });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- GET ROUTE (DOWNLOAD) ---
router.get('/download/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const catalog = await Catalog.findOne({ type });

    if (!catalog || !catalog.pdfUrl) {
      return res.status(404).send("Error: Catalog not found.");
    }

    const filePath = path.join(uploadDir, catalog.pdfUrl);

    if (fs.existsSync(filePath)) {
      return res.download(filePath, `${type}-Catalog.pdf`);
    } else {
      return res.status(404).send("Error: PDF file missing from storage.");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DELETE ROUTE ---
// Deletes both the database entry and the physical file
router.delete('/:id', async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);
    
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    // Define file path
    const filePath = path.join(uploadDir, catalog.pdfUrl);

    // 1. Delete physical file
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    // 2. Delete from database
    await Catalog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Catalog deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;