import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from 'react-quill'; // Import the editor
import 'react-quill/dist/quill.snow.css'; // Import editor styles
import "./admin.css";

export default function AddBlog({ onAdded }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
  });
  const [image, setImage] = useState(null);

  // Quill Editor Modules (Tools like Bold, Link, etc.)
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean'] // This allows you to add the Hyperlinks easily
    ],
  };

  const submit = async () => {
    if (!image) return toast.error("Image required");
    if (!form.title || !form.content) return toast.error("Title and Content are required");

    const data = new FormData();
    data.append("title", form.title);
    data.append("excerpt", form.excerpt);
    data.append("content", form.content); // This now contains HTML string
    data.append("image", image);

    try {
      // This sends your new blog data to the live Render backend
await axios.post("https://client-web-dwcu.onrender.com/api/blogs/add", data);
      toast.success("Blog added successfully!");
      
      // Reset Form
      setForm({ title: "", excerpt: "", content: "" });
      setImage(null);
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add blog");
    }
  };

  return (
    <div className="admin-form">
      <h2>Add New Blog Post</h2>

      <input
        className="admin-input"
        placeholder="Blog Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="admin-textarea"
        placeholder="Short excerpt (Summary for the list page)"
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />

      <div className="editor-wrapper">
        <label>Full Blog Content</label>
        <ReactQuill 
          theme="snow"
          value={form.content}
          onChange={(value) => setForm({ ...form, content: value })}
          modules={modules}
          placeholder="Write your story here... Highlight text to add links!"
        />
      </div>

      <div className="file-input-group">
        <label>Featured Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <button className="publish-btn" onClick={submit}>Publish Blog</button>
    </div>
  );
}