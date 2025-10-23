// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Profile from "./pages/Profile"; // other users
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rooms from "./pages/Rooms";


function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar shown on all pages */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* current user */}
        <Route path="/profile/:id" element={<Profile />} /> {/* other users */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />           
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
}

export default App;
