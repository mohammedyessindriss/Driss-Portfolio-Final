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
        width: '80%',
        margin: '0 auto',
      }}>
        {[
          { img: 'https://i.ibb.co/ZpBXyJLH/Screenshot-2026-06-17-013608.png', href: 'https://www.linkedin.com/posts/kamka_the-architecture-activity-7471184583817023489-WbQD', clickable: true },
          { img: 'https://i.ibb.co/b5FvzWnD/Screenshot-2026-06-17-013714.png', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7470037072959922176', clickable: true },
          { img: 'https://i.ibb.co/Rp3tsBLh/Screenshot-2026-06-17-013800.png', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7468964911960711169', clickable: true },
          { img: 'https://i.ibb.co/tPX4bHPK/10th-Post-Kamka.png', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7463166787321278464', clickable: true },
          { img: 'https://i.ibb.co/fVz3qDCC/Screenshot-2026-06-17-014020.png', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7460705580635164673', clickable: true },
          { img: 'https://i.ibb.co/Vcb7y1MD/Screenshot-2026-06-17-014116.png', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7454816699846967296', clickable: true },
          { img: 'https://i.ibb.co/VpNwYXhH/Screenshot-2026-06-17-014202.png', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7447206616883519488', clickable: true },
          { img: 'https://i.ibb.co/Y4WF4gwW/Screenshot-2026-06-17-014402.png', href: '#', clickable: false },
          { img: 'https://i.ibb.co/zHWg5W8w/image.jpg', href: '#', clickable: false },
        ].map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href={item.clickable ? item.href : undefined}
              target={item.clickable ? '_blank' : undefined}
              rel={item.clickable ? 'noopener noreferrer' : undefined}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1080 / 1350',
                height: 'auto',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'block',
                cursor: item.clickable ? 'pointer' : 'default',
                border: '1px solid rgba(32,124,169,0.12)',
                textDecoration: 'none',
              }}
            >
              <img
                src={item.img}
                alt={`Visual work ${index + 1}`}
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
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(160deg, rgba(32,124,169,0.12) 0%, rgba(35,41,107,0.22) 100%)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
                zIndex: 1,
              }} />
              {item.clickable && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(32,124,169,0.88)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    borderRadius: '10px',
                    zIndex: 2,
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
              )}
            </a>
            {/* Instagram icon strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 4px',
              borderTop: '1px solid rgba(32,124,169,0.12)',
            }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
          </div>
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
