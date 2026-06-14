import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FlowArtProps {
  children: React.ReactNode;
}

export default function FlowArt({ children }: FlowArtProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const sections = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]')
    );

    if (sections.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, i) => {
      gsap.set(section, { zIndex: i + 1 });

      const inner = section.querySelector<HTMLElement>('.flow-inner');
      if (!inner) return;

      if (i > 0) {
        gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });

        const tween = gsap.to(inner, {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }

      if (i < sections.length - 1) {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom -80%',
            pin: true,
            pinSpacing: false,
          })
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, [reducedMotion]);

  return (
    <main
      ref={containerRef}
      id="work"
      style={{ width: '100%', overflowX: 'hidden' }}
    >
      {children}
    </main>
  );
}
