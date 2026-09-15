"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  platform?: 'instagram' | 'tiktok' | 'none';
  type?: string;
  aspectRatio?: 'social' | 'square' | '1:1' | '4:5' | 'presentation' | '16:9' | 'A4' | 'print';
  cardWidth?: number;
  cardHeight?: number;
}

interface SocialCardsProps {
  cards: CardItem[];
  aspectRatio?: 'social' | 'square' | '1:1' | 'presentation' | '16:9' | '4:5' | 'A4' | 'print';
  cardWidth?: number;
  cardHeight?: number;
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -18, y: 4.0, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -12, y: 2.2, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -6,  y: 0.7, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 6,   y: 0.7, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 12,  y: 2.2, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 18,  y: 4.0, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.5;
  if (width < 768) return 0.65;
  if (width < 1024) return 0.8;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 320;
  else if (width < 768) idealPx = 420;
  else idealPx = 520;
  const available = window.innerHeight * 0.65;
  return available >= idealPx ? 1 : available / idealPx;
}

function getSlotConfig(slot: number, isPresentation = false) {
  const base = FAN_POSITIONS[slot];
  if (!isPresentation) return base;
  // For wide 16:9 presentation slides, soften rotation and set balanced symmetric spacing
  const offset = slot - HALF; // -3, -2, -1, 0, 1, 2, 3
  const absOffset = Math.abs(offset);
  return {
    rot: offset * 4.5,
    scale: 1.0 - 0.05 * absOffset * absOffset,
    x: offset * 8.5,
    y: absOffset * absOffset * 0.8,
    zIndex: 10 - absOffset,
  };
}

const ARROW_CLASSES = "flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white/80 backdrop-blur text-black/50 cursor-pointer hover:border-black/30 hover:text-black/80 transition-all duration-200 shadow-sm z-30";

