// frontend/src/pages/Rooms.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/rooms.css";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function joinRoom(roomId) {
    try {
      await api.post(`/rooms/${roomId}/join`, { userId });
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.error || "Error joining room");
    }
  }

  async function leaveRoom(roomId) {
    try {
      await api.post(`/rooms/${roomId}/leave`, { userId });
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.error || "Error leaving room");
    }
  }

  // ✅ Download CSV with all users' details
  async function downloadUserData() {
    try {
      const res = await api.get("/users"); // uses /api/users route
      const users = res.data;

      // Convert to CSV
      const csvHeader = ["Username", "Email", "Room Number"];
      const csvRows = users.map((u) => [
        u.username,
        u.email,
        u.roomNumber || "Not Assigned",
      ]);

      const csvContent = [
        csvHeader.join(","),
        ...csvRows.map((r) => r.join(",")),
      ].join("\n");

      // Create a downloadable file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "room_users.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading user data:", err);
      alert("Failed to download data");
    }
  }

  return (
    <div className="rooms-container">
      <h2>🏠 Room Availability</h2>

      {/* ✅ Download Button */}
      <button className="download-btn" onClick={downloadUserData}>
        📥 Download Room Data (CSV)
      </button>

      <div className="room-grid">
        {rooms.map((room) => {
          const filled = room.occupants.length;
          const color =
            filled === 3 ? "red" : filled === 2 ? "blue" : "green";

          return (
            <div key={room._id} className={`room-card ${color}`}>
              <h3>Room {room.roomNumber}</h3>
              <p>{filled}/3 Occupied</p>

              <div className="occupants">
                {room.occupants.map((o) => (
                  <span
                    key={o.userId}
                    className="occupant-link"
                    onClick={() => navigate(`/profile/${o.userId}`)}
                  >
                    {o.username}
                  </span>
                ))}
              </div>

              <div className="room-buttons">
                {filled < 3 && (
                  <button onClick={() => joinRoom(room._id)}>Select Room</button>
                )}
                <button onClick={() => leaveRoom(room._id)}>Leave Room</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}