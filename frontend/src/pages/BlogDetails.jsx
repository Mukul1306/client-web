import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./blogs.css";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const CLOUD_NAME = "dths8gmd3"; // Change to your real Cloudinary name
  const API_BASE = "https://client-web-dwcu.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id, API_BASE]);

  if (!blog) return <p style={{ padding: "40px" }}>Loading...</p>;

 const getImageUrl = (imageSource) => {
  if (!imageSource) return "https://via.placeholder.com/400x200";

  // If the link starts with http, it's a Cloudinary link—use it directly!
  if (imageSource.startsWith("http")) {
    return imageSource;
  }

  // ONLY use the API_BASE if it's an old local filename
  return `https://client-web-dwcu.onrender.com/uploads/${imageSource}`;
};

  return (
    <div className="blog-wrapper">
      <div className="blog-detail">
        <img 
          src={getImageUrl(blog.image)} 
          alt={blog.title} 
          className="blog-detail-img" 
          onError={(e) => { e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found"; }}
        />
        <div className="blog-detail-content">
          <span className="blog-date">{new Date(blog.date).toDateString()}</span>
          <h1>{blog.title}</h1>
          <div 
            className="blog-full-content"
            dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
          />
        </div>
      </div>
    </div>
  );
}