export default function SocialCards({
  cards,
  aspectRatio = 'social',
  cardWidth,
  cardHeight,
}: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > 1;
  const [centerIndex, setCenterIndex] = useState(0);

  const isPresentation = aspectRatio === 'presentation' || aspectRatio === '16:9';
  const isA4 = aspectRatio === 'A4' || aspectRatio === 'print';

  const getDimensions = (card?: CardItem) => {
    const cardAspect = card?.aspectRatio || aspectRatio;
    const isSq = cardAspect === 'square' || cardAspect === '1:1';
    const isPres = cardAspect === 'presentation' || cardAspect === '16:9';
    const isPrint = cardAspect === 'A4' || cardAspect === 'print';

    const w = card?.cardWidth || cardWidth || (isPres ? 640 : 350);
    const h = card?.cardHeight || cardHeight || (
      isSq ? w :
      isPres ? Math.round(w * 1080 / 1920) :
      isPrint ? Math.round(w * 3508 / 2480) :
      Math.round(w * 1350 / 1080)
    );
    return { w, h };
  };

  const { w: CARD_W, h: CARD_H } = getDimensions();

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (totalCards <= 0) return map;

    if (totalCards === 1) {
      map.set(0, HALF);
      return map;
    }

    if (totalCards === 2) {
      map.set(center, HALF);
      map.set((center + 1) % 2, HALF + 1);
      return map;
    }

    if (totalCards <= 4) {
      // Symmetrically distribute 3 cards: One center (slot 3), One left (slot 2), One right (slot 4)
      const leftIdx = ((center - 1) % totalCards + totalCards) % totalCards;
      const centerIdx = ((center) % totalCards + totalCards) % totalCards;
      const rightIdx = ((center + 1) % totalCards + totalCards) % totalCards;

      map.set(leftIdx, HALF - 1); // slot 2 (x: -6rem)
      map.set(centerIdx, HALF);    // slot 3 (x: 0rem)
      map.set(rightIdx, HALF + 1); // slot 4 (x: +6rem)
      return map;
    }

    if (totalCards < MAX_VISIBLE) {
      // 5 or 6 cards: Symmetrically display 5 slots around center (slots 1..5)
      for (let offset = -2; offset <= 2; offset++) {
        const cardIdx = ((center + offset) % totalCards + totalCards) % totalCards;
        map.set(cardIdx, offset + HALF);
      }
      return map;
    }

    // 7 or more cards (e.g. TBS JE reference design): 7 slots visible (slots 0..6)
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      const offset = slot - HALF;
      const cardIdx = ((center + offset) % totalCards + totalCards) % totalCards;
      map.set(cardIdx, slot);
    }
    return map;
  }, [totalCards]);

  const cycle = useCallback((direction: 'left' | 'right') => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === 'right' ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card-inner"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const config = (slot: number) => getSlotConfig(slot, isPresentation);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${8 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 30 : -30;
          gsap.set(card, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 25 : -25, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -30 : 30;
        gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -25 : 25, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Hover
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);
      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let tx = base.x * mult;
        let ty = base.y * hM;
        let tr = base.rot;
        let ts = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const dist = Math.abs(slot - hoveredSlot);
          delay = dist * 0.02;
          if (slot === hoveredSlot) {
            ty -= 2.0 * hM;
            ts *= 1.06;
          } else {
            const norm = (slot - HALF) / HALF;
            const push = 6 * (1 - Math.abs(norm)) * (1 + 0.2 * Math.max(0, 3 - dist));
            if (slot < hoveredSlot) { tx -= push * mult; tr -= 2 / (dist + 1); }
            else { tx += push * mult; tr += 2 / (dist + 1); }
          }
        } else {
          delay = Math.abs(slot - HALF) * 0.02;
        }

        gsap.to(el, { x: `${tx}rem`, y: `${ty}rem`, rotation: tr, scale: ts, duration: 0.5, delay, ease: "elastic.out(1,.75)", overwrite: "auto" });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => { if (!isAnimating.current) updateHoverLayout(activeSlot); };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) return null;

  const hasMeta = cards.some(c => (c.platform && c.platform !== 'none') || c.type);
  const maxCardH = Math.max(...cards.map(c => getDimensions(c).h), CARD_H);
  const containerHeight = isPresentation
    ? maxCardH + (hasMeta ? 90 : 50)
    : maxCardH + (hasMeta ? 110 : 50);

  const chevron = (dir: "left" | "right") => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={dir === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
            height: `${containerHeight}px`,
            overflow: 'visible',
          }}
        >
          {cards.map((card, index) => {
            const { w: cardW, h: cardH } = getDimensions(card);
            const inner = (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  padding: '6px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(32,124,169,0.15) 0%, rgba(35,41,107,0.1) 100%)',
                  border: '1px solid rgba(32,124,169,0.2)',
                  boxShadow: '0 12px 40px rgba(35,41,107,0.15), 0 2px 8px rgba(32,124,169,0.1)',
                }}>
                  <div style={{
                    width: cardW,
                    height: cardH,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img
                      src={card.imgUrl}
                      loading="lazy"
                      alt={card.alt || `Card ${index}`}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {(card.platform && card.platform !== 'none') || card.type ? (
                  <div style={{
                    width: cardW + 12,
                    marginTop: '10px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(32,124,169,0.1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}>
                    {card.platform && card.platform !== 'none' && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: card.type ? '6px' : '0',
                      }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </div>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </div>
                    )}
                    {card.type && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{
                          width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
                          background: card.type.toLowerCase().includes('video') ? '#207ca9' : '#23296b',
                        }} />
                        <span style={{
                          fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 700,
                          letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: card.type.toLowerCase().includes('video') ? '#207ca9' : '#23296b',
                        }}>
                          {card.type}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );

            const wrapperStyle: React.CSSProperties = {
              position: 'absolute',
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: card.linkUrl ? 'pointer' : 'default',
            };

            return card.linkUrl ? (
              <a key={index} href={card.linkUrl} target="_blank" rel="noopener noreferrer" className="fan-card-inner" style={wrapperStyle}>
                {inner}
              </a>
            ) : (
              <div key={index} className="fan-card-inner" style={wrapperStyle}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', zIndex: 30 }}>
          <button className={ARROW_CLASSES} onClick={() => cycle("left")} aria-label="Previous">{chevron("left")}</button>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '80vw' }}>
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCenterIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: 8,
                  height: 8,
                  padding: 0,
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: i === centerIndex ? '#23296b' : 'rgba(0,0,0,0.15)',
                  transform: i === centerIndex ? 'scale(1.3)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
          <button className={ARROW_CLASSES} onClick={() => cycle("right")} aria-label="Next">{chevron("right")}</button>
        </div>
      )}
    </div>
  );
}
