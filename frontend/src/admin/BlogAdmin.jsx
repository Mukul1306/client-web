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

  const loadBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

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

    await axios.post("http://localhost:5000/api/blogs/add", data);
    toast.success("Blog added");

    setForm({ title: "", excerpt: "", content: "" });
    setImage(null);
    loadBlogs();
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`);
    toast.success("Blog deleted");
    loadBlogs();
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Blog Management</h2>

      {/* ADD BLOG */}
      <div className="admin-form">
        <input
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Short Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />

        <textarea
          placeholder="Full Content (optional)"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button onClick={submitBlog}>Add Blog</button>
      </div>

      {/* BLOG LIST */}
      <div className="admin-grid">
        {blogs.length === 0 && <p>No blogs added yet</p>}

        {blogs.map((b) => (
          <div className="admin-card" key={b._id}>
            <img
              src={`http://localhost:5000/uploads/${b.image}`}
              alt={b.title}
            />

            <div className="admin-info">
              <h4>{b.title}</h4>
              <p>{b.excerpt}</p>
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
