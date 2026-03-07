import { useState } from "react";
import axios from "axios";
import DecisionBreakdown from "../components/DecisionBreakdown";
import AgentTimeline from "../components/AgentTimeline";

export default function Scan() {

  const [text, setText] = useState("");
  const [mode, setMode] = useState("rule");
  const [result, setResult] = useState(null);
  const [scanId, setScanId] = useState(null);

  /* =============================
     RUN SCAN
  ==============================*/

const submit = async () => {

  try {

    const res = await axios.post(
      "http://localhost:8000/scan",
      {
        text: text,
        mode: mode
      }
    );

    const fullResult = {
      ...res.data.report,
      decision_breakdown: res.data.decision_breakdown,
      agent_timeline: res.data.agent_timeline
    };

    setResult(fullResult);
    setScanId(res.data.scan_id);

  } catch (err) {

    console.error("Scan failed:", err);

  }

};

  /* =============================
     SAMPLE DATA LOADERS
  ==============================*/

  const loadPhishingSample = () => {

    setText(`Urgent: Reset your password immediately.
Click this link: http://malicious-reset.com
Failure to comply within 24 hours will result in account suspension.`);

  };

  const loadLegitimateSample = () => {

    setText(`Hi Team,

Please review the updated Q4 performance report attached.

Let me know if there are any questions.

Regards,
Finance Department`);

  };

  const loadBankPhishSample = () => {

    setText(`Security Alert from Bank of America

We detected unusual activity on your account.
Please verify your credentials immediately:

http://secure-bank-verification-login.com

Failure to verify may result in account lock.`);

  };

  const clearText = () => {

    setText("");
    setResult(null);

  };

  /* =============================
     EXPORT FUNCTIONS
  ==============================*/

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

    window.open(
      `http://localhost:8000/export/pdf/${scanId}`,
      "_blank"
    );

  };

  /* =============================
     SEVERITY LEVEL
  ==============================*/

  const getSeverity = () => {

    if (!result) return "";

    if (result.risk_score > 75) return "Critical";

    if (result.risk_score > 50) return "High";

    if (result.risk_score > 25) return "Medium";

    return "Low";

  };

  /* =============================
     UI
  ==============================*/

  return (

    <div style={{ padding: 40, maxWidth: 1100, margin: "auto" }}>

      <h1>AI Threat Intelligence Scanner</h1>

      {/* MODE SELECT */}

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >

        <option value="rule">Rule-Based</option>

        <option value="ml">ML-Based</option>

        <option value="llm_model">LLM Model (AI)</option>

        <option value="llm_mock">LLM Mock</option>

        <option value="openai">OpenAI Intelligence</option>

        <option value="hybrid">Hybrid Detection</option>

      </select>

      {/* SAMPLE BUTTONS */}

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>

        <button onClick={loadPhishingSample}>
          Load Phishing Sample
        </button>

        <button onClick={loadLegitimateSample}>
          Load Legitimate Sample
        </button>

        <button onClick={loadBankPhishSample}>
          Load Banking Phish
        </button>

        <button onClick={clearText}>
          Clear
        </button>

      </div>

      {/* INPUT TEXT AREA */}

      <textarea
        rows={7}
        style={{
          width: "100%",
          padding: 15,
          marginTop: 20
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste suspicious email or message..."
      />

      {/* RUN BUTTON */}

      <br /><br />

      <button
        onClick={submit}
        style={{
          padding: "10px 20px",
          fontSize: 16
        }}
      >

        Run Detection

      </button>

      {/* RESULT PANEL */}

      {result && (

        <div
          style={{
            marginTop: 40,
            padding: 25,
            background: "#f4f6f9",
            borderRadius: 10
          }}
        >

          <h2>

            Verdict:

            <span
              style={{
                marginLeft: 10,
                color:
                  result.verdict === "phishing"
                    ? "#d9534f"
                    : "#5cb85c"
              }}
            >

              {result.verdict.toUpperCase()}

            </span>

          </h2>
          {result?.decision_breakdown &&
          Object.keys(result.decision_breakdown).length > 0 && (
            <DecisionBreakdown
              data={result.decision_breakdown}
            />
          )}

          <p><strong>Severity:</strong> {getSeverity()}</p>

          <p><strong>Risk Score:</strong> {result.risk_score}</p>

          <p><strong>Confidence:</strong> {result.confidence}</p>

          <p><strong>Mode:</strong> {result.mode}</p>

          <hr />

          {result?.agent_timeline && (

              <AgentTimeline
                timeline={result.agent_timeline}
              />

            )}

          <h3>Executive Summary</h3>

          <p>{result.executive_summary}</p>

          <hr />

          <h3>MITRE ATT&CK Mapping</h3>

          {result.mitre_mapping?.map((m, i) => (
            <div key={i}>{m}</div>
          ))}

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