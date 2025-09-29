// frontend/src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ import navigate
import api from "../api";
import "../styles/profile.css";

export default function Profile() {
  const { id } = useParams(); // user ID from route
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ navigation hook

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    }
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>{user.username}’s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="interests-list">
        <h3>Interests</h3>
        {user.interests && user.interests.length > 0 ? (
          user.interests.map((interest, idx) => (
            <span key={idx} className="interest-tag">
              {interest}
            </span>
          ))
        ) : (
          <p>No interests added yet.</p>
        )}
      </div>

      {/* ✅ Back Button */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
