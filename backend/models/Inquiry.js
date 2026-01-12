const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  type: { type: String, enum: ["general", "product"], required: true },

  productName: String,

  name: String,
  companyName: String,
  website: String,
  email: String,
  phone: String,
  country: String,
  state: String,
  message: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Inquiry", InquirySchema);
