import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./inquiry.css";

export default function ProductInquiry() {
  const { state } = useLocation();

  const [form, setForm] = useState({
    type: "product",
    productName: state?.productName || "",
    name: "",
    companyName: "",
    website: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    message: ""
  });

  const submit = async () => {
    try {
      // This tells your frontend to send the inquiry data to your live Render server
await axios.post("https://client-web-dwcu.onrender.com/api/inquiries/add", form);

      alert("Inquiry submitted successfully");
    } catch (err) {
      alert("Failed to submit inquiry");
    }
  };

  return (
    <div className="inquiry-page">
      <div className="inquiry-card">
        <h2>Product Inquiry</h2>

        <input value={form.productName} disabled />

        <input placeholder="Your Name"
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Company Name"
          onChange={e => setForm({ ...form, companyName: e.target.value })} />

        <input placeholder="Company Website"
          onChange={e => setForm({ ...form, website: e.target.value })} />

        <input placeholder="Email ID"
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input placeholder="Contact Number"
          onChange={e => setForm({ ...form, phone: e.target.value })} />

        <input placeholder="Country"
          onChange={e => setForm({ ...form, country: e.target.value })} />

        <input placeholder="State"
          onChange={e => setForm({ ...form, state: e.target.value })} />

        <textarea placeholder="Message"
          onChange={e => setForm({ ...form, message: e.target.value })} />

        <button onClick={submit}>Submit Inquiry</button>
      </div>
    </div>
  );
}
