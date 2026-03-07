import { useEffect, useState } from "react";
import axios from "axios";

export default function ThreatFeed() {

  const [events, setEvents] = useState([]);

  const fetchFeed = async () => {

    try {

      const res = await axios.get("http://localhost:8000/scans");

      const latest = res.data
        .slice()
        .reverse()
        .slice(0, 20);

      setEvents(latest);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {

    fetchFeed();

    const interval = setInterval(fetchFeed, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div
      style={{
        background: "#0c0c0c",
        color: "#00ff9f",
        padding: 20,
        borderRadius: 10,
        fontFamily: "monospace",
        height: 350,
        overflowY: "scroll"
      }}
    >

      <h3 style={{ color: "white" }}>
        Live Threat Feed
      </h3>

      {events.map((e) => (

        <div key={e.id} style={{ marginBottom: 8 }}>

          [{new Date(e.created_at).toLocaleTimeString()}]
          {" "}
          Scan #{e.id}
          {" "}
          Risk:{e.risk_score}
          {" "}
          Verdict:{e.verdict}

        </div>

      ))}

    </div>

  );

}