import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '@/lib/constants';

const MARQUEE_CONTENT = [
  'Brand Builder',
  '✦',
  'Marketing Operator',
  '✦',
  'Tunis, Tunisia',
  '✦',
  'Available for Remote Work',
  '✦',
  'Curious Builder',
  '✦',
  'Five Brands Built',
  '✦',
  'One Year In',
  '✦',
];

const FOOTER_STYLES = `
  @keyframes footer-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes footer-breathe {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
    100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
  }

  @keyframes footer-heartbeat {
    0%, 100% { transform: scale(1); }
    15%, 45% { transform: scale(1.3); }
    30% { transform: scale(1); }
  }

  .footer-marquee-track {
    animation: footer-marquee 35s linear infinite;
  }

  .footer-breathe {
    animation: footer-breathe 7s ease-in-out infinite alternate;
  }

  .footer-heartbeat {
    animation: footer-heartbeat 2s ease-in-out infinite;
  }

  .footer-glass-pill {
    background: linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%);
    border: 1px solid rgba(32,124,169,0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px -8px rgba(32,124,169,0.12), inset 0 1px 1px rgba(255,255,255,0.8);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .footer-glass-pill:hover {
    background: linear-gradient(145deg, rgba(32,124,169,0.12) 0%, rgba(32,124,169,0.06) 100%);
    border-color: rgba(32,124,169,0.35);
    box-shadow: 0 16px 48px -8px rgba(32,124,169,0.2), inset 0 1px 1px rgba(255,255,255,0.9);
    transform: translateY(-2px);
  }

  .footer-giant-text {
    font-size: 28vw;
    line-height: 0.75;
    font-weight: 900;
    letter-spacing: -0.05em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(32,124,169,0.08);
    background: linear-gradient(180deg, rgba(32,124,169,0.12) 0%, transparent 70%);
    -webkit-background-clip: text;
    background-clip: text;
    font-family: 'Outfit', sans-serif;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
  }

  .footer-bg-grid {
    background-size: 56px 56px;
    background-image:
      linear-gradient(to right, rgba(32,124,169,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(32,124,169,0.04) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  }

  .footer-linkedin-btn {
    background: linear-gradient(135deg, #207ca9 0%, #23296b 100%);
    box-shadow: 0 8px 32px rgba(32,124,169,0.35), 0 2px 8px rgba(35,41,107,0.2);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform-style: preserve-3d;
  }

  .footer-linkedin-btn:hover {
    box-shadow: 0 16px 48px rgba(32,124,169,0.45), 0 4px 16px rgba(35,41,107,0.3);
    transform: translateY(-3px) scale(1.02);
  }

  .footer-linkedin-btn:active {
    transform: translateY(0px) scale(0.98);
    box-shadow: 0 4px 16px rgba(32,124,169,0.3);
  }

  .footer-back-top {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .footer-back-top:hover {
    transform: translateY(-4px);
    border-color: #207ca9;
    color: #207ca9;
  }
`;

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const linkedinBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {

      // Giant text parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: '8vh', opacity: 0, scale: 0.92 },
        {
          y: '0vh',
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 90%',
            end: 'center center',
            scrub: 1.5,
          },
        }
      );

      // Heading staggered reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, autoAlpha: 0, filter: 'blur(12px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Sub text
      gsap.fromTo(
        subRef.current,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Actions
      gsap.fromTo(
        actionsRef.current,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Magnetic effect on LinkedIn button
      const btn = linkedinBtnRef.current;
      if (btn) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            duration: 0.5,
            ease: 'power2.out',
          });
        };
        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0, y: 0, rotationX: 0, rotationY: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
          });
        };
        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        return () => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        };
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeItems = [...MARQUEE_CONTENT, ...MARQUEE_CONTENT];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />

      {/* 
        CURTAIN REVEAL WRAPPER 
        Sits in normal document flow. The clip-path acts as a viewport window.
        The fixed footer beneath is revealed as the user scrolls into this wrapper.
      */}
      <div
        ref={wrapperRef}
        id="contact"
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        {/* FIXED FOOTER — stays at bottom of viewport, revealed through the clip */}
        <footer style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}>

          {/* Grid background */}
          <div className="footer-bg-grid" style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          {/* Aurora glow */}
          <div className="footer-breathe" style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '70vw',
            height: '55vh',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(32,124,169,0.1) 0%, rgba(35,41,107,0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          {/* Giant background DRISS text */}
          <div
            ref={giantTextRef}
            className="footer-giant-text"
            style={{
              position: 'absolute',
              bottom: '-4vh',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 0,
              width: '100%',
              textAlign: 'center',
            }}
          >
            DRISS
          </div>

          {/* ANGLED MARQUEE — diagonal sash across top of footer */}
          <div style={{
            position: 'absolute',
            top: '120px',
            left: '-5%',
            right: '-5%',
            zIndex: 10,
            transform: 'rotate(-3deg)',
            overflow: 'hidden',
            background: '#ffffff',
            padding: '18px 0',
            pointerEvents: 'none',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <div
              className="footer-marquee-track"
              style={{
                display: 'flex',
                width: 'max-content',
                alignItems: 'center',
                gap: '56px',
              }}
            >
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: item === '✦' ? 400 : 600,
                    letterSpacing: item === '✦' ? '0' : '0.2em',
                    color: item === '✦' ? '#207ca9' : '#0F0F0F',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* MAIN CENTER CONTENT */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '240px 32px 0',
            textAlign: 'center',
          }}>

            {/* Contact label */}
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}>
              Contact Me
            </div>

            {/* Main heading */}
            <h2
              ref={headingRef}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(40px, 7vw, 88px)',
                color: '#23296b',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                margin: '0 0 24px',
              }}
            >
              Ready to{' '}
              <span style={{ color: '#207ca9' }}>begin?</span>
            </h2>

            {/* Sub text */}
            <p
              ref={subRef}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: '#6B7280',
                maxWidth: '440px',
                lineHeight: 1.7,
                margin: '0 0 48px',
              }}
            >
              I'm available for remote work this summer. If you're building something and need someone who thinks before they execute — let's talk.
            </p>

            {/* Actions */}
            <div
              ref={actionsRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* LinkedIn CTA — magnetic button */}
              <a
                ref={linkedinBtnRef}
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-linkedin-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 40px',
                  borderRadius: '100px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Find me on LinkedIn ↗
              </a>

              {/* Email secondary */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#207ca9')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div style={{
            position: 'relative',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px clamp(24px, 5vw, 64px) 48px',
            borderTop: '1px solid #E5E7EB',
          }}>

            {/* Copyright */}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: '#9CA3AF',
              textTransform: 'uppercase',
            }}>
              © 2026 Mohammed Yessin Driss
            </span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="footer-back-top"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '100px',
                border: '1px solid #E5E7EB',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#9CA3AF',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
            </button>
          </div>

        </footer>
      </div>
    </>
  );
}
