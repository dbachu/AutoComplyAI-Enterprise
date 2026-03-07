import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function DecisionBreakdown({ data }) {

  if (!data) return null;

  const chartData = [
    {
      name: "Rule Engine",
      score: data.rule_engine || 0
    },
    {
      name: "ML Model",
      score: data.ml_model || 0
    },
    {
      name: "LLM Model",
      score: data.llm_model || 0
    },
    {
      name: "Final",
      score: data.hybrid_final || data.weighted_score || 0
    }
  ];

  return (
    <div style={{ marginTop: 30 }}>

      <h3>AI Decision Breakdown</h3>

      <ResponsiveContainer width="100%" height={260}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Bar
            dataKey="score"
            fill="#0072C6"
            radius={[6,6,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}