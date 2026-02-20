import { motion } from "framer-motion";
import { useState } from "react";

export default function Architecture() {
  const [activeBox, setActiveBox] = useState(null);

  const services = [
    {
      key: "frontend",
      title: "Frontend",
      subtitle: "React + Vite",
      desc: "Interactive SOC dashboard with analytics, exports and threat visibility."
    },
    {
      key: "backend",
      title: "FastAPI Backend",
      subtitle: "REST API Layer",
      desc: "Handles scan requests, orchestration and report generation."
    },
    {
      key: "orchestrator",
      title: "Agent Orchestrator",
      subtitle: "AI Routing Engine",
      desc: "Dynamically selects best detection engine based on risk signals."
    },
    {
      key: "engines",
      title: "Detection Engines",
      subtitle: "Rule | ML | LLM",
      desc: "Multi-layer detection stack providing hybrid intelligence."
    },
    {
      key: "mapper",
      title: "MITRE & Compliance",
      subtitle: "ISO / NIST Mapping",
      desc: "Maps threats to ATT&CK techniques and compliance controls."
    },
    {
      key: "db",
      title: "PostgreSQL",
      subtitle: "Persistence Layer",
      desc: "Stores scans, risk scores, mappings and audit logs."
    }
  ];

  return (
    <div style={{ padding: "60px 40px", maxWidth: 1400, margin: "auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 700 }}>
        System (AI Enabled Intelligence) Architecture
      </h1>

      <p style={{ marginTop: 15, fontSize: 20, color: "#555", maxWidth: 700 }}>
        Real-time AI pipeline demonstrating detection flow, orchestration logic,
        and compliance intelligence mapping.
      </p>

      {/* FLOW CONTAINER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          marginTop: 90
        }}
      >
        {services.map((service, index) => (
          <div
            key={service.key}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ServiceBox
              service={service}
              onClick={() => setActiveBox(service)}
            />
            {index < services.length - 1 && <DataStream />}
          </div>
        ))}
      </div>

      {/* DETAIL PANEL */}
      {activeBox && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: 80,
            padding: 40,
            background: "#eef3fb",
            borderRadius: 16,
            maxWidth: 900,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <h3 style={{ fontSize: 22 }}>{activeBox.title}</h3>
          <p style={{ marginTop: 15, fontSize: 18, lineHeight: 1.6 }}>
            {activeBox.desc}
          </p>
        </motion.div>
      )}

      {/* PRINCIPLES */}
      <div
        style={{
          marginTop: 100,
          padding: 40,
          background: "#f4f6f9",
          borderRadius: 16,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <h3 style={{ fontSize: 22 }}>Architecture Principles</h3>
        <ul style={{ marginTop: 15, lineHeight: 1.8 }}>
          <li>AI-driven detection orchestration</li>
          <li>Compliance-aware threat intelligence mapping</li>
          <li>Pluggable detection engines</li>
          <li>API-first scalable backend</li>
          <li>Containerized deployment (Podman/Docker)</li>
        </ul>
      </div>
    </div>
  );
}

/* SERVICE BOX */

function ServiceBox({ service, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.07,
        boxShadow: "0 18px 35px rgba(0,0,0,0.18)"
      }}
      onClick={onClick}
      style={{
        background: "white",
        padding: 35,
        borderRadius: 18,
        width: 230,
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>
        {service.title}
      </div>

      <div style={{ fontSize: 18, color: "#777", marginTop: 6 }}>
        {service.subtitle}
      </div>

      {service.key === "orchestrator" && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            marginTop: 12,
            fontSize: 12,
            background: "#0072C6",
            color: "white",
            padding: "6px 10px",
            borderRadius: 20,
            display: "inline-block"
          }}
        >
          AI Decision Engine
        </motion.div>
      )}
    </motion.div>
  );
}

/* DATA STREAM */

function DataStream() {
  return (
    <div
      style={{
        position: "relative",
        width: 80,
        height: 6,
        margin: "0 20px",
        background: "linear-gradient(90deg,#0072C6,#00c6ff)",
        borderRadius: 6,
        overflow: "hidden"
      }}
    >
      {/* White glow animation */}
      <motion.div
        animate={{ x: [-40, 100] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        style={{
          position: "absolute",
          top: 0,
          width: 30,
          height: 6,
          background: "white",
          opacity: 0.6
        }}
      />

      {/* 🔴 Red Threat Particle */}
      <motion.div
        animate={{ x: [-10, 90] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        style={{
          position: "absolute",
          top: -3,
          width: 12,
          height: 12,
          background: "#E74C3C",
          borderRadius: "50%",
          boxShadow: "0 0 8px rgba(231,76,60,0.8)"
        }}
      />
    </div>
  );
}