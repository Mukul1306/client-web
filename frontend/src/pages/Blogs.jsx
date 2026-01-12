import { useEffect, useState } from "react";
import axios from "axios";
import "./blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios
   .get("https://client-web-dwcu.onrender.com/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleReadMore = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <h1>Articles</h1>
        <p>Our resource center provides company news, thought leadership content, and upcoming virtual events.</p>
      </div>

      <div className="blogs-list-container">
        {blogs.map((blog) => (
          <div className="blog-horizontal-card" key={blog._id}>
            <div className="blog-img-wrapper">
          <img src={`https://client-web-dwcu.onrender.com/uploads/${blog.image}`} alt={blog.title} />
            </div>

            <div className="blog-content-wrapper">
              <div className="blog-text-area">
                <h3>{blog.title}</h3>
                
                {/* FIX: Render as HTML instead of plain text */}
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