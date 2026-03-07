export default function AgentTimeline({ timeline }) {

  if (!timeline || timeline.length === 0) return null;

  return (

    <div
      style={{
        marginTop: 30,
        padding: 25,
        background: "#f9fafc",
        borderRadius: 10,
        border: "1px solid #e5e7eb"
      }}
    >

      <h3>AI Agent Reasoning Timeline</h3>

      {timeline.map((step, index) => (

        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 12
          }}
        >

          <div
            style={{
              width: 12,
              height: 12,
              background: "#0073c6",
              borderRadius: "50%",
              marginRight: 10
            }}
          />

          <strong style={{ marginRight: 10 }}>
            {step.agent}
          </strong>

          <span>
            {step.message}
          </span>

        </div>

      ))}

    </div>

  );

}