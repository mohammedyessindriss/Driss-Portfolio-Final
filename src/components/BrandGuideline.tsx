import React, { useState } from 'react';
import { motion } from 'motion/react';

const COLORS = [
  { name: 'Deep Navy', hex: '#16193e', usage: 'H-stem primary' },
  { name: 'Brand Navy', hex: '#2E3785', usage: 'I + IDEATE wordmark' },
  { name: 'Cobalt', hex: '#2c4a8f', usage: 'H + HEX wordmark' },
  { name: 'Mid Blue', hex: '#2068b2', usage: 'Brand Color' },
  { name: 'Ideate Gold', hex: '#C9972A', usage: 'Crossbar - accent only' },
  { name: 'Ice Blue', hex: '#BACCE9', usage: 'Light surface / tint' },
];

const LOGOS = [
  { label: 'Primary Logo', img: 'https://i.ibb.co/yFLqf2m1/Horizental-Hex-Ideate.png', usage: 'Main lockup for headers, banners, and primary brand touchpoints', size: 'large' },
  { label: 'Secondary Logo', img: 'https://i.ibb.co/JjMbHM8K/Stacked-Hex-Ideate.png', usage: 'Stacked format for square or constrained layouts', size: 'large' },
  { label: 'Wordmark', img: 'https://i.ibb.co/GvwFk4FV/Wordmark-Hexideate.png', usage: 'Type-only usage where the icon is unnecessary', size: 'small' },
  { label: 'Logo Icon', img: 'https://i.ibb.co/1Yg92bbZ/Icon-Hex-Ideate.png', usage: 'Favicon, app icon, and tight social avatars', size: 'small' },
];

const labelStyle = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 'clamp(16px, 1.8vw, 20px)',
  fontWeight: 800,
  letterSpacing: '0.1em',
  color: '#207ca9',
  textTransform: 'uppercase' as const,
  marginBottom: '20px',
  paddingBottom: '8px',
  borderBottom: '2px solid rgba(32,124,169,0.2)',
  display: 'inline-block',
};

const TWEEN_EASE = [0.16, 1, 0.3, 1] as const;

const blockVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: TWEEN_EASE } }
};

function PrintingFlipCard({ imgFront, imgBack, labelFront, labelBack }: { imgFront: string; imgBack: string; labelFront: string; labelBack: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUpVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        aspectRatio: '2480 / 3508',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
        position: 'relative',
        margin: '0 auto',
        cursor: 'pointer',
        willChange: 'transform, opacity',
      }}
    >
      <img
        src={imgFront}
        alt={labelFront}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          position: 'absolute',
          inset: 0,
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />
      <img
        src={imgBack}
        alt={labelBack}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          position: 'absolute',
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 16px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          color: '#ffffff',
          letterSpacing: '0.05em',
        }}>
          {hovered ? labelBack : labelFront}
        </span>
      </div>
    </motion.div>
  );
}

