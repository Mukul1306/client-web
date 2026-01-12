import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./admin.css";

export default function InquiryAdmin() {
  const [data, setData] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null); // For Message Modal

  const loadInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inquiries");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to load inquiries");
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/inquiries/delete/${id}`);
      toast.success("Inquiry deleted");
      loadInquiries();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header-flex">
        <h2 className="admin-title">Customer Inquiries</h2>
        <a href="http://localhost:5000/api/inquiries/export">
          <button className="export-btn">📥 Download Excel</button>
        </a>
      </div>

      <div className="table-container shadow-sm">
        <table className="aesthetic-table">
          <thead>
            <tr>
              <th>Type/Product</th>
              <th>Customer & Company</th>
              <th>Contact Details</th>
              <th>Website</th>
              <th>Location</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((i) => (
              <tr key={i._id}>
                <td>
                  <span className={`badge ${i.type === 'product' ? 'blue' : 'gray'}`}>
                    {i.type || "general"}
                  </span>
                  <div className="main-text" style={{ marginTop: '5px' }}>{i.productName || "General"}</div>
                </td>
                <td>
                  <div className="main-text">{i.name}</div>
                  <div className="sub-text"><strong>Co:</strong> {i.companyName || "-"}</div>
                </td>
                <td>
                  <div className="main-text">{i.email}</div>
                  <div className="sub-text">{i.phone}</div>
                </td>

<td>
  {i.website && i.website !== "-" ? (
    <a 
      href={i.website.startsWith('http') ? i.website : `https://${i.website}`} 
      target="_blank" 
      rel="noreferrer" 
      className="link-pill"
    >
      Visit Site 🔗
    </a>
  ) : (
    <span className="not-provided-tag">Not Provided</span>
  )}
</td>
                <td>
                  <div className="main-text">{i.country}</div>
                  <div className="sub-text">{i.state || "-"}</div>
                </td>
                <td>
                  <button className="view-btn" onClick={() => setSelectedInquiry(i)}>
                    👁️ View
                  </button>
                </td>
                <td>
                  <button className="delete-icon-btn" onClick={() => deleteInquiry(i._id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MESSAGE POPUP MODAL */}
      {selectedInquiry && (
        <div className="admin-form-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="admin-form edit-mode" onClick={e => e.stopPropagation()}>
            <div className="form-header">
               <h2>Inquiry Details</h2>
               <button className="close-icon" onClick={() => setSelectedInquiry(null)}>×</button>
            </div>
            <div className="inquiry-details-box">
               <p><strong>Product:</strong> {selectedInquiry.productName || "N/A"}</p>
               <p><strong>Customer:</strong> {selectedInquiry.name}</p>
               <p><strong>Company:</strong> {selectedInquiry.companyName || "N/A"}</p>
               <hr />
               <p className="message-label">Customer Message:</p>
               <div className="message-content">
                  {selectedInquiry.message || "No message provided."}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}