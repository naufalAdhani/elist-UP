import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Member from "./pages/Member";
import Board from "./pages/Board";
import HomeLogin from "./pages/HomeLogin";
import Logout from "./pages/Logout";
import EditProfile from "./pages/EditProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Board" element={<Board />} />
      <Route path="/member" element={<Member />} />
      <Route path="/HomeLogin" element={<HomeLogin />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}