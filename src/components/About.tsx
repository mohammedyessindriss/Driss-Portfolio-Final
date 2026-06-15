import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '@/lib/constants';

const SOFTWARE = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Premiere Pro',
  'Adobe Firefly',
  'Canva',
  'CapCut',
  'WordPress',
  'Framer',
  'Google Analytics',
  'Meta Business Suite',
  'Google Looker Studio',
  'Notion',
  'Asana',
];

const CURRENTLY = [
  'Building this portfolio',
  'Studying business strategy at TBS',
  'Open to remote marketing roles',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  const paragraphText = "I'm drawn to problems that don't have obvious answers. How do you build an audience with no following? How do you position a startup nobody has heard of? I've been working through those questions in real organizations since my first year of university. I'm still asking them.";

  const paragraphWords = paragraphText.split(' ');

  const highlightedWords = [
    'problems', 'obvious', 'answers', 'audience',
    'position', 'startup', 'organizations', 'university'
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Vertical cut reveal for paragraph
    if (paragraphRef.current) {
      const inners = paragraphRef.current.querySelectorAll<HTMLElement>('.vcr-inner');
      
      gsap.set(inners, { yPercent: 100 });

      const vcrTrigger = ScrollTrigger.create({
        trigger: paragraphRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(inners, {
            yPercent: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: {
              amount: 0.8,
              from: 'start',
            },
          });
        },
        onLeaveBack: () => {
          gsap.set(inners, { yPercent: 100 });
        },
      });
      triggers.push(vcrTrigger);
    }

    // Animate left column elements
    const leftElements = sectionRef.current.querySelectorAll('.about-left-item');
    leftElements.forEach((el, i) => {
      gsap.set(el, { autoAlpha: 0, y: 20, filter: 'blur(8px)' });
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.set(el, { autoAlpha: 0, y: 20, filter: 'blur(8px)' });
        },
      });
      triggers.push(t);
    });

    // Animate right column items
    const rightElements = sectionRef.current.querySelectorAll('.about-right-item');
    rightElements.forEach((el, i) => {
      gsap.set(el, { autoAlpha: 0, x: 20 });
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.set(el, { autoAlpha: 0, x: 20 });
        },
      });
      triggers.push(t);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: '#FAFAF9',
        padding: 'clamp(40px, 4vw, 60px) clamp(32px, 5vw, 80px)',
        position: 'relative',
      }}
    >
      {/* Subtle top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 'clamp(32px, 6vw, 96px)',
        right: 'clamp(32px, 6vw, 96px)',
        height: '1px',
        background: '#E5E7EB',
      }} />

      {/* Top-left gradient glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(ellipse 70% 60% at top left, rgba(32,124,169,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Bottom-right gradient glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(ellipse 70% 60% at bottom right, rgba(32,124,169,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Section label */}
      <div className="about-left-item" style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.3em',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: '32px',
      }}>
        About
      </div>

      {/* Two column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'clamp(48px, 8vw, 120px)',
        alignItems: 'start',
      }}>

        {/* CENTERED PARAGRAPH with vertical cut reveal */}
        <div
          ref={paragraphRef}
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '100%',
            margin: '0 0 40px',
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(21px, 2.5vw, 28px)',
            color: '#0F0F0F',
            lineHeight: 1.75,
            margin: 0,
          }}>
            {paragraphWords.map((word, i) => (
              <span
                key={i}
                className="vcr-word"
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  marginRight: '0.28em',
                }}
              >
                <span
                  className="vcr-inner"
                  style={{
                    display: 'inline-block',
                    fontWeight: highlightedWords.includes(word.replace(/[^a-zA-Z]/g, '').toLowerCase()) ? 700 : 500,
                    color: highlightedWords.includes(word.replace(/[^a-zA-Z]/g, '').toLowerCase()) ? '#207ca9' : '#0F0F0F',
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* TWO COLUMN — info below paragraph */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>

          {/* LEFT — Education, Languages, Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div className="about-left-item">
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3em',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Education
              </div>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: '22px',
                color: '#207ca9',
                marginBottom: '6px',
              }}>
                Tunis Business School
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#6B7280',
                lineHeight: 1.6,
              }}>
                BSc Business Administration · Sophomore
              </div>
            </div>

            <div className="about-left-item">
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3em',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Languages
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '17px',
                color: '#6B7280',
                letterSpacing: '0.04em',
              }}>
                Arabic · French · English
              </div>
            </div>

            <div className="about-left-item">
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3em',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Tools & Software
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                {SOFTWARE.map(tool => (
                  <span
                    key={tool}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#6B7280',
                      padding: '7px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '100px',
                      background: '#ffffff',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#207ca9';
                      e.currentTarget.style.color = '#207ca9';
                      e.currentTarget.style.background = 'rgba(32,124,169,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.color = '#6B7280';
                      e.currentTarget.style.background = '#ffffff';
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Currently + Quote */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            <div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3em',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Currently
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {CURRENTLY.map((item, i) => (
                  <div
                    key={i}
                    className="about-right-item"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '18px',
                      color: '#6B7280',
                      lineHeight: 1.6,
                      paddingLeft: '16px',
                      borderLeft: '2px solid #E5E7EB',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="about-right-item" style={{
              borderLeft: '2px solid #207ca9',
              paddingLeft: '20px',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '16px',
                color: '#6B7280',
                lineHeight: 1.75,
                margin: 0,
                fontStyle: 'italic',
              }}>
                "The learning happens in production, not just in textbooks."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
