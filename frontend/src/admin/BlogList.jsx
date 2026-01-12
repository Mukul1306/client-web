import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!window.confirm("Delete blog?")) return;
    await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`);
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
