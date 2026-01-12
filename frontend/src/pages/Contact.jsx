import { useState } from "react";
import axios from "axios";
import "./contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    type: "general",
    name: "",
    companyName: "",
    website: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    message: ""
  });
       
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };
  const submit = async () => {
    try {
      // Replace localhost with your actual Render URL
await axios.post("https://client-web-dwcu.onrender.com/api/inquiries/add", form);
      alert("Thank you! We will contact you soon.");

      setForm({
        type: "general",
        name: "",
        companyName: "",
        website: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        message: ""
      });
    } catch (err) {
      alert("Submission failed");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you</p>

        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />

 <input
  placeholder="Company Website"
  value={form.website}
  // This tells React to save what you type into the 'website' property of your form state
  onChange={(e) => setForm({ ...form, website: e.target.value })}
/>
        <input
          placeholder="Email ID"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Contact Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />

        <input
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button onClick={submit}>Send Message</button>
      </div>
    </div>
  );
}
