import { useEffect, useState } from "react";
import axios from "axios";
import ThreatFeed from "../components/ThreatFeed";

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
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

const COLORS = ["#0073c6", "#70e3a0", "#e89851", "#b98ecb", "#e74c3c"];

export default function Dashboard() {

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const interval = setInterval(fetchData, 4000);

    return () => clearInterval(interval);

  }, []);

  const total = scans.length;

  const phishing = scans.filter(s => s.verdict === "phishing").length;

  const legitimate = scans.filter(s => s.verdict === "legitimate").length;

  const avgRisk =
    total > 0
      ? Math.round(scans.reduce((sum, s) => sum + s.risk_score, 0) / total)
      : 0;

  const verdictData = [
    { name: "Phishing", value: phishing },
    { name: "Legitimate", value: legitimate }
  ];

  const modeCounts = ["rule", "ml", "hybrid", "llm_mock", "openai"].map(mode => ({
    name: mode.toUpperCase(),
    value: scans.filter(s => s.mode === mode).length
  }));

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

  const trendData = scans.map(s => ({
    id: s.id,
    risk: s.risk_score
  }));

  if (loading) {
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  return (

    <div style={{ padding: 40, maxWidth: 1400, margin: "auto" }}>

      <h1>AutoComplyAI Enterprise Security Command Center</h1>

      {/* KPI CARDS */}

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>

        <Card title="Total Scans" value={total} />
        <Card title="Phishing Detected" value={phishing} />
        <Card title="Legitimate" value={legitimate} />
        <Card title="Average Risk Score" value={avgRisk} />

      </div>

      {/* TOP GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 30,
          marginTop: 40
        }}
      >

        <Panel title="Risk Score Trend">

          <ResponsiveContainer width="100%" height={320}>

            <LineChart data={trendData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="id" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#0072C6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </Panel>

        <ThreatFeed />

      </div>

      {/* DONUT CHARTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 50
        }}
      >

        <Panel title="Verdict Distribution">

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={verdictData}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >

                {verdictData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>

              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />

            </PieChart>
          </ResponsiveContainer>

        </Panel>

        <Panel title="Detection Mode Distribution">

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={modeCounts}
                dataKey="value"
                innerRadius={50}
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

      </div>

      {/* MITRE ATTACK */}

      <div style={{ marginTop: 60 }}>

        <Panel title="MITRE ATT&CK Technique Distribution">

          <ResponsiveContainer width="100%" height={420}>

            <BarChart data={mitreData}>

              <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="value" fill="#0072C6" />

            </BarChart>

          </ResponsiveContainer>

        </Panel>

      </div>

      {/* RECENT ACTIVITY */}

      <div style={{ marginTop: 60 }}>

        <h2>Recent Scan Activity</h2>

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

            {scans.slice().reverse().slice(0,10).map(scan => (

              <tr key={scan.id}>

                <td style={td}>{scan.id}</td>

                <td style={td}>
                  <span
                    style={{
                      color:
                        scan.verdict === "phishing"
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

/* COMPONENTS */

function Card({ title, value }) {

  return (

    <div
      style={{
        flex: 1,
        padding: 25,
        background: "white",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}
    >

      <h4 style={{ color:"#666" }}>{title}</h4>

      <h1 style={{ color:"#0073c6" }}>{value}</h1>

    </div>

  );

}

function Panel({ title, children }) {

  return (

    <div
      style={{
        background: "white",
        padding: 25,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

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