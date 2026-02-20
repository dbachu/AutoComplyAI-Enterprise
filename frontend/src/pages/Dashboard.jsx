import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const COLORS = ["#0073c6", "#70e3a0", "#e89851", "#b98ecb", "#e74c3c"];

export default function Dashboard() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =============================
     FETCH DATA
  ==============================*/

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/scans");
      setScans(res.data);
    } catch (err) {
      console.error("Failed to fetch scans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =============================
     MITRE FREQUENCY
  ==============================*/

  const mitreFrequency = {};

  scans.forEach(scan => {
    try {
      const techniques = JSON.parse(scan.mitre_mapping || "[]");
      techniques.forEach(t => {
        mitreFrequency[t] = (mitreFrequency[t] || 0) + 1;
      });
    } catch {}
  });

  const mitreData = Object.entries(mitreFrequency).map(([name, value]) => ({
    name,
    value
  }));

  /* =============================
     METRICS
  ==============================*/

  const total = scans.length;
  const phishing = scans.filter(s => s.verdict === "phishing").length;
  const legitimate = scans.filter(s => s.verdict === "legitimate").length;

  const avgRisk =
    total > 0
      ? Math.round(scans.reduce((sum, s) => sum + s.risk_score, 0) / total)
      : 0;

  const modeCounts = ["rule", "ml", "hybrid", "llm_mock", "openai"].map(mode => ({
    name: mode.toUpperCase(),
    value: scans.filter(s => s.mode === mode).length
  }));

  const trendData = scans.map(s => ({
    id: s.id,
    risk: s.risk_score
  }));

  const executiveNarrative =
    phishing > 0
      ? `System detected ${phishing} phishing attempts across ${total} scans. Average risk score is ${avgRisk}. Immediate review recommended.`
      : `No phishing detected across ${total} scans. Monitoring continues.`;

  /* =============================
     LOADING STATE
  ==============================*/

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 1300, margin: "auto" }}>
      <h1>Executive Security Intelligence Dashboard</h1>

      {/* ABOUT SECTION */}
      <div style={{
        marginTop: 20,
        padding: 20,
        background: "#eef3fb",
        borderRadius: 10
      }}>
        <h3>About AutoComplyAI</h3>
        <p>
          Multi-agent AI-driven phishing detection and compliance intelligence platform
          combining rule-based heuristics, ML ensemble detection and LLM reasoning.
        </p>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        <Card title="Total Scans" value={total} />
        <Card title="Phishing Detected" value={phishing} />
        <Card title="Legitimate" value={legitimate} />
        <Card title="Average Risk Score" value={avgRisk} />
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: 30, marginTop: 50 }}>

        <Panel title="Detection Mode Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={modeCounts}
                dataKey="value"
                outerRadius={90}
                label
              >
                {modeCounts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Risk Score Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#0072C6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* MITRE DONUT */}
      <div
        style={{
          marginTop: 60,
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}
      >
        <h2>MITRE ATT&CK Technique Distribution</h2>

        {mitreData.length === 0 ? (
          <p>No MITRE mappings available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                key={mitreData.length}
                data={mitreData}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                animationDuration={1200}
              >
                {mitreData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}

        <p style={{ marginTop: 20, color: "#555" }}>
          Visualization of adversary techniques mapped to MITRE ATT&CK framework.
        </p>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div style={{
        marginTop: 60,
        padding: 25,
        background: "#f4f6f9",
        borderRadius: 10
      }}>
        <h3>Executive Summary</h3>
        <p>{executiveNarrative}</p>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ marginTop: 60 }}>
        <h2>Recent Scan Activity</h2>

        {scans.length === 0 && (
          <p>No scan data available yet.</p>
        )}

        <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f4f6f9" }}>
              <th style={th}>ID</th>
              <th style={th}>Verdict</th>
              <th style={th}>Risk</th>
              <th style={th}>Mode</th>
              <th style={th}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {scans.slice().reverse().map(scan => (
              <tr key={scan.id}>
                <td style={td}>{scan.id}</td>
                <td style={td}>
                  <span
                    style={{
                      color: scan.verdict === "phishing"
                        ? "#d9534f"
                        : "#2ECC71",
                      fontWeight: "bold"
                    }}
                  >
                    {scan.verdict}
                  </span>
                </td>
                <td style={td}>{scan.risk_score}</td>
                <td style={td}>{scan.mode}</td>
                <td style={td}>
                  {new Date(scan.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Card({ title, value }) {
  return (
    <div style={{
      flex: 1,
      padding: 25,
      background: "white",
      borderRadius: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <h4 style={{ margin: 0, color: "#777" }}>{title}</h4>
      <h2 style={{ marginTop: 10 }}>{value}</h2>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{
      flex: 1,
      background: "white",
      padding: 25,
      borderRadius: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const th = {
  padding: 12,
  textAlign: "left",
  borderBottom: "1px solid #ddd"
};

const td = {
  padding: 12,
  borderBottom: "1px solid #eee"
};