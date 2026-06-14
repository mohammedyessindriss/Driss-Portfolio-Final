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
            onLeaveBack: () => {
              const prevSection = sections[i - 1];
              if (prevSection) {
                gsap.set(prevSection, { visibility: 'visible' });
              }
            },
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);

        const hideTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 0%',
          onEnter: () => {
            const prevSection = sections[i - 1];
            if (prevSection) {
              gsap.set(prevSection, { visibility: 'hidden' });
            }
          },
          onLeaveBack: () => {
            const prevSection = sections[i - 1];
            if (prevSection) {
              gsap.set(prevSection, { visibility: 'visible' });
            }
          },
        });
        triggers.push(hideTrigger);
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

      // Blur entrance animation for metrics
      const metricItems = section.querySelectorAll<HTMLElement>('.flow-metric-item');
      metricItems.forEach((item, metricIndex) => {
        gsap.set(item, { autoAlpha: 0, filter: 'blur(12px)', y: 8 });

        const metricTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 65%',
          onEnter: () => {
            gsap.to(item, {
              autoAlpha: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.65,
              delay: metricIndex * 0.14,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.set(item, { autoAlpha: 0, filter: 'blur(12px)', y: 8 });
          },
        });
        triggers.push(metricTrigger);
      });
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
