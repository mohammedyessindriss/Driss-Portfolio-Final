import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SoftwareItem {
  name: string;
  slug?: string;
  color?: string;
  customIcon?: string;
}

const SOFTWARE_ITEMS: SoftwareItem[] = [
  { name: 'Adobe Photoshop', customIcon: 'https://img.icons8.com/color/48/adobe-photoshop.png' },
  { name: 'Adobe Illustrator', customIcon: 'https://img.icons8.com/color/48/adobe-illustrator.png' },
  { name: 'Adobe Premiere Pro', customIcon: 'https://img.icons8.com/color/48/adobe-premiere-pro.png' },
  { name: 'Adobe Firefly', customIcon: 'https://img.icons8.com/?size=96&id=kZfsMn1p0gYK&format=png' },
  { name: 'Canva', customIcon: 'https://img.icons8.com/color/48/canva.png' },
  { name: 'CapCut', customIcon: 'https://www.google.com/s2/favicons?domain=capcut.com&sz=128' },
  { name: 'WordPress', slug: 'wordpress', color: '21759B' },
  { name: 'Framer', slug: 'framer', color: 'FFFFFF' },
  { name: 'Google Analytics', slug: 'googleanalytics', color: 'E37400' },
  { name: 'Meta Business Suite', slug: 'meta', color: '1877F2' },
  { name: 'Google Looker Studio', slug: 'google', color: '4285F4' },
  { name: 'Notion', slug: 'notion', color: 'FFFFFF' },
  { name: 'Asana', slug: 'asana', color: 'F06A6A' },
];

const CURRENTLY = [
  'Building this portfolio',
  'Studying business strategy at TBS',
  'Open to remote marketing roles',
];

const paragraphText = "I'm drawn to problems that don't have obvious answers. How do you build an audience with no following? How do you position a startup nobody has heard of? I've been working through those questions in real organizations since my first year of university. I'm still asking them.";
const paragraphWords = paragraphText.split(' ');
const highlightedWords = ['problems', 'obvious', 'answers', 'audience', 'position', 'startup', 'organizations', 'university'];

