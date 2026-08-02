import { useEffect } from 'react';

const SPARKLES = [
  { left: '5%',  top: '10%', size: 52, op: 0.28, dur: '3.2s', delay: '0s'   },
  { left: '12%', top: '65%', size: 28, op: 0.20, dur: '4.5s', delay: '0.5s' },
  { left: '20%', top: '30%', size: 64, op: 0.32, dur: '3.8s', delay: '1.0s' },
  { left: '28%', top: '80%', size: 22, op: 0.18, dur: '5.2s', delay: '0.3s' },
  { left: '38%', top: '15%', size: 44, op: 0.25, dur: '4.0s', delay: '1.7s' },
  { left: '45%', top: '70%', size: 36, op: 0.22, dur: '3.5s', delay: '0.8s' },
  { left: '52%', top: '40%', size: 58, op: 0.30, dur: '4.2s', delay: '2.1s' },
  { left: '60%', top: '8%',  size: 30, op: 0.20, dur: '3.9s', delay: '0.4s' },
  { left: '67%', top: '55%', size: 48, op: 0.26, dur: '4.7s', delay: '1.4s' },
  { left: '74%', top: '25%', size: 68, op: 0.34, dur: '3.3s', delay: '2.3s' },
  { left: '80%', top: '75%', size: 24, op: 0.19, dur: '5.0s', delay: '0.6s' },
  { left: '87%', top: '42%', size: 54, op: 0.28, dur: '3.7s', delay: '1.2s' },
  { left: '93%', top: '18%', size: 38, op: 0.23, dur: '4.3s', delay: '0.9s' },
  { left: '15%', top: '48%', size: 42, op: 0.24, dur: '4.8s', delay: '1.6s' },
  { left: '50%', top: '88%', size: 32, op: 0.21, dur: '3.6s', delay: '2.0s' },
  { left: '70%', top: '90%', size: 26, op: 0.17, dur: '4.1s', delay: '0.7s' },
];

const STYLE = `
@keyframes spkPulse {
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  30% { opacity: 0.5; transform: scale(0.75) rotate(15deg); }
  70% { opacity: 0.8; transform: scale(0.9) rotate(-10deg); }
}
@keyframes spkFloat {
  0%, 100% { translate: 0px 0px; }
  25% { translate: 4px -22px; }
  75% { translate: -4px -10px; }
}
.spk {
  position: absolute;
  pointer-events: none;
  animation: spkPulse var(--spk-dur) ease-in-out infinite var(--spk-delay),
             spkFloat calc(var(--spk-dur) * 1.4) ease-in-out infinite var(--spk-delay);
  transition: margin-left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              margin-top  0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform, opacity, margin;
}
`;

export default function SparkleBackground() {
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.07);
      currentY = lerp(currentY, targetY, 0.07);

      const stars = document.querySelectorAll<HTMLElement>('.spk');
      stars.forEach((star, i) => {
        const strength = ((i % 6) + 1) * 14;
        star.style.marginLeft = `${currentX * strength}px`;
        star.style.marginTop  = `${currentY * strength}px`;
      });

      rafId = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {SPARKLES.map((sp, i) => (
          <div
            key={i}
            className="spk"
            style={{
              left: sp.left,
              top: sp.top,
              width: sp.size,
              height: sp.size,
              opacity: sp.op,
              '--spk-dur': sp.dur,
              '--spk-delay': sp.delay,
            } as React.CSSProperties}
          >
            <svg
              width={sp.size}
              height={sp.size}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id={`sg${i}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.95"  />
                  <stop offset="45%"  stopColor="#0284c7" stopOpacity="0.75"  />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0"     />
                </radialGradient>
                <filter id={`glow${i}`} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M12 0L13.8 8.2L22 12L13.8 15.8L12 24L10.2 15.8L2 12L10.2 8.2L12 0Z"
                fill={`url(#sg${i})`}
                filter={`url(#glow${i})`}
              />
              <path
                d="M12 6L12.7 9.3L16 12L12.7 14.7L12 18L11.3 14.7L8 12L11.3 9.3L12 6Z"
                fill="#60a5fa"
                opacity="0.85"
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
