import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  { label: 'LinkedIn', href: SITE_CONFIG.linkedin, external: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial scroll position
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAF9]">
      {/* LEFT SIDEBAR — desktop only */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 hidden md:flex flex-col items-center justify-center bg-transparent z-40">
        <div className="absolute left-1/2 w-[1px] h-full bg-[#E5E7EB] -translate-x-1/2" />
        <span
          className="uppercase text-[#9CA3AF] text-[9px] font-body bg-[#FAFAF9] py-4 relative z-10"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.3em' }}
        >
          {SITE_CONFIG.shortName}
        </span>
      </aside>

      {/* NAV OUTER WRAPPER — always full width, fixed */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? '12px 24px 0' : '0',
          transition: 'padding 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none',
        }}
      >
        {/* NAV INNER PILL — this is what visually transforms */}
        <div
          style={{
            maxWidth: scrolled ? '1200px' : '100%',
            margin: '0 auto',
            borderRadius: scrolled ? '16px' : '0px',
            background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.06)'
              : 'none',
            transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            pointerEvents: 'auto',
          }}
        >
          {/* NAV CONTENT ROW */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '56px',
              paddingLeft: '80px',
              paddingRight: '32px',
            }}
          >
            {/* Left: Name */}
            <a
              href="#"
              style={scrolled ? {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                color: '#0F0F0F',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              } : {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #207ca9 0%, #23296b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => {
                if (scrolled) {
                  e.currentTarget.style.color = '#207ca9';
                } else {
                  e.currentTarget.style.opacity = '0.7';
                }
              }}
              onMouseLeave={e => {
                if (scrolled) {
                  e.currentTarget.style.color = '#0F0F0F';
                } else {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              Mohammed Yessin Driss
            </a>

            {/* Right: Desktop links */}
            <div className="hidden md:flex" style={{ gap: '32px' }}>
              {NAV_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  style={scrolled ? {
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#6B7280',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  } : {
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #207ca9 0%, #23296b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (scrolled) {
                      e.currentTarget.style.color = '#207ca9';
                    } else {
                      e.currentTarget.style.opacity = '0.7';
                    }
                  }}
                  onMouseLeave={e => {
                    if (scrolled) {
                      e.currentTarget.style.color = '#6B7280';
                    } else {
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right: Mobile hamburger */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                display: 'block', width: '20px', height: '1px', background: '#0F0F0F',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                transition: 'transform 0.3s ease',
              }} />
              <span style={{
                display: 'block', width: '20px', height: '1px', background: '#0F0F0F',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }} />
              <span style={{
                display: 'block', width: '20px', height: '1px', background: '#0F0F0F',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                transition: 'transform 0.3s ease',
              }} />
            </button>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div style={{
              padding: '16px 32px 24px',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              {NAV_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#6B7280',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main style={{ paddingLeft: '64px' }}>
        {children}
      </main>
    </div>
  );
}