const GlassPill = ({ children, className, style }: any) => (
  <div className={className} style={{
    padding: '14px 26px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1.5px solid rgba(255, 255, 255, 0.22)',
    borderRadius: '100px',
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    whiteSpace: 'nowrap',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    ...style
  }}>
    {children}
  </div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // INITIAL STATES
    gsap.set('.hero-line-1', { autoAlpha: 0, filter: 'blur(20px)', scale: 1.02 });
    gsap.set('.hero-line-2', { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)', filter: 'blur(8px)' });
    gsap.set('.hero-sub', { autoAlpha: 0, y: 16 });
    gsap.set('.hero-scroll-indicator', { autoAlpha: 0 });
    gsap.set('.hero-availability', { autoAlpha: 0, y: 10 });
    gsap.set('.hero-card', { yPercent: 110, autoAlpha: 0 });
    gsap.set(cardRef.current, { scale: 1, transformOrigin: 'center center' });
    
    gsap.set('.card-bg-text', { autoAlpha: 0, scale: 0.95 });
    gsap.set('.card-photo-wrapper', { autoAlpha: 0, y: 40 });
    gsap.set(['.card-float-1', '.card-float-2', '.card-float-3', '.card-float-4', '.card-float-5'], { autoAlpha: 0, scale: 0.5 });
    gsap.set('.vcr-inner', { yPercent: 100 });
    gsap.set('.about-anim-fade', { autoAlpha: 0, y: 30 });
    gsap.set('.hero-cta', { autoAlpha: 0, y: 20, visibility: 'visible' });
    gsap.set('.hero-gradient', { autoAlpha: 0 });

    // ENTRANCE TIMELINE
    const entranceTl = gsap.timeline({ delay: 0.5 });

    entranceTl
      .to('.hero-line-1', { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'power2.out' })
      .to('.hero-line-2', { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)', duration: 0.75, ease: 'power3.inOut' }, '-=0.05')
      .to('.hero-gradient', { autoAlpha: 1, duration: 2, ease: 'power1.inOut' }, '<')
      .to('.hero-sub', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .to('.hero-availability', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      .to('.hero-scroll-indicator', { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1');

    // SCROLL TIMELINE (total card scroll track spans 300vh inside the panel)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3500',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      }
    });

    scrollTl
      // Phase 1 (0 to 1.5): Exit initial Hero greeting text
      .to('.hero-text-wrapper', { autoAlpha: 0, scale: 1.05, filter: 'blur(8px)', duration: 1.5, ease: 'power2.inOut' }, 0)
      .to('.hero-grid', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 0)
      
      // Phase 2 (0.3 to 2.3): Hero Card rises majestically from bottom
      .to('.hero-card', { yPercent: 0, autoAlpha: 1, duration: 2, ease: 'power3.inOut' }, 0.3)
      
      // Phase 2.5 (2.0 to 3.5): Card expands to fill the entire browser viewport
      .to(cardRef.current, { width: '100%', height: '100%', maxWidth: 'none', borderRadius: '0px', duration: 1.5, ease: 'power3.inOut' }, 2.0)

      // Phase 3 (3.0 to 4.5): Cinematic entrance animations for Slide 1 Content
      .to('.card-bg-text', { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, 3.0)
      .to('.card-photo-wrapper', { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 3.2)
      .to(['.card-float-1', '.card-float-2', '.card-float-3', '.card-float-4', '.card-float-5'], {
         autoAlpha: 1,
         scale: 1,
         duration: 0.8,
         ease: 'back.out(1.5)',
         stagger: 0.1
      }, 3.4)

      // Slide 1 static hold to view
      .to({}, { duration: 2.0 }, 4.5)

      // Phase 4 (6.5 to 8.0): Scroll Track shifts to Slide 2 (Paragraph block)
      .to('.card-scroll-track', {
         yPercent: -33.333,
         duration: 2.0,
         ease: 'power2.inOut',
      }, 6.5)

      // Phase 4.5 (7.5 to 9.0): Words in Slide 2 rise up sequentially
      .to('.vcr-inner', {
         yPercent: 0,
         duration: 1.2,
         stagger: 0.04,
         ease: 'power2.out',
      }, 7.5)

      // Slide 2 static hold to read
      .to({}, { duration: 2.0 }, 9.0)

      // Phase 5 (11.0 to 12.5): Scroll Track shifts to Slide 3 (Metadata Bento grid)
      .to('.card-scroll-track', {
         yPercent: -66.666,
         duration: 2.0,
         ease: 'power2.inOut',
      }, 11.0)

      // Phase 5.5 (12.0 to 13.5): Metadata elements fade up staggeredly
      .to('.about-anim-fade', {
         autoAlpha: 1,
         y: 0,
         duration: 1.2,
         stagger: 0.08,
         ease: 'power2.out',
      }, 12.0)

      // Slide 3 static hold to read details
      .to({}, { duration: 2.0 }, 13.5)

      // Phase 6 (15.5 to 16.5): Exit contents of Slide 3
      .to('.card-scroll-track', {
         autoAlpha: 0,
         scale: 0.95,
         duration: 1.0,
         ease: 'power2.in',
      }, 15.5)

      // Phase 7 (16.2 to 17.6): Pull card back to an elegant floating frame
      .to(cardRef.current, {
        scale: 0.88,
        borderRadius: '32px',
        duration: 1.4,
        ease: 'expo.inOut',
      }, 16.2)
      .to('.hero-cta', {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 16.4)

      // CTA static hold
      .to({}, { duration: 1.5 }, 17.6)

      // Phase 8: Scaling out the card for final transition to next tracks
      .to('.hero-card', {
        scale: 0.7,
        yPercent: -30,
        autoAlpha: 0,
        duration: 1.5,
        ease: 'power3.in',
      }, 19.1)
      .to('.hero-cta', {
        yPercent: -80,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power3.in',
      }, 19.1);

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
        background: '#FFFFFF',
      }}
    >
      <style>{`
        @keyframes floatYoyo1 {
          0%, 100% { transform: translateY(0px) rotate(-1deg) scale(1); }
          50% { transform: translateY(-8px) rotate(0.8deg) scale(1.02); }
        }
        @keyframes floatYoyo2 {
          0%, 100% { transform: translateY(0px) rotate(1deg) scale(1); }
          50% { transform: translateY(-11px) rotate(-0.8deg) scale(1.02); }
        }
        @keyframes floatYoyo3 {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg) scale(1); }
          50% { transform: translateY(-7px) rotate(0.5deg) scale(1.02); }
        }
        @keyframes floatYoyo4 {
          0%, 100% { transform: translateY(0px) rotate(0.5deg) scale(1); }
          50% { transform: translateY(-10px) rotate(-0.5deg) scale(1.02); }
        }
        @keyframes floatYoyo5 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-6px) rotate(0.5deg) scale(1.02); }
        }
        .animate-float-1 { animation: floatYoyo1 4.5s ease-in-out infinite; }
        .animate-float-2 { animation: floatYoyo2 5s ease-in-out infinite; }
        .animate-float-3 { animation: floatYoyo3 4s ease-in-out infinite; }
        .animate-float-4 { animation: floatYoyo4 4.8s ease-in-out infinite; }
        .animate-float-5 { animation: floatYoyo5 3.8s ease-in-out infinite; }
      `}</style>

      {/* Background Mesh Gradient */}
      <div
        className="hero-gradient absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            minWidth: '1200px',
            height: '100vh',
            backgroundImage: 'radial-gradient(ellipse 100% 100% at top center, rgba(120, 185, 255, 0.55) 0%, rgba(160, 210, 255, 0.35) 45%, transparent 85%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '0%',
            width: '85vw',
            height: '110vh',
            backgroundImage: 'radial-gradient(ellipse 100% 100% at top left, rgba(125, 190, 255, 0.45) 0%, transparent 85%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '0%',
            width: '85vw',
            height: '110vh',
            backgroundImage: 'radial-gradient(ellipse 100% 100% at top right, rgba(145, 200, 250, 0.4) 0%, transparent 85%)',
          }}
        />
      </div>

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
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '100px',
            paddingLeft: '10px',
            paddingRight: '14px',
            paddingTop: '6px',
            paddingBottom: '6px',
            background: '#207ca9',
            boxShadow: '0 0 16px rgba(32, 124, 169, 0.65), 0 0 8px rgba(32, 124, 169, 0.4)',
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
                <path fillRule="evenodd" clipRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4m7-3a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1m-2 10a.75.75 0 0 1 .728.568.97.97 0 0 0 .704.704.75.75 0 0 1 0 1.456.97.97 0 0 0-.704.704.75.75 0 0 1-1.456 0 .97.97 0 0 0-.704-.704.75.75 0 0 1 0-1.456.97.97 0 0 0 .704-.704A.75.75 0 0 1 10 11" fill="#ffffff"/>
              </svg>
              Available for remote work
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', lineHeight: '1' }}>•</span>
            <a
              href="https://www.linkedin.com/in/medyessin-driss/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)')}
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
            fontSize: 'clamp(28px, 7vw, 96px)',
            lineHeight: 0.9,
            color: '#207ca9',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Hi. I'm Yessin
        </h1>
        <h1
          className="hero-line-2"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 7vw, 96px)',
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
            fontSize: 'clamp(13px, 3.5vw, 18px)',
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
            boxShadow: '0 40px 100px rgba(32,124,169,0.35), 0 8px 32px rgba(35,41,107,0.25)',
            border: '1px solid rgba(255,255,255,0.15)',
            overflow: 'hidden',
            position: 'relative',
            pointerEvents: 'auto',
          }}
        >
          <div className="card-scroll-track" style={{ width: '100%', height: '300vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* --- SLIDE 1: HERO CONTENT --- */}
            <div className="w-full h-[100vh] flex flex-col md:flex-row items-center justify-center relative overflow-hidden px-8">
              {/* Delicate blueprints pattern overlay inside the dashboard view to enrich texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.22] z-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '36px 36px',
              }} />

              {/* Refined background outline typography with improved contrast */}
              <h1 className="card-bg-text absolute inset-0 flex items-center justify-center font-black text-[22vw] leading-none pointer-events-none select-none z-0" style={{
                fontFamily: 'Outfit, sans-serif',
                color: 'rgba(255, 255, 255, 0.02)',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.18)',
              }}>
                DRISS
              </h1>

              {/* Center Photo & Hanging Floating Badges */}
              <div className="photo-anchor relative z-10 w-[240px] md:w-[280px] lg:w-[310px] aspect-[9/14] flex flex-col items-center">
                <a 
                  href="https://www.linkedin.com/in/medyessin-driss/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card-photo-wrapper group relative block w-full h-full rounded-[24px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-500 hover:scale-[1.03] hover:border-[#207ca9]/50 hover:shadow-[0_0_45px_rgba(32,124,169,0.4)]"
                >
                  <img src="https://i.ibb.co/bRJRsMtL/050-A3100-1.jpg" alt="Mohammed Yessin Driss" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23296b]/80 via-transparent to-transparent mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
                  
                  {/* Dynamic Hover LinkedIn Connect Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#23296b]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="px-4.5 py-2.5 rounded-full bg-white/10 border border-white/20 shadow-lg text-white font-outfit text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect on LinkedIn
                    </div>
                  </div>
                </a>

                {/* Leftside balanced floating capsules */}
                <GlassPill className="card-float-1 animate-float-1 absolute top-[12%] -left-[24%] md:-left-[36%] hover:scale-105">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  Brand Launch
                </GlassPill>

                {/* Open to remote work capsule dynamically arranged far on the left flanking edge, completely clearing the portrait clothing */}
                <GlassPill className="card-float-5 animate-float-5 absolute top-[45%] -left-[32%] md:-left-[48%] hover:scale-105 border-emerald-400/30 bg-emerald-950/20 shadow-[0_16px_36px_rgba(16,185,129,0.2)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Open to remote work
                </GlassPill>

                <GlassPill className="card-float-3 animate-float-3 absolute bottom-[18%] -left-[22%] md:-left-[34%] hover:scale-105">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  SaaS Growth
                </GlassPill>

                {/* Rightside balanced floating capsules */}
                <GlassPill className="card-float-2 animate-float-2 absolute top-[26%] -right-[24%] md:-right-[36%] hover:scale-105">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400" />
                  B2B Marketing
                </GlassPill>

                <GlassPill className="card-float-4 animate-float-4 absolute bottom-[32%] -right-[20%] md:-right-[32%] hover:scale-105">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-purple-400" />
                  Community & Ads
                </GlassPill>
              </div>
            </div>

            {/* --- SLIDE 2: ABOUT NARRATIVE (Centered, huge typography, pristine breathing room, and premium design ticks) --- */}
            <div className="w-full h-[100vh] flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 relative z-10">
              
              {/* Corner design framing boundaries & ticks for premium editorial styling layout in State 2 */}
              <div className="absolute inset-10 md:inset-16 pointer-events-none border border-white/5 opacity-50 z-0 select-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />
                
                {/* Tactical metadata coordinates */}
                <div className="absolute top-6 left-6 font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase">
                  LOC. 36.8065° N // 10.1815° E
                </div>
                <div className="absolute top-6 right-6 font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase">
                  SECTION_02 // PHILOSOPHY
                </div>
              </div>

              <div style={{ textAlign: 'center', width: '100%', maxWidth: '980px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(18px, 3.2vw, 30px)',
                  lineHeight: 1.65,
                  color: '#ffffff',
                  textAlign: 'center',
                }}>
                  {paragraphWords.map((word, i) => {
                    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
                    const isHigh = highlightedWords.includes(cleanWord);
                    return (
                      <span key={i} className="inline-block overflow-hidden whitespace-nowrap" style={{ verticalAlign: 'bottom' }}>
                        <span className="vcr-inner inline-block" style={{ 
                          fontWeight: isHigh ? 700 : 400,
                          color: isHigh ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                          borderBottom: isHigh ? '2px solid #207ca9' : 'none',
                          paddingBottom: isHigh ? '2px' : '0px',
                        }}>
                          {word}
                        </span>
                        <span className="inline-block" style={{ width: '0.28em' }}>&nbsp;</span>
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>

            {/* --- SLIDE 3: METADATA GRID (Highly padded, luxury layout, structured custom tools capsule system) --- */}
            <div 
              id="about"
              className="w-full h-[100vh] flex flex-col justify-center relative z-10"
              style={{
                paddingLeft: 'clamp(24px, 6vw, 110px)',
                paddingRight: 'clamp(24px, 6vw, 110px)',
                paddingTop: 'clamp(90px, 12vh, 130px)',
                paddingBottom: 'clamp(40px, 6vh, 90px)',
              }}
            >
              
              {/* Corner design boundary ticks for State 3 */}
              <div className="absolute inset-10 md:inset-16 pointer-events-none border border-white/5 opacity-50 z-0 select-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />
              </div>

              <div className="w-full max-w-[1300px] xl:max-w-[1400px] flex flex-col gap-10 md:gap-14 lg:gap-16 items-start justify-center relative z-10 px-4">
                
                {/* Upper grid for Education & Currently list */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start text-left">
                  
                  {/* Left Column: Education & Languages */}
                  <div className="flex flex-col gap-6 md:gap-8">
                      <div className="about-anim-fade">
                        <div className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-medium mb-3">Education</div>
                        <div 
                          className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center transition-all duration-350 hover:border-[#207ca9]/40 hover:bg-white/[0.06] max-w-xl shadow-lg"
                          style={{
                            padding: '32px 36px',
                            minHeight: '210px',
                            gap: '24px',
                          }}
                        >
                          {/* Secondary subtle glow */}
                          <div className="absolute -left-12 -top-12 w-24 h-24 bg-[#207ca9]/15 rounded-full blur-2xl group-hover:scale-130 transition-transform duration-500" />
                          
                          <div className="relative flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 border border-white/15 overflow-hidden backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-105" style={{ padding: '10px' }}>
                            <img 
                              src="https://i.ibb.co/N2dGgxX8/logo-hu3d8e5f27ad81de36e24c8e7a513aea7c-89571-0x70-resize-lanczos-3-1.png" 
                              alt="Tunis Business School Logo" 
                              className="w-full h-full object-contain filter brightness-110 select-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="relative z-10 flex flex-col gap-1.5">
                            <div className="text-white font-outfit text-xl md:text-2xl font-bold tracking-tight">Tunis Business School</div>
                            <div className="text-white/70 text-sm md:text-base font-medium">BSc Business Administration · Sophomore</div>
                            <div className="text-[#207ca9] text-[9.5px] uppercase tracking-[0.2em] font-mono mt-1 font-semibold leading-relaxed">First Public English-Speaking Business School in Tunisia</div>
                          </div>
                        </div>
                      </div>

                      <div className="about-anim-fade">
                        <div className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-medium mb-2.5">Languages</div>
                        <div className="text-white/80 text-base md:text-lg tracking-wide">Arabic · French · English</div>
                      </div>
                  </div>

                  {/* Right Column: Currently & Quote (Pulled to the bottom a little bit) */}
                  <div className="flex flex-col gap-8 md:gap-10 pt-1 md:pt-14 justify-end">
                      <div className="about-anim-fade">
                        <div className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-medium mb-4">Currently</div>
                        <div className="flex flex-col gap-4">
                          {CURRENTLY.map((item, i) => (
                            <div 
                              key={i} 
                              className="text-white/80 text-base md:text-lg border-l-2 border-white/20"
                              style={{ paddingLeft: '1.75rem' }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div 
                        className="about-anim-fade border-l-2 border-[#207ca9] mt-2 md:mt-4"
                        style={{ paddingLeft: '1.75rem' }}
                      >
                        <p className="italic text-white/60 text-sm md:text-base m-0 leading-relaxed max-w-[420px]">
                          "The learning happens in production, not just in textbooks."
                        </p>
                      </div>
                  </div>

                </div>

                {/* Lower Row: Full Width Tools & Software (With wrap creating 2 or 3 lines) */}
                <div className="w-full about-anim-fade">
                  <div className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-medium mb-4">Tools & Software</div>
                  <div className="flex flex-wrap gap-3.5 w-full max-w-full">
                      {SOFTWARE_ITEMS.map(item => (
                        <span 
                          key={item.name} 
                          className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-tight text-white/80 bg-[#207ca9]/12 border border-[#207ca9]/25 rounded-full hover:bg-white/10 hover:border-white/35 hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none group/pill cursor-default"
                          style={{
                            padding: '10px 20px',
                            textShadow: '0 1px 1.5px rgba(0,0,0,0.25)'
                          }}
                        >
                          <div className="w-5 h-5 flex items-center justify-center relative flex-shrink-0">
                            <img 
                              src={item.customIcon || `https://cdn.simpleicons.org/${item.slug}/${item.color}`}
                              alt={`${item.name} Logo`}
                              className="w-full h-full object-contain filter group-hover/pill:brightness-125 transition-all duration-300 group-hover/pill:scale-110"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="leading-none">{item.name}</span>
                        </span>
                      ))}
                  </div>
                </div>

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
          fontSize: 'clamp(24px, 6vw, 72px)',
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
          maxWidth: '430px',
          lineHeight: 1.7,
          marginBottom: '40px',
        }}>
          Five brands. One year. Results documented layer by layer.
        </p>
        <a
          href="#work"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 750,
            fontSize: '13px',
            color: '#23296b',
            background: '#ffffff',
            padding: '14px 36px',
            borderRadius: '100px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
          }}
        >
          Explore the work ↓
        </a>
      </div>
    </div>
  );
}
