import { useState } from "react";
import axios from "axios";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const login = async () => {
   try {
  const res = await axios.post("https://client-web-dwcu.onrender.com/api/admin/login", { username, password });
  
  if (res.data.token) {
    // Save the token so you can perform admin actions (add blogs, products, etc.)
    localStorage.setItem("adminToken", res.data.token);
    // Redirect to dashboard
    window.location.href = "/admin/dashboard";
  }
} catch (err) {
  alert("Login failed! Check your credentials.");
}
  };

  return (
    <div className="admin-form">
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
