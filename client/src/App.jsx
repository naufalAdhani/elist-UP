import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Board from "./pages/Board";
import HomeLogin from "./pages/HomeLogin";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Board" element={<Board />} />
      <Route path="/HomeLogin" element={<HomeLogin />} />
      <Route path="/Logout" element={<Logout />} />
    </Routes>
  );
}