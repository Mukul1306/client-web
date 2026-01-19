import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../admin/admin.css";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: ""
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Constants for your environment
  const CLOUD_NAME = "your_cloud_name"; // REPLACE THIS
  const API_BASE = "https://client-web-dwcu.onrender.com";

  const loadBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error loading blogs:", err);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // --- SMART IMAGE HELPER ---
  const getImageUrl = (imageSource) => {
    if (!imageSource) return "/placeholder-blog.png";
    if (imageSource.startsWith("http")) return imageSource;
    if (imageSource.includes(".")) return `${API_BASE}/uploads/${imageSource}`;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageSource}.png`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitBlog = async () => {
    if (!form.title || !form.excerpt || !image) {
      toast.error("All fields required");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("excerpt", form.excerpt);
    data.append("content", form.content);
    data.append("image", image);

    try {
      const loadingToast = toast.loading("Publishing to cloud...");
      await axios.post(`${API_BASE}/api/blogs/add`, data);
      toast.dismiss(loadingToast);
      toast.success("Blog added successfully");

      setForm({ title: "", excerpt: "", content: "" });
      setImage(null);
      setPreview(null);
      loadBlogs();
    } catch (err) {
      toast.error("Failed to add blog");
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      // FIXED: Pointing to Render instead of localhost
      await axios.delete(`${API_BASE}/api/blogs/delete/${id}`);
      toast.success("Blog deleted from server");
      loadBlogs();
    } catch (err) {
      toast.error("Error deleting blog");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Blog Management</h2>

      <div className="admin-form">
        <h3>Create New Post</h3>
        <input
          placeholder="Blog Title"
          className="admin-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Short Excerpt (Summary)"
          className="admin-textarea"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />

        <textarea
          placeholder="Full Content"
          className="admin-textarea"
          style={{ minHeight: "150px" }}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="file-input-group">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="admin-preview-img" style={{width: '80px', marginTop: '10px'}} />}
        </div>

        <button onClick={submitBlog} className="save-btn">Add Blog</button>
      </div>

      <hr className="admin-hr" />

      <div className="admin-grid">
        {blogs.length === 0 ? <p>No blogs found.</p> : blogs.map((b) => (
          <div className="admin-card" key={b._id}>
            <img
              src={getImageUrl(b.image)}
              alt={b.title}
              onError={(e) => e.target.src = "/placeholder-blog.png"}
            />

            <div className="admin-info">
              <h4>{b.title}</h4>
              <p>{b.excerpt?.substring(0, 60)}...</p>
            </div>

            <div className="admin-actions">
              <button
                className="delete-btn"
                onClick={() => deleteBlog(b._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}