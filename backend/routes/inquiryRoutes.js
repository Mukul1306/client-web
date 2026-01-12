const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const XLSX = require("xlsx");

/* ADD INQUIRY */
router.post("/add", async (req, res) => {
  try {
    // Destructuring to ensure specific fields are captured
    const { productName, name, companyName, website, email, phone, country, state, message, type } = req.body;
    
    const inquiry = new Inquiry({
      productName,
      name,
      companyName,
      website, // Ensure this matches your model
      email,
      phone,
      country,
      state,
      message,
      type: type || 'general'
    });

    await inquiry.save();
    res.json({ message: "Inquiry submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL INQUIRIES */
router.get("/", async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json(data);
});

/* EXPORT TO EXCEL */
router.get("/export", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().lean();

    // Mapping the data to provide clean, readable headers in Excel
    const excelData = inquiries.map((i) => ({
      "Date": i.createdAt ? new Date(i.createdAt).toLocaleDateString() : "-",
      "Type": i.type || "General",
      "Product": i.productName || "-",
      "Customer Name": i.name,
      "Email": i.email,
      "Phone": i.phone,
      "Company Name": i.companyName || "-",
      "website": i.website || "-", // This ensures website appears in Excel
      "Country": i.country || "-",
      "State": i.state || "-",
      "Message": i.message || "-"
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inquiries");

    const filePath = "inquiries.xlsx";
    XLSX.writeFile(wb, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: "Export failed" });
  }
});

// DELETE INQUIRY
router.delete("/delete/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;