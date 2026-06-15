interface Metric {
  value: string;
  label: string;
}

interface FlowSectionProps {
  number: string;
  title: string;
  role: string;
  period: string;
  category: string;
  tagline: string;
  metrics: Metric[];
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  isLight: boolean;
}

export default function FlowSection({
  number,
  title,
  role,
  period,
  category,
  tagline,
  metrics,
  backgroundColor,
  textColor,
  borderColor,
  isLight,
}: FlowSectionProps) {
  const mutedColor = isLight ? 'rgba(15,15,15,0.45)' : 'rgba(255,255,255,0.5)';
  const metricBg = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)';
  const accentColor = isLight ? '#207ca9' : 'rgba(255,255,255,0.9)';

  return (
    <section
      data-flow-section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="flow-inner"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          backgroundColor,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(32px, 4vw, 64px)',
          paddingTop: 'clamp(88px, 8vw, 112px)',
          willChange: 'transform',
          transformOrigin: 'bottom left',
        }}
      >
        {/* TOP ROW */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: mutedColor,
            textTransform: 'uppercase',
          }}>
            {number} · {category}
          </span>
          <div style={{
            textAlign: 'right',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: mutedColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {role}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: mutedColor,
              marginTop: '4px',
            }}>
              {period}
            </div>
          </div>
        </div>

        {/* CENTER — TITLE */}
        <div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            lineHeight: 0.88,
            color: accentColor,
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: mutedColor,
            maxWidth: '520px',
            lineHeight: 1.65,
            marginTop: '20px',
          }}>
            {tagline}
          </p>

          {/* KEY METRICS */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '28px',
              flexWrap: 'wrap',
            }}
          >
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="flow-metric-item"
                style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
              >
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  color: textColor,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '11px',
                  color: mutedColor,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div style={{
            width: '100%',
            height: '1px',
            background: borderColor,
            marginTop: '28px',
            marginBottom: '24px',
          }} />

          {/* CREATIVE WORK PREVIEWS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '32px',
          }}>
            {[0, 1, 2].map((index) => (
              <a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`work-preview-${index}`}
                style={{
                  position: 'relative',
                  aspectRatio: '1080 / 1350',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'block',
                  cursor: 'pointer',
                  border: `1px solid ${borderColor}`,
                  background: isLight
                    ? 'rgba(32,124,169,0.06)'
                    : 'rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                }}
              >
                {/* Animated background pattern */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: isLight
                    ? `radial-gradient(circle at ${20 + index * 30}% ${30 + index * 20}%, rgba(32,124,169,0.15) 0%, transparent 60%),
                       radial-gradient(circle at ${80 - index * 20}% ${70 - index * 15}%, rgba(35,41,107,0.1) 0%, transparent 50%)`
                    : `radial-gradient(circle at ${20 + index * 30}% ${30 + index * 20}%, rgba(255,255,255,0.1) 0%, transparent 60%),
                       radial-gradient(circle at ${80 - index * 20}% ${70 - index * 15}%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
                  animation: `floatGradient${index} ${4 + index}s ease-in-out infinite alternate`,
                }} />

                {/* Grid lines decoration */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundSize: '24px 24px',
                  backgroundImage: isLight
                    ? `linear-gradient(to right, rgba(32,124,169,0.06) 1px, transparent 1px),
                       linear-gradient(to bottom, rgba(32,124,169,0.06) 1px, transparent 1px)`
                    : `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                       linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                }} />

                {/* Corner number */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '12px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: isLight ? 'rgba(32,124,169,0.4)' : 'rgba(255,255,255,0.25)',
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Center icon */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    color: isLight ? 'rgba(32,124,169,0.3)' : 'rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                  }}>
                    {['THE WORK', 'CREATIVE', 'CAMPAIGN'][index]}
                  </div>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLight ? 'rgba(32,124,169,0.2)' : 'rgba(255,255,255,0.15)'}
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    color: isLight ? 'rgba(32,124,169,0.2)' : 'rgba(255,255,255,0.15)',
                    textTransform: 'uppercase',
                  }}>
                    1080 × 1350
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className="preview-hover"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isLight
                      ? 'rgba(32,124,169,0.88)'
                      : 'rgba(0,0,0,0.75)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    borderRadius: '10px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '11px',
                    color: '#ffffff',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    View post
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* THIN BOTTOM LINE */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: borderColor,
        }} />
      </div>
    </section>
  );
}
