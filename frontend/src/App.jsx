import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Reports from "./pages/Reports";
import Architecture from "./pages/Architecture";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/architecture" element={<Architecture />} />
      </Routes>
      <footer style={{
        marginTop: 60,
        padding: 20,
        background: "#f4f6f9",
        textAlign: "center",
        fontSize: 14
      }}>
        <p><strong>By:</strong> Deepika Kothamasu</p>
        <p><strong>URN:</strong> PES2PGE24DS012</p>
        <p><strong>Project Guide:</strong> Mr. Mahesh Ramegowda</p>
      </footer>
    </BrowserRouter>
  );
}
