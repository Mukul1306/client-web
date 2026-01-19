import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import "./admin.css";

export default function AddBlog({ onAdded }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Added for image preview

  const API_BASE = "https://client-web-dwcu.onrender.com";

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean'] 
    ],
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show the user what they picked
    }
  };

  const submit = async () => {
    if (!image) return toast.error("Image required");
    if (!form.title || !form.content) return toast.error("Title and Content are required");

    const data = new FormData();
    data.append("title", form.title);
    data.append("excerpt", form.excerpt);
    data.append("content", form.content); 
    data.append("image", image);

    try {
      const loadingToast = toast.loading("Publishing blog...");
      
      await axios.post(`${API_BASE}/api/blogs/add`, data);
      
      toast.dismiss(loadingToast);
      toast.success("Blog published successfully!");
      
      // Reset Form
      setForm({ title: "", excerpt: "", content: "" });
      setImage(null);
      setPreview(null);
      
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add blog. Check server connection.");
    }
  };

  return (
    <div className="admin-form blog-form-card">
      <h2>Add New Blog Post</h2>

      <div className="input-group">
        <label>Title</label>
        <input
          className="admin-input"
          placeholder="Enter a catchy title..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div className="input-group">
        <label>Summary (Excerpt)</label>
        <textarea
          className="admin-textarea"
          placeholder="Brief summary for the blog list page..."
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
      </div>

      <div className="editor-wrapper">
        <label>Full Blog Content</label>
        <ReactQuill 
          theme="snow"
          value={form.content}
          onChange={(value) => setForm({ ...form, content: value })}
          modules={modules}
          placeholder="Write your story here..."
        />
      </div>

      <div className="file-input-group">
        <label>Featured Image</label>
        <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="file-chooser"
        />
        {preview && (
          <div className="image-preview-box">
            <img src={preview} alt="Preview" className="admin-img-prev" />
          </div>
        )}
      </div>

      <button className="publish-btn" onClick={submit}>
        🚀 Publish Blog Post
      </button>
    </div>
  );
}