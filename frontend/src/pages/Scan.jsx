import { useState } from "react";
import axios from "axios";

export default function Scan() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("rule");
  const [result, setResult] = useState(null);
  const [scanId, setScanId] = useState(null);

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/scan", null, {
        params: { text, mode }
      });

      setResult(res.data.report);
      setScanId(res.data.scan_id);
    } catch (err) {
      console.error("Scan failed:", err);
    }
  };

  /* ----------------------------
     SAMPLE LOADER
  -----------------------------*/

  const loadSample = () => {
    setText(`Urgent: Reset your password immediately.
Click this link: http://malicious-reset.com
Failure to comply within 24 hours will result in account suspension.`);
  };

  const loadLegitimateSample = () => {
  setText(`Hi Team,

Please find attached the updated Q4 performance report.
Let me know if you need any clarification.

Regards,
Finance Department`);
};

  /* ----------------------------
     EXPORTS
  -----------------------------*/

  const downloadJSON = () => {
    const blob = new Blob(
      [JSON.stringify(result, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.json";
    a.click();
  };

  const downloadCSV = () => {
    const csv = `Risk Score,${result.risk_score}
Confidence,${result.confidence}
Verdict,${result.verdict}
Mode,${result.mode}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };

  const downloadPDF = () => {
    window.open(`http://localhost:8000/export/pdf/${scanId}`, "_blank");
  };

  const getSeverity = () => {
    if (!result) return "";
    if (result.risk_score > 75) return "Critical";
    if (result.risk_score > 50) return "High";
    if (result.risk_score > 25) return "Medium";
    return "Low";
  };

  return (
    <div style={{ padding: 40, maxWidth: 1100, margin: "auto" }}>
      <h1>AI Threat Intelligence Console</h1>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="rule">Rule-Based</option>
        <option value="ml">ML-Based</option>
        <option value="hybrid">Hybrid</option>
        <option value="llm_mock">LLM Mock</option>
        <option value="openai">OpenAI</option>
      </select>

      <div style={{
  marginTop: 20,
  padding: 15,
  background: "#eef3fb",
  borderRadius: 8
}}>
  <strong>Detection Mode Explanation:</strong>
  <p style={{ marginTop: 5 }}>
    {mode === "rule" && "Uses deterministic heuristics and keyword rules."}
    {mode === "ml" && "Applies trained machine learning classification model - Base Paper."}
    {mode === "hybrid" && "Combines rule and ML engines for balanced detection accuracy."}
    {mode === "llm_mock" && "Simulates LLM-based reasoning for explainability demo."}
    {mode === "openai" && "Uses real OpenAI model for contextual threat intelligence analysis."}
  </p>
</div>

      <br /><br />

      <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
        <button onClick={loadSample}>
            Load Phishing Sample
        </button>

        <button onClick={loadLegitimateSample}>
            Load Legitimate Sample
        </button>
      </div>

      <textarea
        rows={6}
        style={{ width: "100%", padding: 15 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste suspicious email or message here..."
      />

      <br /><br />

      <button onClick={submit}>Run Detection</button>

      <div style={{
        marginTop: 30,
        padding: 20,
        background: "#f4f6f9",
        borderRadius: 10
        }}>
        <h3>Compliance Coverage Insight</h3>
        <p>
            AutoComplyAI automatically links detected threats to ISO27001 and NIST-CSF
            control requirements, providing real-time compliance intelligence and
            audit traceability for security governance.
        </p>
        </div>

      {result && (
        <div style={{ marginTop: 40 }}>

          <h2>
            Verdict:
            <span style={{
              marginLeft: 10,
              color: result.verdict === "phishing" ? "#d9534f" : "#5cb85c"
            }}>
              {result.verdict.toUpperCase()}
            </span>
          </h2>

          <p><strong>Severity:</strong> {getSeverity()}</p>
          <p><strong>Risk Score:</strong> {result.risk_score}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <p><strong>Mode:</strong> {result.mode}</p>

          <hr />

          <h3>Executive Summary</h3>
          <p>{result.executive_summary}</p>

          <hr />

          <h3>MITRE ATT&CK Mapping</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {result.mitre_mapping?.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "#f4f6f9",
                  padding: 10,
                  borderRadius: 6
                }}
              >
                {m}
              </div>
            ))}
          </div>

          <hr />

          <h3>Compliance Mapping</h3>
          <ul>
            {result.compliance_mapping?.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          <hr />

          <h3>Recommended Remediation</h3>
          <ul>
            {result.remediation?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <br />

          <button onClick={downloadJSON}>Export JSON</button>
          <button onClick={downloadCSV}>Export CSV</button>
          <button onClick={downloadPDF}>Export PDF</button>

        </div>
      )}
    </div>
  );
}