import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/LanguageContext';
import SocialCards from '@/components/ui/card-fan-carousel';

const VISUAL_WORK_CARDS = [
  // Kamka Social & Campaign Visuals
  { imgUrl: 'https://i.ibb.co/ZpBXyJLH/Screenshot-2026-06-17-013608.png', linkUrl: 'https://www.linkedin.com/posts/kamka_the-architecture-activity-7471184583817023489-WbQD', platform: 'instagram' as const, alt: 'Kamka Design 1' },
  { imgUrl: 'https://i.ibb.co/b5FvzWnD/Screenshot-2026-06-17-013714.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7470037072959922176', platform: 'instagram' as const, alt: 'Kamka Design 2' },
  { imgUrl: 'https://i.ibb.co/Rp3tsBLh/Screenshot-2026-06-17-013800.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7468964911960711169', platform: 'instagram' as const, alt: 'Kamka Design 3' },
  { imgUrl: 'https://i.ibb.co/tPX4bHPK/10th-Post-Kamka.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7463166787321278464', platform: 'instagram' as const, alt: 'Kamka Design 4' },
  { imgUrl: 'https://i.ibb.co/fVz3qDCC/Screenshot-2026-06-17-014020.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7460705580635164673', platform: 'instagram' as const, alt: 'Kamka Design 5' },
  { imgUrl: 'https://i.ibb.co/Vcb7y1MD/Screenshot-2026-06-17-014116.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7454816699846967296', platform: 'instagram' as const, alt: 'Kamka Design 6' },
  { imgUrl: 'https://i.ibb.co/VpNwYXhH/Screenshot-2026-06-17-014202.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7447206616883519488', platform: 'instagram' as const, alt: 'Kamka Design 7' },
  { imgUrl: 'https://i.ibb.co/9km7crcB/Screenshot-2026-06-18-185154.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7473359019823362048', platform: 'instagram' as const, alt: 'Kamka Design 8' },
  { imgUrl: 'https://i.ibb.co/ymFvqfqK/8th-Post-Kamka.png', linkUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7455888805896781824', platform: 'instagram' as const, alt: 'Kamka Design 9' },

  // Graphic Design & Artboard Visual Works (1080x1080 Square)
  { imgUrl: 'https://i.ibb.co/JwVkzmQY/Artboard-3-1.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 1' },
  { imgUrl: 'https://i.ibb.co/bj9yYChH/Artboard-1-2.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 2' },
  { imgUrl: 'https://i.ibb.co/992LR1X9/Artboard-3.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 3' },
  { imgUrl: 'https://i.ibb.co/G45KLqR5/Artboard-1-3.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 4' },
  { imgUrl: 'https://i.ibb.co/Zpmkh55h/Artboard-2-1.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 5' },
  { imgUrl: 'https://i.ibb.co/vCbLYbjR/Artboard-1.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 6' },
  { imgUrl: 'https://i.ibb.co/27bkSfKb/5-3.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 7' },
  { imgUrl: 'https://i.ibb.co/5b9JdWm/Artboard-1-4.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 8' },
  { imgUrl: 'https://i.ibb.co/4wskvwwd/Artboard-1-1.png', linkUrl: '#', platform: 'instagram' as const, aspectRatio: 'square' as const, alt: 'Artboard Design 9' },
];

export default function VisualWork() {
  const { t } = useLanguage();
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
      id="visual-work"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
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
      <div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0"
        style={{
          position: 'relative',
          zIndex: 1,
          marginBottom: '48px',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'rgba(32,124,169,0.45)',
          textTransform: 'uppercase',
        }}>
          05 · {t('visual.category')}
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: 'rgba(32,124,169,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {t('visual.spec')}
        </span>
      </div>

      {/* CENTERED TITLE */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        marginBottom: '40px',
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
          {t('visual.title')}
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
          {t('visual.subtitle')}
        </p>
      </div>

      {/* FAN CAROUSEL WITH SOCIAL POST FEATURES */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', marginTop: '16px' }}>
        <SocialCards cards={VISUAL_WORK_CARDS} />
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

