import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
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

    const updateHashOnScroll = () => {
      const sections = [
        { id: 'contact', hash: '/#contact' },
        { id: 'about', hash: '/#about' },
        { id: 'work', hash: '/#work' },
      ];
      // Hero is at top
      if (window.scrollY < 300) {
        window.history.replaceState(null, '', '/');
        return;
      }
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            window.history.replaceState(null, '', section.hash);
            return;
          }
        }
      }
      window.history.replaceState(null, '', '/#work');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', updateHashOnScroll, { passive: true });
    // Check initial scroll position
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', updateHashOnScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return;
    setMenuOpen(false);

    if (href === '#about') {
      e.preventDefault();
      window.scrollTo({ top: 2600, behavior: 'smooth' });
      window.history.replaceState(null, '', '/#about');
    } else if (href === '#work') {
      e.preventDefault();
      const element = document.getElementById('work');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 4500, behavior: 'smooth' });
      }
      window.history.replaceState(null, '', '/#work');
    } else if (href === '#contact') {
      e.preventDefault();
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.replaceState(null, '', '/#contact');
    }
  };

  const scrollToFlowSection = (titleKeyword: string) => {
    const sections = document.querySelectorAll('[data-flow-section]');
    for (const section of Array.from(sections)) {
      const h2 = section.querySelector('h2');
      if (h2 && h2.textContent && h2.textContent.toLowerCase().includes(titleKeyword.toLowerCase())) {
        const rect = section.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
        break;
      }
    }
    setMenuOpen(false);
    window.history.replaceState(null, '', '/#work');
  };

  const scrollToVisualWork = () => {
    const el = document.getElementById('visual-work');
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
    }
    setMenuOpen(false);
    window.history.replaceState(null, '', '/#work');
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF]">
      {/* NAV OUTER WRAPPER — always full width, fixed */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? '12px clamp(8px, 3vw, 24px) 0' : '0',
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
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '56px',
              paddingLeft: 'clamp(16px, 4vw, 32px)',
              paddingRight: 'clamp(16px, 4vw, 32px)',
            }}
          >
            {/* Left: Name */}
            <a
              href="#"
              style={scrolled ? {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 3vw, 13px)',
                color: '#0F0F0F',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              } : {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 3vw, 13px)',
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

            {/* Center: Desktop links */}
            <div className="hidden md:flex" style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              gap: '32px'
            }}>
              {NAV_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleNavClick(e, item.href, item.external)}
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

        </div>
      </div>

      {/* Mobile Full-Screen Overlay Sitemap */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'radial-gradient(circle at 85% 15%, rgba(32, 124, 169, 0.5) 0%, #2e3785 45%, #16193e 100%)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'scale(1)' : 'scale(0.97)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 28px',
          overflowY: 'auto',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Decorative background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontSize: 'clamp(70px, 26vw, 220px)', fontWeight: 800, color: 'rgba(255,255,255,0.03)', letterSpacing: '0.06em', transform: 'rotate(-12deg)' }}>
            DRISS
          </span>
        </div>

        {/* Top bar: Brand title + sleek close button */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#207ca9] animate-pulse shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.7)' }} className="uppercase">
              Navigation · Index
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 flex items-center justify-center text-white transition-all duration-300 group"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Main navigation links */}
        <div className="flex-1 flex flex-col justify-center gap-3 relative z-10 max-w-lg w-full mx-auto py-4">
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.replaceState(null, '', '/'); }}
            className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-white/[0.07] active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-white/10"
          >
            <div className="flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                01
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-white/90 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                Hero
              </span>
            </div>
            <span className="text-white/40 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
              ↗
            </span>
          </button>

          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 2600, behavior: 'smooth' }); window.history.replaceState(null, '', '/#about'); }}
            className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-white/[0.07] active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-white/10"
          >
            <div className="flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                02
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-white/90 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                About
              </span>
            </div>
            <span className="text-white/40 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
              ↗
            </span>
          </button>

          <div className="flex flex-col">
            <button
              onClick={() => { setMenuOpen(false); const el = document.getElementById('work'); if (el) el.scrollIntoView({ behavior: 'smooth' }); else window.scrollTo({ top: 4500, behavior: 'smooth' }); window.history.replaceState(null, '', '/#work'); }}
              className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-white/[0.07] active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-white/10"
            >
              <div className="flex items-center">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                  03
                </span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-white/90 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                  Work
                </span>
              </div>
              <span className="text-white/40 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
                ↗
              </span>
            </button>

            {/* Indented Project Tree */}
            <div className="ml-5 sm:ml-7 pl-4 sm:pl-5 border-l-2 border-[#207ca9]/30 flex flex-col gap-1.5 my-1">
              {[
                { label: 'TBS Junior Enterprise', onClick: () => scrollToFlowSection('TBS Junior Enterprise') },
                { label: 'Bume.tn', onClick: () => scrollToFlowSection('Bume.tn') },
                { label: 'CROKI', onClick: () => scrollToFlowSection('CROKI') },
                { label: 'Skills4Trade', onClick: () => scrollToFlowSection('Skills4Trade') },
                { label: 'Visual Work', onClick: () => scrollToVisualWork() }
              ].map(sub => (
                <button
                  key={sub.label}
                  onClick={sub.onClick}
                  className="group/sub flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/10 active:scale-[0.99] transition-all duration-200 text-left w-full border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#207ca9] font-mono text-sm font-bold group-hover/sub:translate-x-0.5 transition-transform duration-200">↳</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} className="text-sm sm:text-base text-white/70 group-hover/sub:text-white transition-colors duration-200">
                      {sub.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#207ca9] opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all duration-200">
                    Explore →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setMenuOpen(false); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); window.history.replaceState(null, '', '/#contact'); }}
            className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-white/[0.07] active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-white/10"
          >
            <div className="flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                04
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-white/90 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                Contact
              </span>
            </div>
            <span className="text-white/40 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
              ↗
            </span>
          </button>
        </div>

        {/* Bottom footer area with prominent LinkedIn & Email CTAs */}
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 w-full">
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#207ca9] hover:bg-[#207ca9]/90 active:scale-[0.98] text-white font-outfit font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(32,124,169,0.35)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.7a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
            </svg>
            <span>LinkedIn Profile ↗</span>
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-white hover:bg-white/90 active:scale-[0.98] text-[#16193e] font-outfit font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            <svg className="w-4 h-4 text-[#207ca9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Email Me ↗</span>
          </a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main style={{ paddingLeft: '0px' }}>
        {children}
      </main>
    </div>
  );
}
