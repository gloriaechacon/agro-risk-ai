type SimulationScreenProps = {
  onBack?: () => void;
  onRunAgain?: () => void;
};

const forecastData = [
  { day: "Mon", risk: 52 },
  { day: "Tue", risk: 61 },
  { day: "Wed", risk: 74 },
  { day: "Thu", risk: 86 },
  { day: "Fri", risk: 79 },
  { day: "Sat", risk: 68 },
  { day: "Sun", risk: 57 },
];

const withActionData = [
  { day: "Mon", risk: 52 },
  { day: "Tue", risk: 56 },
  { day: "Wed", risk: 60 },
  { day: "Thu", risk: 55 },
  { day: "Fri", risk: 49 },
  { day: "Sat", risk: 42 },
  { day: "Sun", risk: 37 },
];

function buildPoints(data: { day: string; risk: number }[]) {
  const width = 620;
  const height = 260;
  const paddingX = 28;
  const paddingY = 20;
  const maxRisk = 100;

  return data
    .map((item, index) => {
      const x =
        paddingX +
        (index * (width - paddingX * 2)) / (data.length - 1);
      const y =
        height - paddingY - (item.risk / maxRisk) * (height - paddingY * 2);
      return `${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(data: { day: string; risk: number }[]) {
  const width = 620;
  const height = 260;
  const paddingX = 28;
  const paddingY = 20;
  const maxRisk = 100;

  const points = data.map((item, index) => {
    const x =
      paddingX +
      (index * (width - paddingX * 2)) / (data.length - 1);
    const y =
      height - paddingY - (item.risk / maxRisk) * (height - paddingY * 2);
    return { x, y };
  });

  const first = points[0];
  const last = points[points.length - 1];

  return `
    M ${first.x} ${height - paddingY}
    L ${first.x} ${first.y}
    ${points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")}
    L ${last.x} ${height - paddingY}
    Z
  `;
}

export default function SimulationScreen({
  onBack,
  onRunAgain,
}: SimulationScreenProps) {
  const withoutActionPoints = buildPoints(forecastData);
  const withActionPoints = buildPoints(withActionData);

  const withoutActionArea = buildAreaPath(forecastData);
  const peakDay = "Thu";

  return (
    <div className="page">
      <div className="card simulation-card">
        <div className="icon-wrapper">
          <span className="icon">📈</span>
        </div>

        <h1 className="title">Risk Evolution</h1>
        <p className="subtitle">Next 7 days forecast</p>

        <div className="chart-card">
          <div className="chart-header-row">
            <div>
              <div className="section-label">7-Day Simulation</div>
              <div className="chart-title">Projected pest risk trajectory</div>
            </div>

            <div className="legend">
              <div className="legend-item">
                <span className="legend-dot red" />
                <span>Without action</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot green" />
                <span>With preventive action</span>
              </div>
            </div>
          </div>

          <div className="chart-wrapper">
            <div className="chart-y-labels">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="chart-main">
              <svg
                viewBox="0 0 620 260"
                className="risk-chart"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="riskAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(239,68,68,0.22)" />
                    <stop offset="100%" stopColor="rgba(239,68,68,0.02)" />
                  </linearGradient>
                </defs>

                <line x1="28" y1="20" x2="592" y2="20" className="grid-line" />
                <line x1="28" y1="75" x2="592" y2="75" className="grid-line" />
                <line x1="28" y1="130" x2="592" y2="130" className="grid-line" />
                <line x1="28" y1="185" x2="592" y2="185" className="grid-line" />
                <line x1="28" y1="240" x2="592" y2="240" className="grid-line" />

                <path d={withoutActionArea} fill="url(#riskAreaGradient)" />

                <polyline
                  points={withoutActionPoints}
                  fill="none"
                  className="chart-line red-line"
                />

                <polyline
                  points={withActionPoints}
                  fill="none"
                  className="chart-line green-line"
                />

                {forecastData.map((point, index) => {
                  const x = 28 + (index * (620 - 56)) / (forecastData.length - 1);
                  const y = 260 - 20 - (point.risk / 100) * (260 - 40);

                  return (
                    <circle
                      key={`red-${point.day}`}
                      cx={x}
                      cy={y}
                      r={point.day === peakDay ? 6 : 4}
                      className={point.day === peakDay ? "peak-point" : "red-point"}
                    />
                  );
                })}

                {withActionData.map((point, index) => {
                  const x =
                    28 + (index * (620 - 56)) / (withActionData.length - 1);
                  const y = 260 - 20 - (point.risk / 100) * (260 - 40);

                  return (
                    <circle
                      key={`green-${point.day}`}
                      cx={x}
                      cy={y}
                      r={4}
                      className="green-point"
                    />
                  );
                })}
              </svg>

              <div className="chart-x-labels">
                {forecastData.map((item) => (
                  <span key={item.day}>{item.day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="simulation-insight danger-soft">
          <span className="trend-icon">⚠️</span>
          <span>Risk is expected to peak on {peakDay} without intervention</span>
        </div>

        <div className="scenario-grid">
          <div className="scenario-card danger">
            <div className="section-label">Scenario A</div>
            <div className="scenario-title">Without action</div>
            <div className="scenario-value red-text">Peak risk: 86%</div>
            <div className="scenario-note">
              Conditions remain highly favorable for pest expansion.
            </div>
          </div>

          <div className="scenario-card success">
            <div className="section-label">Scenario B</div>
            <div className="scenario-title">With preventive action</div>
            <div className="scenario-value green-text">Peak risk: 60%</div>
            <div className="scenario-note">
              Preventive response reduces spread and stabilizes risk.
            </div>
          </div>
        </div>

        <div className="recommendations-card">
          <div className="recommendations-title">Simulation Insights</div>

          <div className="recommendation-item">
            <span className="recommendation-icon">📉</span>
            <span>Preventive action reduces projected peak risk by 26 points</span>
          </div>

          <div className="recommendation-item">
            <span className="recommendation-icon">💰</span>
            <span>Potential yield preserved: +25% compared to no intervention</span>
          </div>

          <div className="recommendation-item">
            <span className="recommendation-icon">🗓️</span>
            <span>Best intervention window: next 72 hours</span>
          </div>
        </div>

        <div className="meta-grid">
          <div className="meta-item">
            <div className="meta-label">Peak Day</div>
            <div className="meta-value">{peakDay}</div>
          </div>

          <div className="meta-item">
            <div className="meta-label">Reduction</div>
            <div className="meta-value">-35%</div>
          </div>

          <div className="meta-item">
            <div className="meta-label">Forecast</div>
            <div className="meta-value">7 Days</div>
          </div>
        </div>

        <div className="dual-actions">
          <button className="secondary-btn" onClick={onBack}>
            Back to Results
          </button>

          <button className="submit-btn" onClick={onRunAgain}>
            Run Another Prediction
          </button>
        </div>
      </div>
    </div>
  );
}