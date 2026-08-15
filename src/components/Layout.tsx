import { useEffect, useState, useRef } from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_ITEMS = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.contact'), href: '#contact' },
    { label: 'LinkedIn', href: SITE_CONFIG.linkedin, external: true },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-lang-switcher]')) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial scroll position
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
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

            {/* Right: Language Toggle & Mobile hamburger */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div style={{ position: 'relative' }} data-lang-switcher>
                <button
                  onClick={() => setLangOpen(o => !o)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    border: '1px solid rgba(32,124,169,0.25)',
                    background: scrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 2px 12px rgba(32,124,169,0.12), inset 0 1px 1px rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: scrolled ? '#23296b' : '#23296b',
                    letterSpacing: '0.04em',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(32,124,169,0.5)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(32,124,169,0.2), inset 0 1px 1px rgba(255,255,255,0.7)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(32,124,169,0.25)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(32,124,169,0.12), inset 0 1px 1px rgba(255,255,255,0.6)';
                  }}
                >
                  <span style={{ display: 'inline-flex', borderRadius: '2px', overflow: 'hidden' }}>
                    {language === 'en' ? (
                      <svg width="18" height="13.5" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                        <clipPath id="s_btn"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                        <clipPath id="t_btn"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
                        <g clipPath="url(#s_btn)">
                          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t_btn)" stroke="#C8102E" strokeWidth="4"/>
                          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                        </g>
                      </svg>
                    ) : (
                      <div style={{ border: '1px solid rgba(0,0,0,0.1)', display: 'inline-flex' }}>
                        <svg width="16" height="11.5" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
                          <rect width="1" height="2" fill="#002395" />
                          <rect width="1" height="2" x="1" fill="#fff" />
                          <rect width="1" height="2" x="2" fill="#ED2939" />
                        </svg>
                      </div>
                    )}
                  </span>
                  <span>{language === 'en' ? 'EN' : 'FR'}</span>
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {langOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '130px',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '14px',
                    border: '1px solid rgba(32,124,169,0.15)',
                    boxShadow: '0 8px 32px rgba(35,41,107,0.14), 0 2px 8px rgba(32,124,169,0.08), inset 0 1px 1px rgba(255,255,255,0.9)',
                    overflow: 'hidden',
                    zIndex: 100,
                  }}>
                    {[
                      { code: 'en', label: 'English', flag: '🇬🇧' },
                      { code: 'fr', label: 'Français', flag: '🇫🇷' },
                    ].map((option, i) => (
                      <button
                        key={option.code}
                        onClick={() => { setLanguage(option.code as 'en' | 'fr'); setLangOpen(false); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '11px 16px',
                          background: language === option.code ? 'rgba(32,124,169,0.08)' : 'transparent',
                          border: 'none',
                          borderTop: i > 0 ? '1px solid rgba(32,124,169,0.08)' : 'none',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: language === option.code ? 700 : 400,
                          fontSize: '13px',
                          color: language === option.code ? '#23296b' : '#6B7280',
                          textAlign: 'left',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(32,124,169,0.06)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = language === option.code ? 'rgba(32,124,169,0.08)' : 'transparent'; }}
                      >
                        <span style={{ display: 'inline-flex', borderRadius: '2px', overflow: 'hidden' }}>
                          {option.code === 'en' ? (
                            <svg width="18" height="13.5" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                              <clipPath id={`s_menu_${i}`}><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                              <clipPath id={`t_menu_${i}`}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
                              <g clipPath={`url(#s_menu_${i})`}>
                                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                                <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#t_menu_${i})`} stroke="#C8102E" strokeWidth="4"/>
                                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                              </g>
                            </svg>
                          ) : (
                            <div style={{ border: '1px solid rgba(0,0,0,0.1)', display: 'inline-flex' }}>
                              <svg width="16" height="11.5" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
                                <rect width="1" height="2" fill="#002395" />
                                <rect width="1" height="2" x="1" fill="#fff" />
                                <rect width="1" height="2" x="2" fill="#ED2939" />
                              </svg>
                            </div>
                          )}
                        </span>
                        <span>{option.label}</span>
                        {language === option.code && (
                          <svg style={{ marginLeft: 'auto' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#207ca9" strokeWidth="3" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
      </div>

      {/* Mobile Full-Screen Overlay Sitemap */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 40%, #e0f2fe 70%, #207ca9 140%)',
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
          <span style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontSize: 'clamp(70px, 26vw, 220px)', fontWeight: 800, color: 'rgba(32, 124, 169, 0.05)', letterSpacing: '0.06em', transform: 'rotate(-12deg)' }}>
            DRISS
          </span>
        </div>

        {/* Top bar: Brand title + sleek close button */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#207ca9] animate-pulse shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.22em', color: '#64748b' }} className="uppercase">
              {t('menu.navIndex')}
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-11 h-11 rounded-full bg-black/[0.03] hover:bg-black/[0.06] active:scale-95 border border-black/5 flex items-center justify-center text-[#16193e] transition-all duration-300 group"
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
            className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-[#207ca9]/10 active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-[#207ca9]/20"
          >
            <div className="flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                01
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-[#16193e]/90 group-hover:text-[#207ca9] group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                {t('menu.hero')}
              </span>
            </div>
            <span className="text-[#16193e]/30 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
              ↗
            </span>
          </button>

          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 2600, behavior: 'smooth' }); window.history.replaceState(null, '', '/#about'); }}
            className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-[#207ca9]/10 active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-[#207ca9]/20"
          >
            <div className="flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                02
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-[#16193e]/90 group-hover:text-[#207ca9] group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                {t('menu.about')}
              </span>
            </div>
            <span className="text-[#16193e]/30 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
              ↗
            </span>
          </button>

          <div className="flex flex-col">
            <button
              onClick={() => { setMenuOpen(false); const el = document.getElementById('work'); if (el) el.scrollIntoView({ behavior: 'smooth' }); else window.scrollTo({ top: 4500, behavior: 'smooth' }); window.history.replaceState(null, '', '/#work'); }}
              className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-[#207ca9]/10 active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-[#207ca9]/20"
            >
              <div className="flex items-center">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                  03
                </span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-[#16193e]/90 group-hover:text-[#207ca9] group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                  {t('menu.work')}
                </span>
              </div>
              <span className="text-[#16193e]/30 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
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
                { label: t('visual.title'), onClick: () => scrollToVisualWork() }
              ].map(sub => (
                <button
                  key={sub.label}
                  onClick={sub.onClick}
                  className="group/sub flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#207ca9]/5 active:scale-[0.99] transition-all duration-200 text-left w-full border border-transparent hover:border-[#207ca9]/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#207ca9] font-mono text-sm font-bold group-hover/sub:translate-x-0.5 transition-transform duration-200">↳</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} className="text-sm sm:text-base text-[#16193e]/70 group-hover/sub:text-[#207ca9] transition-colors duration-200">
                      {sub.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#207ca9] opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all duration-200">
                    {t('menu.explore')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setMenuOpen(false); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); window.history.replaceState(null, '', '/#contact'); }}
            className="group flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-[#207ca9]/10 active:scale-[0.99] transition-all duration-300 w-full text-left border border-transparent hover:border-[#207ca9]/20"
          >
            <div className="flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#207ca9] bg-[#207ca9]/15 px-2.5 py-1 rounded-full border border-[#207ca9]/30 mr-4 group-hover:bg-[#207ca9] group-hover:text-white transition-all duration-300">
                04
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 8vw, 44px)' }} className="text-[#16193e]/90 group-hover:text-[#207ca9] group-hover:translate-x-1.5 transition-all duration-300 tracking-tight">
                {t('menu.contact')}
              </span>
            </div>
            <span className="text-[#16193e]/30 group-hover:text-[#207ca9] group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all duration-300 text-lg">
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
            <span>{t('menu.linkedin')}</span>
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-white hover:bg-white/90 active:scale-[0.98] text-[#16193e] font-outfit font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            <svg className="w-4 h-4 text-[#207ca9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>{t('menu.email')}</span>
          </a>
          <a
            href={SITE_CONFIG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#10b981] hover:bg-[#059669] active:scale-[0.98] text-white font-outfit font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.24-.19-.49-.31z"/>
            </svg>
            <span>{t('menu.whatsapp')}</span>
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
