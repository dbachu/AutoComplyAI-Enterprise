import { Card } from "@tremor/react";

export default function KPICards({metrics}) {

return (
<div className="grid grid-cols-4 gap-4">

<Card>
<h3>Total Scans</h3>
<p className="text-3xl">{metrics.total_scans}</p>
</Card>

<Card>
<h3>High Risk</h3>
<p className="text-3xl text-red-600">{metrics.high_risk_scans}</p>
</Card>

<Card>
<h3>Average Risk</h3>
<p className="text-3xl">{metrics.average_risk_score}</p>
</Card>

<Card>
<h3>Hybrid Mode</h3>
<p className="text-3xl">{metrics.scan_modes.hybrid}</p>
</Card>

</div>
)
}