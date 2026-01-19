import { useEffect, useState } from "react";
import axios from "axios";
import "./gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  const CLOUD_NAME = "your_cloud_name"; // Change to your real Cloudinary name
  const API_BASE = "https://client-web-dwcu.onrender.com";

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/gallery`);
        setImages(res.data);
      } catch (err) {
        setError(true);
      }
    };
    loadGallery();
  }, []);

  const getImageUrl = (imageSource) => {
    if (!imageSource) return "https://via.placeholder.com/400";
    if (imageSource.startsWith("http")) return imageSource;
    if (imageSource.includes(".")) return `${API_BASE}/uploads/${imageSource}`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  if (error) return <h2 style={{ padding: 40 }}>Gallery failed to load</h2>;

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-hero">
          <h1>Our Gallery</h1>
          <p className="subtitle">A glimpse of our pharmaceutical products & facilities</p>
        </div>
        <div className="gallery-grid">
          {images.map(img => (
            <div className="gallery-card" key={img._id}>
              {/* Note: I changed img.image to img.image or img.img based on your schema */}
              <img src={getImageUrl(img.image || img.img)} alt="gallery" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}