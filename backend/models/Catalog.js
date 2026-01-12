const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['Pharmaceutical', 'Nutraceutical', 'Cosmetic/Derma', 'Surgical Equipment'],
    unique: true 
  },
  pdfUrl: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Catalog', catalogSchema);