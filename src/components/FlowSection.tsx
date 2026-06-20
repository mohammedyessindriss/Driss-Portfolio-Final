import { motion } from 'motion/react';
import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
}

interface FlowSectionProps {
  isTbsJe?: boolean;
  sectionLabel?: string;
  heading?: string;
  number: string;
  title: string;
  role: string;
  period: string;
  category: string;
  tagline: string;
  metrics: Metric[];
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  isLight: boolean;
  hasGradientTheme?: boolean;
  creatives: { img: string; href: string }[];
  children?: React.ReactNode;
}

const TWEEN_EASE = [0.16, 1, 0.3, 1] as const;

export default function FlowSection({
  isTbsJe,
  sectionLabel,
  heading,
  number,
  title,
  role,
  period,
  category,
  tagline,
  metrics,
  backgroundColor,
  textColor,
  borderColor,
  isLight,
  hasGradientTheme,
  creatives,
  children,
}: FlowSectionProps) {
  const mutedColor = isLight ? 'rgba(15,15,15,0.45)' : 'rgba(255,255,255,0.5)';
  const metricBg = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)';
  const accentColor = isLight ? '#207ca9' : 'rgba(255,255,255,0.9)';

  return (
    <section
      data-flow-section
      style={{
        position: 'relative',
        minHeight: isTbsJe ? '340vh' : '200vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="flow-inner"
        style={{
          position: 'relative',
          minHeight: isTbsJe ? '340vh' : '200vh',
          width: '100%',
          backgroundColor,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: 'clamp(16px, 4vw, 64px)',
          paddingTop: 'clamp(72px, 8vw, 112px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          willChange: 'transform',
          transformOrigin: 'bottom left',
        }}
      >
        {hasGradientTheme && (
          <>
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
          </>
        )}
        {/* PHASE 1: HEADER & INTRO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {/* TOP ROW */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: TWEEN_EASE } }
              }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: '#23296b',
                textTransform: 'uppercase',
              }}
            >
              {number} · {category}
            </motion.span>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: TWEEN_EASE } }
              }}
              style={{ textAlign: 'right' }}
            >
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#23296b',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {role}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#23296b',
                marginTop: '4px',
              }}>
                {period}
              </div>
            </motion.div>
          </div>

          {/* MAIN TITLE */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: '32px',
          }}>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, filter: 'blur(12px)', letterSpacing: '0em' },
                visible: { opacity: 1, filter: 'blur(0px)', letterSpacing: '-0.02em', transition: { duration: 1.2, ease: TWEEN_EASE } }
              }}
              style={{
                willChange: 'transform, opacity, filter',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 9vw, 7.5rem)',
                lineHeight: 0.88,
                margin: 0,
                backgroundImage: 'linear-gradient(135deg, #23296b 0%, #207ca9 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {title}
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: TWEEN_EASE } }
              }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(17px, 2.4vw, 23px)',
                color: '#23296b',
                maxWidth: isTbsJe ? '780px' : '520px',
                lineHeight: 1.65,
                marginTop: isTbsJe ? '20px' : '32px',
              }}
            >
              {tagline}
            </motion.p>
          </div>
        </motion.div>

        {/* METRICS & HEADINGS WRAPPER */}
        {heading ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            style={{ marginTop: '28px' }}
          >
            {/* TBS JE Phase 2 & 3: separate heading then metrics */}
            <motion.div 
              variants={{
                hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1, ease: TWEEN_EASE } }
              }}
              style={{
                width: '100%',
                margin: '24px 0 28px',
                overflow: 'hidden',
              }}
            >
              <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                <span style={{
                  display: 'block',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 3vw, 38px)',
                  color: '#207ca9',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  paddingBottom: '4px',
                  borderBottom: '2px solid rgba(32,124,169,0.2)',
                  paddingRight: '16px',
                }}>
                  {heading}
                </span>
              </div>
            </motion.div>

            <div style={{ display: 'flex', gap: 'clamp(16px, 4vw, 32px)', flexWrap: 'wrap' }}>
              {metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: TWEEN_EASE } }
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '3px', willChange: 'transform, opacity' }}
                >
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 3.5vw, 42px)',
                    color: '#23296b',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}>
                    {metric.value}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#23296b',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } // Delayed per rules (Phase 3 for Standard pages)
            }}
            style={{ marginTop: '48px', display: 'flex', gap: 'clamp(16px, 4vw, 32px)', flexWrap: 'wrap' }}
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: TWEEN_EASE } }
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '3px', willChange: 'transform, opacity' }}
              >
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  color: '#23296b',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#23296b',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* DIVIDER */}
        <div style={{
          width: '100%',
          height: '1px',
          background: borderColor,
          marginTop: '28px',
          marginBottom: '24px',
        }} />

        {/* SECTION LABEL & GRIDS */}
        {sectionLabel && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '56px', marginBottom: '32px' }}>
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, ease: TWEEN_EASE } }
                }}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 'clamp(20px, 5vw, 36px)',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  backgroundImage: 'linear-gradient(135deg, #23296b 0%, #207ca9 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {sectionLabel}
              </motion.div>
              <motion.div 
                variants={{
                  hidden: { scaleX: 0 },
                  visible: { scaleX: 1, transition: { duration: 1, ease: TWEEN_EASE } }
                }}
                style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(32,124,169,0.3), transparent)', transformOrigin: 'left' }} 
              />
            </div>

            <div 
              data-scrollable="true" 
              style={{ 
                width: '100%', 
                overflowX: 'auto', 
                WebkitOverflowScrolling: 'touch', 
                paddingBottom: '20px',
                touchAction: 'pan-x',
              }}
            >
              <div 
                data-scrollable="true" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))', 
                  gap: '32px', 
                  marginTop: '24px', 
                  width: '100%', 
                  maxWidth: '1024px', 
                  margin: '24px auto 0',
                  touchAction: 'pan-x',
                }}
              >
                {creatives.map((creative, i) => {
                  const hasLink = creative.href && creative.href !== '#';
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {hasLink ? (
                        <motion.a
                          href={creative.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, "ease": TWEEN_EASE } }
                          }}
                          style={{
                            aspectRatio: '1080 / 1350',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'block',
                            position: 'relative',
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
                            cursor: 'pointer',
                            border: `1px solid ${borderColor}`,
                            willChange: 'transform, opacity',
                          }}
                        >
                          <motion.img
                            variants={{
                              hidden: { filter: 'blur(10px)', opacity: 0 },
                              visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2, "ease": TWEEN_EASE } }
                            }}
                            src={creative.img}
                            alt={`Creative ${i + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                            loading="lazy"
                          />
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(32,124,169,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.25s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                          >
                            <span style={{
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 600,
                              fontSize: '15px',
                              color: '#ffffff',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                            }}>
                              View
                            </span>
                          </div>
                        </motion.a>
                      ) : (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, "ease": TWEEN_EASE } }
                          }}
                          style={{
                            aspectRatio: '1080 / 1350',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'block',
                            position: 'relative',
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
                            cursor: 'default',
                            border: `1px solid ${borderColor}`,
                            willChange: 'transform, opacity',
                          }}
                        >
                          <motion.img
                            variants={{
                              hidden: { filter: 'blur(10px)', opacity: 0 },
                              visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2, "ease": TWEEN_EASE } }
                            }}
                            src={creative.img}
                            alt={`Creative ${i + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                            loading="lazy"
                          />
                        </motion.div>
                      )}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3, "ease": TWEEN_EASE } }
                        }}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '0 4px',
                          color: '#6B7280'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <Heart size={24} strokeWidth={1.5} style={{ cursor: 'pointer', transition: 'color 0.2s', ...({':hover':{color: '#111827'}} as any) }} />
                          <MessageCircle size={24} strokeWidth={1.5} style={{ cursor: 'pointer', transition: 'color 0.2s', ...({':hover':{color: '#111827'}} as any) }} />
                          <Send size={24} strokeWidth={1.5} style={{ cursor: 'pointer', transition: 'color 0.2s', ...({':hover':{color: '#111827'}} as any) }} />
                        </div>
                        <Bookmark size={24} strokeWidth={1.5} style={{ cursor: 'pointer', transition: 'color 0.2s', ...({':hover':{color: '#111827'}} as any) }} />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {children}
      </div>

      {/* THIN BOTTOM LINE */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: borderColor,
        opacity: 0.5,
      }} />
    </section>
  );
}
