import * as React from "react";
import { Sparkle } from "lucide-react";
import { createRoot } from "react-dom/client";

interface Point {
  x: number;
  y: number;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandom<T>(items: T[]): T {
  return items[rand(0, items.length - 1)];
}

function calcDistance(a: Point, b: Point) {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

// 4-pointed glowing spark matching the Hero section floating sparkles in brand blue
const HERO_SPARK_SVG = `
<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cursorSpkGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="1" />
      <stop offset="45%" stop-color="#207ca9" stop-opacity="0.95" />
      <stop offset="80%" stop-color="#23296b" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#141842" stop-opacity="0.4" />
    </radialGradient>
    <filter id="cursorSpkGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <path
    d="M12 0L13.8 8.2L22 12L13.8 15.8L12 24L10.2 15.8L2 12L10.2 8.2L12 0Z"
    fill="url(#cursorSpkGrad)"
    filter="url(#cursorSpkGlow)"
  />
  <path
    d="M12 5.5L12.8 9.2L16.5 12L12.8 14.8L12 18.5L11.2 14.8L7.5 12L11.2 9.2L12 5.5Z"
    fill="#207ca9"
    opacity="0.95"
  />
  <circle cx="12" cy="12" r="1.6" fill="#38bdf8" />
</svg>
`;

export default function MagicCursor() {
  const config = React.useRef({
    starAnimationDuration: 1500,
    minimumTimeBetweenStars: 250,
    minimumDistanceBetweenStars: 75,
    glowDuration: 75,
    maximumGlowPointSpacing: 10,
    colors: ["32 124 169", "35 41 107", "56 189 248"],
    sizes: ["1.2rem", "0.9rem", "0.6rem"],
    animations: ["fall-1", "fall-2", "fall-3"],
  });

  const last = React.useRef({
    starTimestamp: new Date().getTime(),
    starPosition: { x: 0, y: 0 },
    mousePosition: { x: 0, y: 0 },
  });

  let count = 0;

  const createStar = React.useCallback((position: Point) => {
    const wrapper = document.createElement("div");
    const color = selectRandom(config.current.colors);
    const size = selectRandom(config.current.sizes);

    wrapper.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      font-size: ${size};
      color: rgb(${color});
      text-shadow: 0px 0px 1.5rem rgb(${color} / 0.5);
      animation-name: ${config.current.animations[count++ % 3]};
      animation-duration: ${config.current.starAnimationDuration}ms;
      animation-fill-mode: forwards;
      pointer-events: none;
      z-index: 9999;
      width: 1em;
      height: 1em;
    `;

    document.body.appendChild(wrapper);
    const root = createRoot(wrapper);
    root.render(<Sparkle style={{ width: '100%', height: '100%' }} />);

    setTimeout(() => {
      root.unmount();
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
    }, config.current.starAnimationDuration);
  }, []);

  const createGlowPoint = React.useCallback((position: Point) => {
    const glow = document.createElement("div");
    glow.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(32, 124, 169, 0.6);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9998;
      filter: blur(2px);
    `;
    document.body.appendChild(glow);
    setTimeout(() => {
      if (document.body.contains(glow)) {
        document.body.removeChild(glow);
      }
    }, config.current.glowDuration);
  }, []);

  const createGlow = React.useCallback((lastPos: Point, current: Point) => {
    const distance = calcDistance(lastPos, current);
    const quantity = Math.max(
      Math.floor(distance / config.current.maximumGlowPointSpacing),
      1
    );
    const dx = (current.x - lastPos.x) / quantity;
    const dy = (current.y - lastPos.y) / quantity;

    Array.from({ length: quantity }).forEach((_, index) => {
      createGlowPoint({ x: lastPos.x + dx * index, y: lastPos.y + dy * index });
    });
  }, [createGlowPoint]);

  const handleMove = React.useCallback((e: { clientX: number; clientY: number }) => {
    const mousePosition = { x: e.clientX, y: e.clientY };

    if (last.current.mousePosition.x === 0 && last.current.mousePosition.y === 0) {
      last.current.mousePosition = mousePosition;
    }

    const now = new Date().getTime();
    const farEnough = calcDistance(last.current.starPosition, mousePosition) >= config.current.minimumDistanceBetweenStars;
    const longEnough = now - last.current.starTimestamp > config.current.minimumTimeBetweenStars;

    if (farEnough || longEnough) {
      createStar(mousePosition);
      last.current.starTimestamp = now;
      last.current.starPosition = mousePosition;
    }

    createGlow(last.current.mousePosition, mousePosition);
    last.current.mousePosition = mousePosition;
  }, [createStar, createGlow]);

  // Trail effect listeners
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => handleMove(e);
    const onLeave = () => { last.current.mousePosition = { x: 0, y: 0 }; };

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [handleMove]);

  // Spotlight effect (brand blue glow following cursor)
  React.useEffect(() => {
    const spotlight = document.createElement("div");
    spotlight.id = "cursor-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(32,124,169,0.22) 0%, rgba(56,189,248,0.12) 30%, rgba(35,41,107,0.05) 60%, transparent 75%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9990;
      filter: blur(28px);
      transition: opacity 0.3s ease;
      opacity: 0;
      top: 0;
      left: 0;
    `;
    document.body.appendChild(spotlight);

    const moveSpotlight = (e: MouseEvent) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
      spotlight.style.opacity = "1";
    };

    const hideSpotlight = () => {
      spotlight.style.opacity = "0";
    };

    window.addEventListener("mousemove", moveSpotlight);
    document.body.addEventListener("mouseleave", hideSpotlight);

    return () => {
      window.removeEventListener("mousemove", moveSpotlight);
      document.body.removeEventListener("mouseleave", hideSpotlight);
      if (document.body.contains(spotlight)) {
        document.body.removeChild(spotlight);
      }
    };
  }, []);

  // Custom Cursor (Hero Sparkle as the cursor itself)
  React.useEffect(() => {
    const isPointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isPointerFine) return;

    const sparkCursor = document.createElement("div");
    sparkCursor.className = "spark-cursor-element";
    sparkCursor.innerHTML = HERO_SPARK_SVG;
    document.body.appendChild(sparkCursor);
    document.body.classList.add("custom-spark-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      sparkCursor.style.left = `${e.clientX}px`;
      sparkCursor.style.top = `${e.clientY}px`;
      sparkCursor.style.opacity = "1";

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("a, button, [role='button'], input, textarea, select, label, .clickable, [onclick]")
        );
        if (isClickable) {
          sparkCursor.classList.add("hovering");
        } else {
          sparkCursor.classList.remove("hovering");
        }
      }
    };

    const onMouseDown = () => {
      sparkCursor.classList.add("clicking");
    };

    const onMouseUp = () => {
      sparkCursor.classList.remove("clicking");
    };

    const onMouseLeave = () => {
      sparkCursor.style.opacity = "0";
      sparkCursor.classList.remove("hovering", "clicking");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.classList.remove("custom-spark-cursor-active");
      if (document.body.contains(sparkCursor)) {
        document.body.removeChild(sparkCursor);
      }
    };
  }, []);

  return null;
}
