const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const catalogRoutes = require('./routes/catalog');
require('dotenv').config();

// --- 1. NEW IMPORTS FOR CLOUDINARY ---
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const app = express();

/* =======================
   CLOUDINARY CONFIGURATION
======================= */
// --- 2. SETUP CLOUDINARY WITH YOUR DASHBOARD KEYS ---
cloudinary.config({
  cloud_name: 'dths8gmd3', // From your screenshot
  api_key: '883841434275163', // From your screenshot
  api_secret: process.env.CLOUDINARY_API_SECRET // Keep this in your .env file!
});

// --- 3. CREATE STORAGE ENGINE ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'alyvra_pharmacy',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

/* =======================
    MIDDLEWARE
======================= */

  app.use(cors({
   origin: [
    "https://effulgent-melomakarona-c8187e.netlify.app"
  ],
   
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get("/", (req, res) => {
  res.status(200).send("Alyvra Pharmatech Backend API is Live and Running!");
});

app.use(express.json());

// Keep this for now to avoid breaking old links, but new ones won't use it
app.use("/uploads", express.static("uploads"));

/* =======================
    ROUTES
======================= */
// Note: You will need to pass the 'upload' middleware to your route files
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/blogs", blogRoutes);
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/admin", require("./routes/adminAuth"));
app.use('/api/catalogs', catalogRoutes);

/* =======================
    DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});