import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Constants
  const CLOUD_NAME = "your_cloud_name"; // REPLACE THIS
  const API_BASE = "https://client-web-dwcu.onrender.com";

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error loading blogs:", err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // --- SMART IMAGE HELPER ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "/placeholder-blog.png";
    if (imageSource.startsWith("http")) return imageSource;
    if (imageSource.includes(".")) return `${API_BASE}/uploads/${imageSource}`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  const del = async (id) => {
    if (!window.confirm("Delete blog permanently?")) return;
    
    try {
      const deletingToast = toast.loading("Deleting...");
      await axios.delete(`${API_BASE}/api/blogs/delete/${id}`);
      toast.dismiss(deletingToast);
      toast.success("Blog removed");
      load(); // Refresh list
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading && blogs.length === 0) return <div className="admin-loading">Loading blogs...</div>;

  return (
    <div className="admin-list-container">
      <div className="admin-header">
        <h2>Manage Blogs</h2>
        <span className="count-badge">{blogs.length} Posts</span>
      </div>

      <div className="admin-grid">
        {blogs.length === 0 ? (
          <p>No blogs found. Start by adding one!</p>
        ) : (
          blogs.map(b => (
            <div key={b._id} className="admin-list-card">
              <div className="admin-card-content">
                <img 
                  src={getImageUrl(b.image)} 
                  alt="" 
                  className="admin-list-thumb"
                  onError={(e) => e.target.src = "/placeholder-blog.png"} 
                />
                <div className="admin-text-side">
                  <h4>{b.title}</h4>
                  <p className="admin-excerpt">{b.excerpt || b.shortDesc}</p>
                </div>
              </div>
              <div className="admin-card-actions">
                <button className="del-btn-small" onClick={() => del(b._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}