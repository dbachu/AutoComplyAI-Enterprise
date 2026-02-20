import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        🔐 AutoComplyAI - Adaptive Phishing Detection with Built-In Incident Reporting
      </div>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>
        By: Deepika Kothamasu
        <div style={{ fontSize: 14 }}>
           URN: PES2PGE24DS012 | Project Guide: Mr. Mahesh Ramegowda
        </div>
        </div>

      <div style={linkContainer}>
        <Link style={linkStyle} to="/">Dashboard</Link>
        <Link style={linkStyle} to="/scan">Scan</Link>
        <Link style={linkStyle} to="/reports">Reports</Link>

        <a
          style={linkStyle}
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
        >
          Swagger-Docs
        </a>

        <a
          style={linkStyle}
          href="https://github.com/dbachu/AutoComplyAI"
          target="_blank"
          rel="noreferrer"
        >
          Code
        </a>
        <Link style={linkStyle} to="/architecture">Architecture</Link>
      </div>
    </nav>
  );
}

/* =========================
   STYLES
=========================*/

const navStyle = {
  background: "#0b3d91",
  color: "white",
  padding: "15px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const logoStyle = {
  fontSize: 18,
  fontWeight: "bold"
};

const linkContainer = {
  display: "flex",
  gap: 20
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: 14
};