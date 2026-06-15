import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VisualWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set('.visual-work-title', { autoAlpha: 0, filter: 'blur(16px)', y: 12 });
    gsap.set('.visual-work-subtitle', { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });

    const titleTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to('.visual-work-title', {
          autoAlpha: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
        });
        gsap.to('.visual-work-subtitle', {
          autoAlpha: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.inOut',
        });
      },
      onLeaveBack: () => {
        gsap.set('.visual-work-title', { autoAlpha: 0, filter: 'blur(16px)', y: 12 });
        gsap.set('.visual-work-subtitle', { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });
      },
    });

    return () => {
      titleTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FAFAF9',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(32px, 4vw, 64px)',
        paddingTop: 'clamp(88px, 8vw, 112px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
      }}
    >
      {/* Top-right gradient glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at top right, rgba(32,124,169,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Bottom-left gradient glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at bottom left, rgba(32,124,169,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* TOP ROW */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '48px',
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'rgba(32,124,169,0.45)',
          textTransform: 'uppercase',
        }}>
          05 · Creative
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: 'rgba(32,124,169,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Social Media · 1080 × 1350
        </span>
      </div>

      {/* CENTERED TITLE */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        marginBottom: '48px',
      }}>
        <h2 className="visual-work-title" style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          lineHeight: 0.9,
          color: '#207ca9',
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          The Visual Work
        </h2>
        <p className="visual-work-subtitle" style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: '#6B7280',
          marginTop: '16px',
          maxWidth: '480px',
          margin: '16px auto 0',
          lineHeight: 1.65,
        }}>
          Designs, campaigns, and creative executions across multiple brands and platforms.
        </p>
      </div>

      {/* 3x3 IMAGE GRID */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        flex: 1,
      }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <a
            key={index}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              aspectRatio: '1080 / 1350',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'block',
              cursor: 'pointer',
              border: '1px solid rgba(32,124,169,0.12)',
              background: 'rgba(32,124,169,0.04)',
              textDecoration: 'none',
            }}
          >
            {/* Animated gradient */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at ${20 + (index % 3) * 30}% ${30 + Math.floor(index / 3) * 20}%, rgba(32,124,169,0.15) 0%, transparent 60%),
                radial-gradient(circle at ${80 - (index % 3) * 20}% ${70 - Math.floor(index / 3) * 15}%, rgba(35,41,107,0.1) 0%, transparent 50%)
              `,
              animation: `floatGradient${index % 3} ${4 + (index % 3)}s ease-in-out infinite alternate`,
            }} />

            {/* Grid lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundSize: '24px 24px',
              backgroundImage: `
                linear-gradient(to right, rgba(32,124,169,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(32,124,169,0.05) 1px, transparent 1px)
              `,
            }} />

            {/* Corner number */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '12px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'rgba(32,124,169,0.25)',
            }}>
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Center label */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(32,124,169,0.15)"
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
                color: 'rgba(32,124,169,0.2)',
                textTransform: 'uppercase',
              }}>
                1080 × 1350
              </div>
            </div>

            {/* Hover overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(32,124,169,0.85)',
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
                View design
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* BOTTOM LINE */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: '#E5E7EB',
      }} />
    </section>
  );
}
