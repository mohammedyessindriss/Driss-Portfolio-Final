import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '@/lib/constants';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set('.cta-headline', { autoAlpha: 0, y: 24, filter: 'blur(12px)' });
    gsap.set('.cta-sub', { autoAlpha: 0, y: 16 });
    gsap.set('.cta-actions', { autoAlpha: 0, y: 12 });

    const t = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to('.cta-headline', {
          autoAlpha: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power2.out',
        });
        gsap.to('.cta-sub', {
          autoAlpha: 1, y: 0,
          duration: 0.7, delay: 0.3, ease: 'power2.out',
        });
        gsap.to('.cta-actions', {
          autoAlpha: 1, y: 0,
          duration: 0.6, delay: 0.5, ease: 'power2.out',
        });
      },
    });

    return () => t.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="now"
      style={{
        background: '#ffffff',
        padding: 'clamp(80px, 10vw, 140px) clamp(32px, 6vw, 96px)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* Top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 'clamp(32px, 6vw, 96px)',
        right: 'clamp(32px, 6vw, 96px)',
        height: '1px',
        background: '#E5E7EB',
      }} />

      {/* NOW label */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.3em',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: '40px',
      }}>
        Now
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2
          className="cta-headline"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#23296b',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
          }}
        >
          Building something?{' '}
          <span style={{ color: '#207ca9' }}>Let's talk.</span>
        </h2>

        <p
          className="cta-sub"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: '#6B7280',
            lineHeight: 1.75,
            margin: '0 0 40px',
          }}
        >
          I'm available for remote work this summer whether you're a startup
          that needs someone to own the marketing, or a team looking for a
          junior operator who thinks before they execute.
        </p>

        <div
          className="cta-actions"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: '#207ca9',
              color: '#ffffff',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '100px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#23296b';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#207ca9';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Find me on LinkedIn ↗
          </a>

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

      {/* Footer line */}
      <div style={{
        marginTop: 'clamp(64px, 8vw, 100px)',
        paddingTop: '32px',
        borderTop: '1px solid #E5E7EB',
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        color: '#9CA3AF',
        letterSpacing: '0.1em',
      }}>
        © 2026 Mohammed Yessin Driss
      </div>
    </section>
  );
}
