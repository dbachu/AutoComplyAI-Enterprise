import { motion } from "framer-motion";
import { useState } from "react";

export default function Architecture() {
  const [activeBox, setActiveBox] = useState(null);

  const services = [
    {
      title: "Frontend (React + Vite)",
      desc: "User interface layer providing dashboards, analytics, and reporting."
    },
    {
      title: "FastAPI Backend",
      desc: "REST API layer handling scan requests and orchestration."
    },
    {
      title: "Agent Orchestrator",
      desc: "Selects detection engine (Rule, ML, Hybrid, LLM/OpenAI)."
    },
    {
      title: "Detection Engines",
      desc: "Rule Engine, ML Classifier, LLM-based semantic analysis."
    },
    {
      title: "Compliance & MITRE Mapper",
      desc: "Maps threats to MITRE ATT&CK and ISO/NIST compliance controls."
    },
    {
      title: "PostgreSQL Database",
      desc: "Persistent storage for scans, reports, mappings, and audit data."
    }
  ];

  return (
    <div style={{ padding: 40, maxWidth: 1300, margin: "auto" }}>
      <h1>System Architecture</h1>

      <p style={{ marginTop: 20 }}>
        AutoComplyAI follows a modular microservice-inspired architecture
        enabling scalable AI-driven threat detection and compliance intelligence.
      </p>

      {/* FLOW CONTAINER */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 60,
          gap: 20
        }}
      >
        {services.map((service, index) => (
          <>
            <Box
              key={service.title}
              title={service.title}
              onClick={() => setActiveBox(service)}
            />

            {index < services.length - 1 && <FlowArrow key={index} />}
          </>
        ))}
      </motion.div>

      {/* ACTIVE DETAIL PANEL */}
      {activeBox && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: 50,
            padding: 25,
            background: "#eef3fb",
            borderRadius: 12
          }}
        >
          <h3>{activeBox.title}</h3>
          <p>{activeBox.desc}</p>
        </motion.div>
      )}

      {/* PRINCIPLES */}
      <div style={{
        marginTop: 60,
        padding: 25,
        background: "#f4f6f9",
        borderRadius: 12
      }}>
        <h3>Architecture Principles</h3>
        <ul>
          <li>Separation of concerns</li>
          <li>Pluggable AI detection engines</li>
          <li>API-first backend design</li>
          <li>Compliance-aware threat intelligence</li>
          <li>Containerized deployment (Podman/Docker)</li>
        </ul>
      </div>
    </div>
  );
}

/* ================= BOX ================= */

function Box({ title, onClick }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      style={{
        background: "white",
        padding: 25,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        width: 220,
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <strong>{title}</strong>
    </motion.div>
  );
}

/* ================= FLOW ARROW WITH PARTICLE ================= */

function FlowArrow() {
  return (
    <div style={{ position: "relative", fontSize: 28 }}>
      →
      <motion.div
        animate={{ x: [0, 30, 60] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          width: 6,
          height: 6,
          background: "#0072C6",
          borderRadius: "50%"
        }}
      />
    </div>
  );
}