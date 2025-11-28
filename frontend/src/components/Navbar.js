// frontend/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">RoomiConnect</div>
      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/profile" className="nav-link">My Profile</Link>
        <Link to="/rooms" className="nav-link">Rooms Availability</Link>
        
        <button className="nav-link logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}