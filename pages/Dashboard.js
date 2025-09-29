// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ import navigation hook
import api from "../api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [interests, setInterests] = useState([]);
  const [allInterests] = useState([
    "Music",
    "Art",
    "Sports",
    "Travel",
    "Gaming",
    "Tech",
    "Cooking",
  ]);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();   // ✅ initialize navigation

  // Fetch matches
  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await api.get(`/users/${userId}/match`);
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    }
    if (userId) fetchMatches();
  }, [userId]);

  // Toggle interests
  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Save interests + refresh matches
  const saveInterests = async () => {
    try {
      await api.put(`/users/${userId}/interests`, { interests });
      alert("Interests saved!");
      const res = await api.get(`/users/${userId}/match`);
      setMatches(res.data);
    } catch (err) {
      console.error("Error saving interests:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Select Your Interests</h2>
      <div className="interests-buttons">
        {allInterests.map((i) => (
          <button
            key={i}
            onClick={() => toggleInterest(i)}
            className={`interest-btn ${
              interests.includes(i) ? "selected" : ""
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <button className="save-btn" onClick={saveInterests}>
        Save Interests
      </button>

      <h2>Your Matches</h2>
      <div className="matches-list">
        {matches.map((m) => (
          <div
            key={m.id}
            className="match-card"
            onClick={() => navigate(`/profile/${m.id}`)} // ✅ click to go to profile
            style={{ cursor: "pointer" }} // shows clickable hand cursor
          >
            <h3>{m.username}</h3>
            <p>Compatibility Score: {m.score}</p>

            {m.sharedInterests && m.sharedInterests.length > 0 && (
              <div className="shared-interests">
                <h5>Shared Interests:</h5>
                <div className="interests-list">
                  {m.sharedInterests.map((interest, idx) => (
                    <span key={idx} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
