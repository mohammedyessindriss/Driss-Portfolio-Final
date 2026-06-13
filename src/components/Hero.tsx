import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // const isMobile = window.innerWidth < 768; // Removed as it is not actively used in animation logic yet

    // INITIAL STATES — set before any animation
    gsap.set('.hero-line-1', { autoAlpha: 0, y: 40 });
    gsap.set('.hero-line-2', { autoAlpha: 0, y: 40 });
    gsap.set('.hero-sub', { autoAlpha: 0, y: 24 });
    gsap.set('.hero-scroll-indicator', { autoAlpha: 0 });
    gsap.set('.hero-card', { yPercent: 110, autoAlpha: 0 });
    gsap.set('.card-photo', { autoAlpha: 0, x: -30 });
    gsap.set('.card-metrics', { autoAlpha: 0, y: 30 });
    gsap.set('.card-info', { autoAlpha: 0, x: 30 });
    gsap.set('.hero-cta', { autoAlpha: 0, y: 20, visibility: 'visible' });

    // ENTRANCE TIMELINE — plays on load, no scroll trigger
    const entranceTl = gsap.timeline({ delay: 0.3 });
    entranceTl
      .to('.hero-line-1', {
        autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out'
      })
      .to('.hero-line-2', {
        autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out'
      }, '-=0.6')
      .to('.hero-sub', {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out'
      }, '-=0.4')
      .to('.hero-scroll-indicator', {
        autoAlpha: 1, duration: 0.5, ease: 'power2.out'
      }, '-=0.2');

    // SCROLL TIMELINE — pinned sequence
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=5000',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    scrollTl
      // Phase 1: Hero text fades and blurs out, card rises
      .to('.hero-text-wrapper', {
        autoAlpha: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0)
      .to('.hero-grid', {
        autoAlpha: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, 0)
      .to('.hero-card', {
        yPercent: 0,
        autoAlpha: 1,
        duration: 2,
        ease: 'power3.inOut',
      }, 0.3)

      // Phase 2: Card expands to full screen
      .to(cardRef.current, {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        borderRadius: '0px',
        duration: 1.5,
        ease: 'power3.inOut',
      }, 1.8)

      // Phase 3: Card content animates in
      .to('.card-photo', {
        autoAlpha: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 2.8)
      .to('.card-metrics', {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 3.0)
      .to('.card-info', {
        autoAlpha: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 3.2)

      // Phase 4: Hold — visitor reads the card
      .to({}, { duration: 2 }, 4.0)

      // Phase 5: Card content exits
      .to(['.card-photo', '.card-metrics', '.card-info'], {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power2.in',
        stagger: 0.05,
      }, 6.0)

      // Phase 6: Card pulls back, CTA appears
      .to(cardRef.current, {
        width: '88vw',
        height: '88vh',
        maxWidth: '1100px',
        borderRadius: '32px',
        duration: 1.5,
        ease: 'power3.inOut',
      }, 6.8)
      .to('.hero-cta', {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 7.2)

      // Phase 7: Hold on CTA
      .to({}, { duration: 1.5 }, 8.4)

      // Phase 8: Everything exits upward, hero unpins
      .to('.hero-card', {
        yPercent: -110,
        autoAlpha: 0,
        duration: 1.5,
        ease: 'power3.in',
      }, 9.9)
      .to('.hero-cta', {
        yPercent: -80,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power3.in',
      }, 9.9);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAF9',
      }}
    >
      <div
        className="hero-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(to right, rgba(32,124,169,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(32,124,169,0.04) 1px, transparent 1px)
          `,
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="hero-text-wrapper"
        style={{
          position: 'absolute',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '0 24px',
        }}
      >
        <div style={{
          marginBottom: '28px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          border: '1px solid rgba(32,124,169,0.2)',
          borderRadius: '100px',
          background: 'rgba(32,124,169,0.06)',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#207ca9',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '11px',
            color: '#207ca9',
            letterSpacing: '0.08em',
          }}>
            Available for remote work · Tunis, Tunisia
          </span>
        </div>

        <h1
          className="hero-line-1"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.9,
            color: '#207ca9',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Hi. I'm Yessin —
        </h1>
        <h1
          className="hero-line-2"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.9,
            color: '#23296b',
            margin: '8px 0 0 0',
            letterSpacing: '-0.02em',
          }}
        >
          a marketing student who builds brands for real.
        </h1>

        <p
          className="hero-sub"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#6B7280',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginTop: '28px',
          }}
        >
          Sophomore at Tunis Business School. One year in, five brands built, results documented.
        </p>

        <div
          className="hero-scroll-indicator"
          style={{
            marginTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#9CA3AF',
            textTransform: 'uppercase',
          }}>
            scroll to explore
          </span>
          <div style={{
            width: '1.5px',
            height: '24px',
            background: 'rgba(32,124,169,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '50%',
              background: '#207ca9',
              animation: 'scrollLineMove 1.5s linear infinite',
            }} />
          </div>
        </div>
      </div>

      <div
        className="hero-card"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: '88vw',
            height: '88vh',
            maxWidth: '1100px',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #23296b 0%, #207ca9 100%)',
            boxShadow: '0 40px 100px rgba(32,124,169,0.3), 0 8px 32px rgba(35,41,107,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            position: 'relative',
            pointerEvents: 'auto',
          }}
        >
          <div 
            className="flex flex-col md:grid h-full p-8 overflow-y-auto md:overflow-visible"
            style={{
              gap: '32px',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
              padding: 'auto md:48px'
            }}
          >
            <div className="card-photo" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
              }}>
                [ Photo ]
              </div>
            </div>

            <div className="card-metrics" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '32px',
              paddingTop: '8px',
            }}>
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  Marketing Operator
                </p>
                <h2 style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  color: '#ffffff',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                }}>
                  M. Y.<br />DRISS
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                {[
                  { value: '717%', label: 'LinkedIn impression growth' },
                  { value: '0→2,500', label: 'TikTok followers built from zero' },
                  { value: '100', label: 'Paying students. First cohort. No ad spend.' },
                ].map((metric, i) => (
                  <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                    <div style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(24px, 3vw, 36px)',
                      color: '#ffffff',
                      lineHeight: 1,
                    }}>
                      {metric.value}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.6)',
                      marginTop: '4px',
                      lineHeight: 1.4,
                    }}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-info" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: '24px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                {['Brand Launch', 'B2B Marketing', 'SaaS Growth', 'Community & Ads'].map(tag => (
                  <div key={tag} style={{
                    padding: '8px 16px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '100px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.05em',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}>
                    {tag}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  display: 'inline-block',
                  marginRight: '8px',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.08em',
                }}>
                  Open to remote work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-cta"
        style={{
          position: 'absolute',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '0 24px',
          visibility: 'hidden',
        }}
      >
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(36px, 6vw, 72px)',
          color: '#ffffff',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginBottom: '24px',
        }}>
          Start the dissection.
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '400px',
          lineHeight: 1.7,
          marginBottom: '40px',
        }}>
          Five brands. One year. Results documented layer by layer.
        </p>
        <a
          href="#work"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            color: '#23296b',
            background: '#ffffff',
            padding: '14px 32px',
            borderRadius: '100px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Explore the work ↓
        </a>
      </div>
    </div>
  );
}
