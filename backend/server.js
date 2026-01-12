const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const catalogRoutes = require('./routes/catalog');
require('dotenv').config();
const app = express();

/* =======================
   MIDDLEWARE (FIRST)
======================= */

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// JSON body parser
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static("uploads"));

/* =======================
   ROUTES
======================= */

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/blogs", blogRoutes);
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/admin", require("./routes/adminAuth"));

const inquiryRoutes = require("./routes/inquiryRoutes");
app.use('/api/catalogs', catalogRoutes);
/* =======================
   DATABASE
======================= */

mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
  });

/* =======================
   SERVER
======================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
