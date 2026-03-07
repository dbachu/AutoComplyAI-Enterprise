import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function RiskTrend({data}) {

return (
<LineChart width={500} height={300} data={data}>
<XAxis dataKey="date"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="average_risk"/>
</LineChart>
)

}