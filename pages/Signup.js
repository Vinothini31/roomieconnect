import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/form.css"; // <-- import CSS

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Regex validation ---
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{5,}$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid Gmail address (must end with @gmail.com).");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be at least 5 characters long and include at least one number and one special character."
      );
      return;
    }

    try {
      const res = await api.post("/auth/signup", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          placeholder="Gmail Address"
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
        <small className="hint-text">
          Password must have at least 5 characters, 1 number, and 1 special character.
        </small>
        <button type="submit">Sign Up</button>
      </form>
      <div className="small-text">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
}
