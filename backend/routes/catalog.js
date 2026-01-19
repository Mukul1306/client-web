const express = require('express');
const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // Ensure this path is correct
const Catalog = require('../models/Catalog');

// Configure Cloudinary Storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'alyvra_catalogs',
    resource_type: 'auto', // MUST be auto to support PDF files
    public_id: (req, file) => {
      const rawType = req.body.type || "unknown";
      const safeType = rawType.replace(/\//g, "_");
      return `${safeType}-${Date.now()}`;
    },
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
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
    // IMPORTANT: Save the full Cloudinary URL (req.file.path)
    const pdfUrl = req.file.path; 

    // We search/save using the RAW type
    await Catalog.findOneAndUpdate(
      { type: rawType },
      { pdfUrl, updatedAt: Date.now() },
      { upsert: true }
    );

    res.status(200).json({ message: "Upload success!", url: pdfUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE =================
router.delete('/:id', async (req, res) => {
  try {
    // Note: Cloudinary deletion requires the public_id. 
    // For now, we delete the database entry.
    await Catalog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Catalog deleted from database" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;