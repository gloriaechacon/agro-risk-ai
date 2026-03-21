type ResultScreenProps = {
  onViewEvolution?: () => void;
};

const riskValue = 78;

function getRiskLevel(value: number) {
  if (value >= 70) return "HIGH RISK";
  if (value >= 40) return "MEDIUM RISK";
  return "LOW RISK";
}

function getRiskColor(value: number) {
  if (value >= 70) return "#ef4444";
  if (value >= 40) return "#f59e0b";
  return "#10b981";
}

export default function ResultScreen({ onViewEvolution }: ResultScreenProps) {
  const riskLabel = getRiskLevel(riskValue);
  const riskColor = getRiskColor(riskValue);

  return (
    <div className="page">
      <div className="card result-card">
        <div className="icon-wrapper">
          <span className="icon">🌱</span>
        </div>

        <h1 className="title">Risk Analysis Result</h1>
        <p className="subtitle">Based on current climate conditions</p>

        <div className="gauge-section">
          <div
            className="gauge"
            style={
              {
                "--value": `${riskValue}`,
                "--risk-color": riskColor,
              } as React.CSSProperties
            }
          >
            <div className="gauge-inner">
              <div className="gauge-value">{riskValue}%</div>
              <div className="gauge-label" style={{ color: riskColor }}>
                {riskLabel}
              </div>
              <div className="gauge-note">High probability of pest outbreak</div>
            </div>
          </div>
        </div>

        <div className="trend-banner danger">
          <span className="trend-icon">↗</span>
          <span>Risk expected to peak in 3–5 days</span>
        </div>

        <div className="factors-grid">
          <div className="factor-card">
            <div className="factor-icon">🌡️</div>
            <div className="factor-title">Temperature</div>
            <div className="factor-value">29°C</div>
            <div className="factor-note">Above optimal threshold</div>
          </div>

          <div className="factor-card">
            <div className="factor-icon">💧</div>
            <div className="factor-title">Humidity</div>
            <div className="factor-value">71%</div>
            <div className="factor-note">High humidity</div>
          </div>

          <div className="factor-card">
            <div className="factor-icon">🌧️</div>
            <div className="factor-title">Rainfall</div>
            <div className="factor-value">12 mm</div>
            <div className="factor-note">Recent rainfall</div>
          </div>
        </div>

        <div className="cause-card">
          <div className="section-label">Primary Risk Driver</div>
          <div className="cause-text">High sustained temperature + humidity</div>
        </div>

        <div className="recommendations-card">
          <div className="recommendations-title">
            Recommended Actions (Next 3 Days)
          </div>

          <div className="recommendation-item">
            <span className="recommendation-icon">✅</span>
            <span>Apply preventive treatment within 72 hours</span>
          </div>

          <div className="recommendation-item">
            <span className="recommendation-icon">👁️</span>
            <span>Monitor crop every 48 hours</span>
          </div>

          <div className="recommendation-item">
            <span className="recommendation-icon">🕒</span>
            <span>Watch humidity trends closely</span>
          </div>
        </div>

        <div className="impact-card">
          <span className="impact-icon">⚠️</span>
          <span>Potential yield loss: 30–40% if no intervention is taken</span>
        </div>

        <div className="meta-grid">
          <div className="meta-item">
            <div className="meta-label">Confidence</div>
            <div className="meta-value">82%</div>
          </div>

          <div className="meta-item">
            <div className="meta-label">Data</div>
            <div className="meta-value">Real-time climate API</div>
          </div>

          <div className="meta-item">
            <div className="meta-label">Model</div>
            <div className="meta-value">AI risk model v2.3</div>
          </div>
        </div>

        <button className="submit-btn" onClick={onViewEvolution}>
          View Risk Evolution (7 Days)
        </button>
      </div>
    </div>
  );
}