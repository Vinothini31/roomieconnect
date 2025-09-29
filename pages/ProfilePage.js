// frontend/src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  if (!user) return <p style={{ textAlign: "center", color: "#fff" }}>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <h3>My Interests</h3>
        <div className="interests-list">
          {user.interests && user.interests.length > 0 ? (
            user.interests.map((i, idx) => (
              <span key={idx} className="interest-tag">
                {i}
              </span>
            ))
          ) : (
            <p>No interests selected yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
