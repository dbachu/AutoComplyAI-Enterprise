import { motion } from "framer-motion";
import { useState } from "react";

/* ----------------------------- */
/* SERVICE DATA                  */
/* ----------------------------- */

export default function Architecture() {
  const [activeBox, setActiveBox] = useState(null);

  const services = [
    {
      key: "frontend",
      title: "SOC Frontend",
      subtitle: "React + Vite Dashboard",
      sections: [
        {
          heading: "Capabilities",
          items: [
            "Security Operations Center (SOC) dashboard",
            "Threat feed and analytics visualizations",
            "Interactive risk charts and MITRE heatmaps",
            "Decision breakdown visualization",
            "AI agent reasoning timeline"
          ]
        },
        {
          heading: "Operational Value",
          items: [
            "Real-time threat visibility",
            "Interactive investigation workflows",
            "Executive security reporting",
            "SOC analyst productivity tools"
          ]
        }
      ]
    },
    {
      key: "backend",
      title: "FastAPI Backend",
      subtitle: "AI Security API Layer",
      sections: [
        {
          heading: "Core Responsibilities",
          items: [
            "Receives threat analysis requests",
            "Coordinates AI detection pipeline",
            "Generates structured incident reports",
            "Exposes REST endpoints to UI"
          ]
        },
        {
          heading: "Engineering Benefits",
          items: [
            "High-performance async API",
            "Scalable microservice foundation",
            "Clean separation of frontend and AI logic"
          ]
        }
      ]
    },
    {
      key: "orchestrator",
      title: "AI Agent Orchestrator",
      subtitle: "Multi-Agent Reasoning Engine",
      sections: [
        {
          heading: "AI Agent Pipeline",
          items: [
            "Detection Agent (Rule + ML + LLM)",
            "Threat Intelligence Agent",
            "MITRE Mapping Agent",
            "Compliance Mapping Agent",
            "Report Generation Agent"
          ]
        },
        {
          heading: "Intelligence Features",
          items: [
            "Hybrid ensemble decision engine",
            "Risk score aggregation",
            "Agent reasoning timeline generation",
            "Explainable AI detection workflow"
          ]
        }
      ]
    },
    {
      key: "engines",
      title: "Detection Engines",
      subtitle: "Rule | ML | LLM",
      sections: [
        {
          heading: "Detection Layers",
          items: [
            "Rule-based phishing heuristics",
            "Machine learning phishing classifier",
            "LLM contextual threat analysis",
            "Hybrid ensemble risk scoring"
          ]
        },
        {
          heading: "Security Advantages",
          items: [
            "Defense-in-depth detection",
            "Reduced false positives",
            "Context-aware threat detection",
            "Explainable AI decisions"
          ]
        }
      ]
    },
    {
      key: "intel",
      title: "Threat Intelligence",
      subtitle: "Indicator Enrichment",
      sections: [
        {
          heading: "Threat Analysis",
          items: [
            "URL extraction and analysis",
            "Phishing pattern recognition",
            "Domain entropy detection",
            "External threat indicator enrichment"
          ]
        }
      ]
    },
    {
      key: "mapper",
      title: "MITRE & Compliance",
      subtitle: "ATT&CK + Governance Mapping",
      sections: [
        {
          heading: "Security Intelligence",
          items: [
            "MITRE ATT&CK technique mapping",
            "ISO 27001 security control mapping",
            "NIST Cybersecurity Framework alignment",
            "GDPR security compliance indicators"
          ]
        }
      ]
    },
    {
      key: "db",
      title: "PostgreSQL",
      subtitle: "Security Data Platform",
      sections: [
        {
          heading: "Stored Intelligence",
          items: [
            "Threat detection results",
            "Risk scores and classifications",
            "MITRE and compliance mappings",
            "Detection metadata and logs"
          ]
        }
      ]
    },
    {
      key: "infra",
      title: "Container Infrastructure",
      subtitle: "Podman Deployment",
      sections: [
        {
          heading: "Deployment Architecture",
          items: [
            "Podman containerized services",
            "Backend API container",
            "Frontend dashboard container",
            "PostgreSQL database container"
          ]
        }
      ]
    }
  ];

  return (
    <div style={{ padding: "60px 40px", maxWidth: 1400, margin: "auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, textAlign: "center" }}>
        System (AI Enabled Intelligence) Architecture
      </h1>

      <p style={{ marginTop: 15, fontSize: 20, color: "#555", textAlign: "center" }}>
        Real-time AI pipeline demonstrating detection flow,
        orchestration logic, and compliance intelligence mapping.
      </p>

      {/* FLOW CONTAINER */}

      <div style={{ marginTop: 90 }}>

        {/* FIRST ROW */}

        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {services.slice(0, 4).map((service, index) => (
            <div key={service.key} style={{ display: "flex", alignItems: "center" }}>
              <ServiceBox service={service} onClick={() => setActiveBox(service)} />
              {index < 3 && <DataStream />}
            </div>
          ))}
        </div>

        {/* SECOND ROW */}

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
          {services.slice(4).map((service, index) => (
            <div key={service.key} style={{ display: "flex", alignItems: "center" }}>
              <ServiceBox service={service} onClick={() => setActiveBox(service)} />
              {index < services.slice(4).length - 1 && <DataStream />}
            </div>
          ))}
        </div>

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
            borderRadius: 20,
            maxWidth: 900,
            margin: "auto",
            boxShadow: "0 15px 35px rgba(0,0,0,0.08)"
          }}
        >
          <h3 style={{ fontSize: 24, marginBottom: 20 }}>
            {activeBox.title}
          </h3>

          {activeBox.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>
                {section.heading}
              </div>

              <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}

      {/* ARCHITECTURE PRINCIPLES */}

      <div style={{ marginTop: 110, maxWidth: 1100, margin: "auto" }}>
        <h3 style={{ fontSize: 26, textAlign: "center", marginBottom: 40 }}>
          Architecture Principles
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 25
          }}
        >
          {[
            {
              title: "AI Detection Orchestration",
              desc: "Dynamic routing engine selects optimal detection strategy."
            },
            {
              title: "Defense-in-Depth",
              desc: "Rule + ML + LLM layered detection improves security accuracy."
            },
            {
              title: "Compliance-by-Design",
              desc: "Threat detections map automatically to MITRE, ISO and NIST."
            },
            {
              title: "API-First Architecture",
              desc: "Clear separation between UI, backend and AI engines."
            },
            {
              title: "Extensible Detection Engines",
              desc: "Detection models evolve independently."
            },
            {
              title: "Auditability",
              desc: "All scans stored with full traceability."
            },
            {
              title: "Cloud-Ready Containers",
              desc: "Podman enables portable enterprise deployments."
            },
            {
              title: "Multi-Agent AI Reasoning",
              desc: "Specialized AI agents collaborate for detection."
            }
          ].map((principle, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                background: "white",
                padding: 25,
                borderRadius: 14,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 10 }}>
                {principle.title}
              </div>

              <div style={{ color: "#555", lineHeight: 1.6 }}>
                {principle.desc}
              </div>
            </motion.div>
          ))}
        </div>
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
      whileHover={{ scale: 1.07, boxShadow: "0 18px 35px rgba(0,0,0,0.25)" }}
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
            borderRadius: 20
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
      <motion.div
        animate={{ x: [-40, 100] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        style={{
          position: "absolute",
          width: 30,
          height: 6,
          background: "white",
          opacity: 0.6
        }}
      />
    </div>
  );
}