import './ProgressCircle.css';

export default function ProgressCircle({
  value = 0,
  size = 120,
  strokeWidth = 10,
  color = 'var(--color-primary)',
  trackColor = 'var(--color-border-light)',
  label = '',
  unit = '%',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-circle-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-circle-ring"
        />
      </svg>
      <div className="progress-circle-text">
        <span className="progress-circle-value">
          {value}<span className="progress-circle-unit">{unit}</span>
        </span>
        {label && <span className="progress-circle-label">{label}</span>}
      </div>
    </div>
  );
}
