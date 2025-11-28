import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/profile.css";

export default function Profile() {
  const { id } = useParams(); // user ID from route
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      <div className="profile-card">
        {/* ✅ Profile Picture */}
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="profile-picture"
          />
        ) : (
          <div className="profile-placeholder">
            <span>No Image</span>
          </div>
        )}

        <h2>{user.username}’s Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>

        {/* ✅ Room Info */}
        {user.roomNumber ? (
          <div className="room-info">
            <strong>Room Number:</strong>{" "}
            <span className="room-number-tag">{user.roomNumber}</span>
          </div>
        ) : (
          <div className="room-info no-room">
            <strong>Room:</strong> <span>Not Assigned</span>
          </div>
        )}

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
    </div>
  );
}