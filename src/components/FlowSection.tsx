import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Metric {
  value: string;
  label: string;
}

interface FlowSectionProps {
  heading?: string;
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
  creatives: { img: string; href: string }[];
}

export default function FlowSection({
  heading,
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
  creatives,
}: FlowSectionProps) {
  const mutedColor = isLight ? 'rgba(15,15,15,0.45)' : 'rgba(255,255,255,0.5)';
  const metricBg = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)';
  const accentColor = isLight ? '#207ca9' : 'rgba(255,255,255,0.9)';

  useEffect(() => {
    const inner = document.querySelector('.flow-section-heading-inner');
    if (!inner) return;
    gsap.set(inner, { yPercent: 100, autoAlpha: 0 });
    const trigger = ScrollTrigger.create({
      trigger: '.flow-section-heading',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(inner, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        gsap.set(inner, { yPercent: 100, autoAlpha: 0 });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      data-flow-section
      style={{
        position: 'relative',
        minHeight: '200vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="flow-inner"
        style={{
          position: 'relative',
          minHeight: '200vh',
          width: '100%',
          backgroundColor,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: 'clamp(16px, 4vw, 64px)',
          paddingTop: 'clamp(72px, 8vw, 112px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: '32px',
        }}>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 10vw, 10rem)',
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
              gap: 'clamp(16px, 4vw, 32px)',
              marginTop: '8px',
              flexWrap: 'wrap' as const,
            }}
          >
            {heading && (
              <div style={{
                width: '100%',
                margin: '24px 0 28px',
                overflow: 'hidden',
              }}>
                <div
                  className="flow-section-heading"
                  style={{ overflow: 'hidden', display: 'inline-block' }}
                >
                  <span
                    className="flow-section-heading-inner"
                    style={{
                      display: 'block',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(22px, 3vw, 38px)',
                      color: '#207ca9',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      paddingBottom: '4px',
                      borderBottom: '2px solid rgba(32,124,169,0.2)',
                      paddingRight: '16px',
                    }}
                  >
                    {heading}
                  </span>
                </div>
              </div>
            )}
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
            width: '100%',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch' as const,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginTop: '24px',
              width: '100%',
            }}>
            {creatives.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 'clamp(240px, 30vw, 380px)',
                margin: '0 auto',
                width: '100%',
              }}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '480px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'block',
                    cursor: 'pointer',
                    border: `1px solid ${borderColor}`,
                    textDecoration: 'none',
                    flexShrink: 0,
                  }}
                >
                  {/* Real image */}
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={`Creative ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        display: 'block',
                        position: 'absolute',
                        inset: 0,
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: isLight ? 'rgba(32,124,169,0.05)' : 'rgba(255,255,255,0.05)',
                      display: 'block',
                      position: 'absolute',
                      inset: 0,
                    }} />
                  )}

                  {/* Premium color overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isLight
                      ? 'linear-gradient(180deg, rgba(32,124,169,0.08) 0%, rgba(35,41,107,0.22) 100%)'
                      : 'linear-gradient(180deg, rgba(35,41,107,0.1) 0%, rgba(0,0,0,0.35) 100%)',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }} />

                  {/* Subtle vignette for depth */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.18) 100%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }} />

                  {/* Hover overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isLight ? 'rgba(32,124,169,0.88)' : 'rgba(0,0,0,0.75)',
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
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
                {/* Social engagement icons bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                }}>
                  {/* Left icons: heart, comment, send */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Heart */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isLight ? 'rgba(15,15,15,0.5)' : 'rgba(255,255,255,0.5)'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {/* Comment bubble */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isLight ? 'rgba(15,15,15,0.5)' : 'rgba(255,255,255,0.5)'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {/* Send/Share */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isLight ? 'rgba(15,15,15,0.5)' : 'rgba(255,255,255,0.5)'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </div>
                  {/* Right icon: bookmark */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLight ? 'rgba(15,15,15,0.5)' : 'rgba(255,255,255,0.5)'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              </div>
            ))}
            </div>
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
