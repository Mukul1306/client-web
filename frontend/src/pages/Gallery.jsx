import { useEffect, useState } from "react";
import axios from "axios";

import "./gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gallery");
        setImages(res.data);
      } catch (err) {
        console.error("Gallery error:", err);
        setError(true);
      }
    };

    loadGallery();
  }, []);

  if (error) {
    return <h2 style={{ padding: 40 }}>Gallery failed to load</h2>;
  }

return (
  <div className="gallery-page">
    <div className="gallery-container">
      <div class="gallery-hero" >
    <h1 >Our Gallery</h1>
      <p className="subtitle">
        A glimpse of our pharmaceutical products & facilities
      </p>
      </div>
  

      <div className="gallery-grid">
        {images.map(img => (
          <div className="gallery-card" key={img._id}>
            <img
              src={`http://localhost:5000/uploads/${img.image}`}
              alt="gallery"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
