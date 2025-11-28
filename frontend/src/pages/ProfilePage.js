import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
        setPreview(res.data.profilePicture);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const saveProfilePicture = async () => {
    if (!selectedImage) return alert("Please select an image first.");

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onloadend = async () => {
      try {
        await api.put(`/users/${userId}/profile-picture`, {
          profilePicture: reader.result,
        });
        alert("Profile picture updated!");
        setIsEditing(false);
      } catch (err) {
        console.error("Error updating profile picture:", err);
      }
    };
  };

  if (!user)
    return <p style={{ textAlign: "center", color: "#fff" }}>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-pic-section">
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile"
            className="profile-pic"
          />
          {isEditing ? (
            <>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button onClick={saveProfilePicture} className="save-btn">
                Save Picture
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>

        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {/* ✅ Room Number Section */}
        <div className="room-section">
          <h3>Room</h3>
          {user.roomNumber ? (
            <p className="room-number">🏠 Room {user.roomNumber}</p>
          ) : (
            <p className="no-room">Not assigned to any room yet</p>
          )}
        </div>

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