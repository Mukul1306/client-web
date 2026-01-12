import { Outlet, Link, useNavigate } from "react-router-dom";
import "./adminLayout.css";

export default function AdminLayout() {
    const navigate = useNavigate();

    const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };
  return (
    <div className="admin-wrapper">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <Link to="/admin">Products</Link>
        <Link to="/admin/add">Add Product</Link>
        <Link to="/admin/gallery">Gallery</Link>
        <Link to="/admin/blogs">Blogs</Link>
        <Link to="/admin/catalogs" >
   📂 Manage Catalogs
</Link>
        <Link to="/admin/inquiries">Inquiries</Link>
              {/* 🔴 LOGOUT BUTTON */}
           <button
          type="button"
          className="admin-logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      {/* PAGE CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
