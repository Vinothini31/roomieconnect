// /frontend/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/form.css";   // import the same CSS

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // Save token and user ID in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      alert("Login successful!");
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
     <div className="login-page">
      <h1 className="form-title">RoomiConnect</h1>
    <div className="form-container">
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
        />
        <input
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="small-text">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
      </div>
  );
}