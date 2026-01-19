import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./admin.css";

export default function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const API_BASE = "https://client-web-dwcu.onrender.com";

  const loadImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      toast.error("Failed to load gallery data");
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  // --- SMART IMAGE HELPER ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "https://via.placeholder.com/150";
    if (imageSource.startsWith("http")) return imageSource; // Cloudinary
    return `${API_BASE}/uploads/${imageSource}`; // Local server uploads
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    if (!file) return toast.error("Please select an image");

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("image", file);
      
      await axios.post(`${API_BASE}/api/gallery/add`, data);
      toast.success("Image added to gallery!");

      setFile(null);
      setPreview(null);
      loadImages();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed - is the server Live?");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Permanently delete this image?")) return;

    try {
      await axios.delete(`${API_BASE}/api/gallery/delete/${id}`);
      toast.success("Image removed");
      loadImages();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Gallery Management</h2>

      <div className="gallery-upload-section">
        <div className="upload-container">
          {preview ? (
            <div className="image-preview-wrapper">
              <img src={preview} alt="Preview" className="img-preview" />
              <button 
                className="remove-img-btn" 
                onClick={() => {setFile(null); setPreview(null);}}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="upload-placeholder">
              <input type="file" id="gallery-file" onChange={handleFileChange} hidden />
              <label htmlFor="gallery-file" className="file-label">
                <span className="upload-icon">📷</span>
                <span>Click to select gallery image</span>
              </label>
            </div>
          )}
        </div>
        {file && (
          <button 
            className="save-btn" 
            onClick={uploadImage} 
            disabled={isUploading}
            style={{ marginTop: '15px', opacity: isUploading ? 0.7 : 1 }}
          >
            {isUploading ? "Uploading..." : "Confirm Upload"}
          </button>
        )}
      </div>

      <div className="gallery-grid">
        {images.map((img) => (
          <div className="gallery-item-card" key={img._id}>
            <img 
              src={getImageUrl(img.image)} 
              alt="gallery" 
              className="gallery-preview-img"
              onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
            />
            <div className="gallery-actions">
              <button 
                className="delete-btn" 
                onClick={() => deleteImage(img._id)}
              >
                🗑️ DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}