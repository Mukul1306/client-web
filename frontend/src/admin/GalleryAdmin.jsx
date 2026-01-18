import React, { useEffect, useState } from "react"; // Added React import here
import axios from "axios";
import toast from "react-hot-toast";
import "./admin.css";

export default function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const loadImages = async () => {
    try {
      const res = await axios.get("https://client-web-dwcu.onrender.com/api/gallery");
      setImages(res.data);
    } catch (err) {
      toast.error("Failed to load gallery");
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      const data = new FormData();
      data.append("image", file);
      await axios.post("https://client-web-dwcu.onrender.com/api/gallery/add", data);
      toast.success("Image uploaded successfully");

      setFile(null);
      setPreview(null);
      loadImages();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`https://client-web-dwcu.onrender.com/api/gallery/delete/${id}`);
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
              <button className="remove-img-btn" onClick={() => {setFile(null); setPreview(null);}}>×</button>
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
          <button className="save-btn" onClick={uploadImage} style={{ marginTop: '15px' }}>
            Confirm Upload
          </button>
        )}
      </div>

      <div className="gallery-grid">
        {images.map((img) => (
          /* FIXED: React.Fragment now works because React is imported */
          <React.Fragment key={img._id}> 
            <div className="gallery-item-card">
              <img 
                src={img.image} 
                alt="gallery" 
                className="gallery-preview-img"
              />
              <div className="gallery-actions">
                <button 
                  className="delete-btn" 
                  /* FIXED: Changed handleDelete to deleteImage to match your function name */
                  onClick={() => deleteImage(img._id)}
                >
                  🗑️ DELETE
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}