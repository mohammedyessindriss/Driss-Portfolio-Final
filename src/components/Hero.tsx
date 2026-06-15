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

    // INITIAL STATES
    gsap.set('.hero-line-1', { autoAlpha: 0, filter: 'blur(20px)', scale: 1.02 });
    gsap.set('.hero-line-2', { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)', filter: 'blur(8px)' });
    gsap.set('.hero-sub', { autoAlpha: 0, y: 16 });
    gsap.set('.hero-scroll-indicator', { autoAlpha: 0 });
    gsap.set('.hero-availability', { autoAlpha: 0, y: 10 });
    gsap.set('.hero-card', { yPercent: 110, autoAlpha: 0 });
    gsap.set(cardRef.current, { scale: 1, transformOrigin: 'center center' });
    gsap.set('.card-photo', { autoAlpha: 0, x: -30 });
    gsap.set('.card-metrics', { autoAlpha: 0, y: 30 });
    gsap.set('.card-info', { autoAlpha: 0, x: 30 });
    gsap.set('.hero-cta', { autoAlpha: 0, y: 20, visibility: 'visible' });

    // ENTRANCE TIMELINE — total duration approximately 4 seconds
    const entranceTl = gsap.timeline({ delay: 0.5 });

    entranceTl
      // "Hi. I'm Yessin —" blurs in slowly over 1.8 seconds
      .to('.hero-line-1', {
        autoAlpha: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
      })
      // After line 1 finishes, "a marketing student..." sweeps left to right
      .to('.hero-line-2', {
        autoAlpha: 1,
        clipPath: 'inset(0 0% 0 0)',
        filter: 'blur(0px)',
        duration: 0.75,
        ease: 'power3.inOut',
      }, '-=0.05')
      // Subheading fades up
      .to('.hero-sub', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')
      // Availability badge
      .to('.hero-availability', {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.1')
      // Scroll indicator
      .to('.hero-scroll-indicator', {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.1');

    // SCROLL TIMELINE — pinned sequence
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1600',
        pin: true,
        scrub: 0.5,
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
        scale: 0.88,
        borderRadius: '32px',
        duration: 1.4,
        ease: 'expo.inOut',
      }, 7.1)
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
        scale: 0.7,
        yPercent: -30,
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
        <div className="hero-availability" style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #E5E7EB',
            borderRadius: '100px',
            paddingLeft: '8px',
            paddingRight: '12px',
            paddingTop: '5px',
            paddingBottom: '5px',
            background: '#ffffff',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#207ca9',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
            }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4m7-3a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1m-2 10a.75.75 0 0 1 .728.568.97.97 0 0 0 .704.704.75.75 0 0 1 0 1.456.97.97 0 0 0-.704.704.75.75 0 0 1-1.456 0 .97.97 0 0 0-.704-.704.75.75 0 0 1 0-1.456.97.97 0 0 0 .704-.704A.75.75 0 0 1 10 11" fill="#207ca9"/>
              </svg>
              Available for remote work
            </span>
            <span style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1' }}>•</span>
            <a
              href="https://www.linkedin.com/in/medyessin-driss/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#6B7280',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#207ca9')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            >
              Tunis, Tunisia
              <svg style={{ marginTop: '1px' }} width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
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
            <div className="card-photo" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: '16px',
            }}>
              <div style={{
                width: '80%',
                aspectRatio: '3/4',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
                {/* Photo placeholder — replace src with real photo later */}
                <img
                  src="/photo.jpg"
                  alt="Mohammed Yessin Driss"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                  onError={e => {
                    // Fallback if photo not found
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Fallback placeholder shown when no photo */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                }}>
                  [ Photo ]
                </div>

                {/* LinkedIn hover overlay */}
                <a
                  href="https://www.linkedin.com/in/medyessin-driss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-linkedin-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(32,124,169,0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    borderRadius: '12px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                  }}>
                    Connect on LinkedIn
                  </span>
                </a>
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
              justifyContent: 'center',
              gap: '32px',
            }}>
              {/* Category tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Brand Launch', 'B2B Marketing', 'SaaS Growth', 'Community & Ads'].map((tag, i) => (
                  <div
                    key={tag}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid rgba(255,255,255,0.25)',
                      borderRadius: '100px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '0.08em',
                      display: 'inline-block',
                      width: 'fit-content',
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(8px)',
                      animation: `pulse-dot ${2 + i * 0.3}s ease-in-out infinite`,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* Available indicator — below the tags */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '100px',
                paddingLeft: '8px',
                paddingRight: '12px',
                paddingTop: '5px',
                paddingBottom: '5px',
                background: 'rgba(255,255,255,0.06)',
                width: 'fit-content',
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4m7-3a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1m-2 10a.75.75 0 0 1 .728.568.97.97 0 0 0 .704.704.75.75 0 0 1 0 1.456.97.97 0 0 0-.704.704.75.75 0 0 1-1.456 0 .97.97 0 0 0-.704-.704.75.75 0 0 1 0-1.456.97.97 0 0 0 .704-.704A.75.75 0 0 1 10 11" fill="#4ade80"/>
                  </svg>
                  Open to remote work
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', lineHeight: '1' }}>•</span>
                <a
                  href="https://www.linkedin.com/in/medyessin-driss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  Connect
                  <svg style={{ marginTop: '1px' }} width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
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
