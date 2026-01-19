import { useEffect, useState } from "react";
import axios from "axios";
import "./blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const API_BASE = "https://client-web-dwcu.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // --- ADD THIS SMART HELPER ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "https://via.placeholder.com/400x200";
    // If it's already a full link (Cloudinary), use it directly
    if (imageSource.startsWith("http")) return imageSource;
    // Only use API_BASE for old local filenames
    return `${API_BASE}/uploads/${imageSource}`;
  };

  const toggleReadMore = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <h1>Articles</h1>
        <p>Our resource center provides company news and leadership content.</p>
      </div>

      <div className="blogs-list-container">
        {blogs.map((blog) => (
          <div className="blog-horizontal-card" key={blog._id}>
            <div className="blog-img-wrapper">
              {/* UPDATED IMAGE SOURCE HERE */}
              <img 
                src={getImageUrl(blog.image)} 
                alt={blog.title} 
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x200"; }}
              />
            </div>

            <div className="blog-content-wrapper">
              <div className="blog-text-area">
                <h3>{blog.title}</h3>
                <div 
                  className={`blog-description ${expandedId === blog._id ? "expanded" : "collapsed"}`}
                  dangerouslySetInnerHTML={{ __html: blog.content }} 
                />
                <button 
                  className="read-more-btn" 
                  onClick={() => toggleReadMore(blog._id)}
                >
                  {expandedId === blog._id ? "Read Less" : "Read more"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}