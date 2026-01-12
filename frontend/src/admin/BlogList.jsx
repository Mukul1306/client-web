import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  const load = async () => {
    const res = await axios.get("https://client-web-dwcu.onrender.com/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!window.confirm("Delete blog?")) return;
// Sending the delete command to your live cloud server
await axios.delete(`https://client-web-dwcu.onrender.com/api/blogs/delete/${id}`);
load();
  };

  return (
    <div className="admin-list">
      <h2>Blogs</h2>

      {blogs.map(b => (
        <div key={b._id} className="admin-card">
          <h4>{b.title}</h4>
          <p>{b.shortDesc}</p>
          <button onClick={() => del(b._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