export default function BrandGuideline() {
  return (
    <div style={{ width: '100%', padding: '60px 0' }}>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '56px',
        }}
      >
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
          Event Rebranding · HEXideate
        </motion.div>
        <motion.div 
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1, ease: TWEEN_EASE } }
          }}
          style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(32,124,169,0.3), transparent)', transformOrigin: 'left' }}
        />
      </motion.div>

      {/* 01 — THE CONCEPT */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{ marginBottom: '120px' }}
      >
        <motion.div variants={fadeUpVariant} style={labelStyle}>01. The Concept</motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>
          <motion.p variants={fadeUpVariant} style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.2vw, 36px)',
            color: '#23296b',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            HEXideate is TBS Junior Enterprise's annual hackathon: minimalist, sharp, and built for participants with ideas worth building.
          </motion.p>

          <motion.div variants={fadeUpVariant} style={{
            borderLeft: '2px solid rgba(32,124,169,0.2)',
            paddingLeft: '28px',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: '#6B7280',
              lineHeight: 1.9,
              margin: 0,
            }}>
              The mark is built from a fused{' '}
              <span style={{ color: '#23296b', fontWeight: 600 }}>H+I monogram</span>,{' '}
              Hex and Ideate compressed into a single geometric form. The two letterforms share a{' '}
              <span style={{ color: '#23296b', fontWeight: 600 }}>structural stem</span>,
              creating an inseparable connection between the two words.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: '#6B7280',
              lineHeight: 1.9,
              margin: '20px 0 0',
            }}>
              The{' '}
              <span style={{ color: '#C9972A', fontWeight: 600 }}>gold diagonal crossbar</span>{' '}
              is the defining element, angled at 15°, it introduces dynamic tension between structure and creativity.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* 02 — LOGO SUITE */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{ marginBottom: '120px' }}
      >
        <motion.div variants={fadeUpVariant} style={labelStyle}>02. Logo Suite</motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {LOGOS.map((logo) => (
            <motion.div key={logo.label} variants={fadeUpVariant} style={{
              background: '#ffffff',
              border: '1px solid #E5E7EB',
              borderRadius: '18px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform, opacity',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)',
                padding: logo.size === 'large' ? '48px 32px' : '36px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '180px',
              }}>
                <motion.img
                  variants={{
                    hidden: { filter: 'blur(10px)', opacity: 0 },
                    visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2, ease: TWEEN_EASE } }
                  }}
                  src={logo.img}
                  alt={logo.label}
                  style={{
                    maxWidth: '100%',
                    maxHeight: logo.size === 'large' ? '110px' : '80px',
                    objectFit: 'contain',
                    willChange: 'opacity, filter',
                  }}
                />
              </div>
              <div style={{
                padding: '18px 20px',
                borderTop: '1px solid #E5E7EB',
              }}>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#16193e',
                  marginBottom: '4px',
                }}>
                  {logo.label}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#9CA3AF',
                  lineHeight: 1.5,
                }}>
                  {logo.usage}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 03 — COLOR PALETTE */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{ marginBottom: '100px' }}
      >
        <motion.div variants={fadeUpVariant} style={labelStyle}>03. Color Palette</motion.div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
        }}>
          {COLORS.map((color) => (
            <motion.div key={color.hex} variants={fadeUpVariant} style={{ display: 'flex', flexDirection: 'column', gap: '12px', willChange: 'transform, opacity' }}>
              <div style={{
                width: '100%',
                height: '120px',
                borderRadius: '12px',
                background: color.hex,
                border: '1px solid rgba(0,0,0,0.06)',
              }} />
              <div>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#16193e',
                }}>
                  {color.name}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#23296b',
                  marginTop: '2px',
                  fontWeight: 600,
                }}>
                  {color.hex.toUpperCase()}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#23296b',
                  marginTop: '4px',
                  lineHeight: 1.4,
                }}>
                  {color.usage}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 04 — TYPOGRAPHY */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{ marginBottom: '100px' }}
      >
        <motion.div variants={fadeUpVariant} style={labelStyle}>04. Typography</motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <motion.div variants={fadeUpVariant} style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px', willChange: 'transform, opacity' }}>
            <div style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: '#16193e',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              IDEATE
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#23296b',
              marginTop: '10px',
            }}>
              Big Shoulders Display - Bold · Event headlines, titles, hero text
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px', willChange: 'transform, opacity' }}>
            <div style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: '#2c4a8f',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              HEX
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#23296b',
              marginTop: '10px',
            }}>
              Big Shoulders Display - Regular · Wordmark, secondary headings, large labels
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} style={{ willChange: 'transform, opacity' }}>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#6B7280',
              lineHeight: 1.6,
            }}>
              Outfit Regular: Body copy in documents, presentations, and digital materials.
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#23296b',
              marginTop: '10px',
            }}>
              Outfit - Regular · Pairs naturally with the geometric weight of Big Shoulders
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* PRESENTATION MATERIALS */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{ marginBottom: '100px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
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
            Presentation Materials
          </motion.div>
          <motion.div 
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1, ease: TWEEN_EASE } }
            }}
            style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(32,124,169,0.3), transparent)', transformOrigin: 'left' }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[
            { img: 'https://i.ibb.co/spfbLptJ/Screenshot-2026-06-18-015737.png' },
            { img: 'https://i.ibb.co/QjN6bH0R/Screenshot-2026-06-18-015747.png' },
            { img: 'https://i.ibb.co/QvZ1GNT4/Screenshot-2026-06-18-015757.png' },
            { img: 'https://i.ibb.co/mFrfTxGM/Screenshot-2026-06-18-015805.png' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUpVariant} style={{
              width: '100%',
              aspectRatio: '1920 / 1080',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              background: 'rgba(32,124,169,0.04)',
              position: 'relative',
              margin: '0 auto',
            }}>
              <motion.img
                variants={{
                  hidden: { filter: 'blur(10px)', opacity: 0 },
                  visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2, ease: TWEEN_EASE } }
                }}
                src={item.img}
                alt={`Presentation material ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  willChange: 'opacity, filter',
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PRINTING MATERIALS */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
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
            Printing Materials
          </motion.div>
          <motion.div 
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1, ease: TWEEN_EASE } }
            }}
            style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(32,124,169,0.3), transparent)', transformOrigin: 'left' }}
          />
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
          {[
            {
              type: 'link',
              img: 'https://i.ibb.co/Fqfp5P1t/Screenshot-2026-06-18-020135.png',
              href: 'https://drive.google.com/file/d/11kSMt1Ktkkg4NwvsuGqsU7FX3tXMlQF7/view?usp=sharing',
              label: 'View TBS JE Brochure',
            },
            {
              type: 'link',
              img: 'https://i.ibb.co/SXHcS8mf/Screenshot-2026-06-18-021447.png',
              href: '#',
              label: 'Agenda',
            },
            {
              type: 'flip',
              imgFront: 'https://i.ibb.co/6R2hNxtv/Screenshot-2026-06-18-021736.png',
              imgBack: 'https://i.ibb.co/Ps3cWCrr/Screenshot-2026-06-18-021956.png',
              labelFront: 'Notebook Front',
              labelBack: 'Notebook Back',
            },
            {
              type: 'link',
              img: 'https://i.ibb.co/v4qkt3qW/agendaday.jpg',
              href: '#',
              label: 'Agenda',
            },
          ].map((item, i) => {
            if (item.type === 'flip') {
              return <PrintingFlipCard key={i} imgFront={item.imgFront!} imgBack={item.imgBack!} labelFront={item.labelFront!} labelBack={item.labelBack!} />;
            }
            return (
              <React.Fragment key={i}>
                {i === 0 ? (
                  <motion.a
                    variants={fadeUpVariant}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      aspectRatio: '2480 / 3508',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid #E5E7EB',
                      background: 'rgba(32,124,169,0.04)',
                      position: 'relative',
                      margin: '0 auto',
                      display: 'block',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <motion.img
                      variants={{
                        hidden: { filter: 'blur(10px)', opacity: 0 },
                        visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2, ease: TWEEN_EASE } }
                      }}
                      src={item.img}
                      alt={item.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'filter, opacity' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(32,124,169,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                    >
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#ffffff',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}>
                        {item.label}
                      </span>
                    </div>
                  </motion.a>
                ) : (
                  <motion.div
                    variants={fadeUpVariant}
                    style={{
                      width: '100%',
                      aspectRatio: '2480 / 3508',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid #E5E7EB',
                      background: 'rgba(32,124,169,0.04)',
                      position: 'relative',
                      margin: '0 auto',
                      display: 'block',
                      cursor: 'default',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <motion.img
                      variants={{
                        hidden: { filter: 'blur(10px)', opacity: 0 },
                        visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2, ease: TWEEN_EASE } }
                      }}
                      src={item.img}
                      alt={item.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'filter, opacity' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(32,124,169,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                    >
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#ffffff',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        padding: '0 8px',
                      }}>
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      {/* SOCIAL MEDIA PERFORMANCE METRICS */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blockVariants}
        style={{ marginTop: '96px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
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
            Social Media Performance Metrics
          </motion.div>
          <motion.div 
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1, ease: TWEEN_EASE } }
            }}
            style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(32,124,169,0.3), transparent)', transformOrigin: 'left' }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { url: 'https://i.ibb.co/1fHfWbD4/Screenshot-2025-10-07-003034.png', label: 'Facebook Metrics', background: 'rgba(24, 119, 242, 0.8)' },
            { url: 'https://i.ibb.co/LdLBXcmQ/image-6.png', label: 'Instagram Metrics', background: 'linear-gradient(45deg, rgba(250, 126, 30, 0.8), rgba(214, 41, 118, 0.8), rgba(150, 47, 191, 0.8), rgba(79, 91, 213, 0.8))' },
            { url: 'https://i.ibb.co/gM7b3WML/image-1-2.png', label: 'Linkedin Metrics', background: 'rgba(10, 102, 194, 0.8)' }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              className="group cursor-pointer"
              style={{
                width: '100%',
                aspectRatio: '1340 / 900',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                background: 'rgba(32,124,169,0.04)',
                position: 'relative',
                willChange: 'transform, opacity',
              }}
            >
              <motion.img
                variants={{
                  hidden: { filter: 'blur(10px)', opacity: 0 },
                  visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1, delay: 0.2 + i * 0.1, ease: TWEEN_EASE } }
                }}
                src={item.url}
                alt={item.label}
                className="transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'filter, opacity, transform' }}
                referrerPolicy="no-referrer"
              />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center pointer-events-none"
                style={{ background: item.background }}
              >
                <span className="text-white font-outfit font-semibold text-lg md:text-xl tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
