import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./blogs.css";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
// Replace with your actual Render URL
.get(`https://client-web-dwcu.onrender.com/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <div className="blog-wrapper">
      <div className="blog-detail">
    <img 
  src={`https://client-web-dwcu.onrender.com/uploads/${blog.image}`} 
  alt={blog.title} 
  className="blog-detail-img" 
/>

        <div className="blog-detail-content">
          <span className="blog-date">
            {new Date(blog.date).toDateString()}
          </span>

          <h1>{blog.title}</h1>

          {/* FIX: Use dangerouslySetInnerHTML to render hyperlinks correctly */}
          <div 
            className="blog-full-content"
            dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
          />
        </div>
      </div>
    </div>
  );
}