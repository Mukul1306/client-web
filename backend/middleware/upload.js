const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure using the credentials from your dashboard
cloudinary.config({
  cloud_name: 'dths8gmd3',
  api_key: '883841434275163',
  api_secret: process.env.CLOUDINARY_API_SECRET // Set this in your Render Env Variables
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pharmacy_catalog', // Folder name in your Cloudinary Media Library
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;