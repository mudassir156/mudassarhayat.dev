'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Menu, X, Moon, Sun } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)

      // Active section detection
      const sections = navItems.map((item) => item.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveItem(navItems[i].label)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        /* ─── CSS Custom Properties ─── */
        :root {
          --nav-accent: #7c3aed;
          --nav-accent-2: #db2777;
          --nav-glow: rgba(124, 58, 237, 0.18);
          --nav-text: #1a1523;
          --nav-muted: rgba(26, 21, 35, 0.45);
          --nav-surface: rgba(255, 255, 255, 0.72);
          --nav-border: rgba(124, 58, 237, 0.1);
          --nav-radius: 16px;
        }

        .dark {
          --nav-text: #f0eaff;
          --nav-muted: rgba(240, 234, 255, 0.4);
          --nav-surface: rgba(12, 8, 24, 0.75);
          --nav-border: rgba(124, 58, 237, 0.18);
        }

        /* ─── Root wrapper ─── */
        .nb-root {
          font-family: 'Outfit', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
        }

        /* ─── Scroll progress bar ─── */
        .nb-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--nav-accent), var(--nav-accent-2));
          transition: width 0.15s ease;
          z-index: 10;
        }

        /* ─── Outer shell: transitions between floating pill and full-width bar ─── */
        .nb-shell {
          transition: padding 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nb-shell.is-top {
          padding: 0;
        }
        .nb-shell.is-scrolled {
          padding: 12px 20px;
        }

        /* ─── Inner container ─── */
        .nb-inner {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: visible;
        }

        /* Full-width bar style (at top) */
        .nb-inner.is-top {
          max-width: 100%;
          margin: 0;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(1.8);
          -webkit-backdrop-filter: blur(20px) saturate(1.8);
          border-bottom: 1px solid rgba(124, 58, 237, 0.07);
          box-shadow: none;
        }

        .dark .nb-inner.is-top {
          background: rgba(10, 6, 20, 0.88);
          border-bottom-color: rgba(124, 58, 237, 0.1);
        }

        /* Scrolled: dark pill floated */
        .nb-inner.is-scrolled {
          max-width: 860px;
          margin: 0 auto;
          border-radius: 20px;
          background: var(--nav-surface);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid var(--nav-border);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 20px 60px rgba(0, 0, 0, 0.1),
            0 4px 16px var(--nav-glow);
        }

        

        .dark .nb-inner.is-scrolled {
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 20px 60px rgba(0, 0, 0, 0.45),
            0 4px 16px var(--nav-glow);
        }

        /* ─── Row ─── */
        .nb-row {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          transition: height 0.4s ease, padding 0.4s ease;
        }

        .nb-inner.is-scrolled .nb-row {
          height: 60px;
          padding: 0 24px;
        }

        /* ─── Logo ─── */
        .nb-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          user-select: none;
        }

        .nb-logo-mark {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--nav-accent) 0%, var(--nav-accent-2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 14px var(--nav-glow);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }

        .nb-logo:hover .nb-logo-mark {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 6px 20px var(--nav-glow);
        }

        .nb-logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--nav-text);
          letter-spacing: -0.025em;
          transition: color 0.2s;
        }

        .nb-logo-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--nav-accent), var(--nav-accent-2));
          display: inline-block;
          margin-left: 1px;
          margin-bottom: 6px;
          vertical-align: bottom;
        }

        /* ─── Desktop nav links ─── */
        .nb-links {
          display: none;
          align-items: center;
          gap: 2px;
          background: rgba(0,0,0,0.035);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 999px;
          padding: 5px;
        }

        .dark .nb-links {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }

        @media (min-width: 768px) {
          .nb-links { display: flex; }
          .nb-mobile-btn { display: none !important; }
          .nb-mobile-menu { display: none !important; }
        }

        .nb-link {
          position: relative;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--nav-muted);
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: color 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .nb-link.active {
          color: #fff;
          background: linear-gradient(135deg, var(--nav-accent), #9333ea);
          box-shadow: 0 2px 14px var(--nav-glow), 0 0 0 1px rgba(124,58,237,0.2);
          pointer-events: none;
        }

        .nb-link:not(.active):hover {
          color: var(--nav-text);
          background: rgba(124,58,237,0.07);
        }

        /* ─── Right controls ─── */
        .nb-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Hire Me button (desktop only) */
        .nb-cta {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: white;
          background: linear-gradient(135deg, var(--nav-accent) 0%, var(--nav-accent-2) 100%);
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px var(--nav-glow);
          position: relative;
          overflow: hidden;
        }

        .nb-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent);
          border-radius: inherit;
          pointer-events: none;
        }

        .nb-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px var(--nav-glow);
        }

        .nb-cta:active {
          transform: translateY(0);
        }

        @media (min-width: 768px) {
          .nb-cta { display: flex; }
        }

        /* ─── Theme toggle ─── */
        .nb-theme-btn {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.07);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .dark .nb-theme-btn {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
        }

        .nb-theme-btn:hover {
          background: rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.3);
          transform: rotate(15deg) scale(1.05);
        }

        .nb-theme-icon {
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
        }

        /* ─── Mobile hamburger ─── */
        .nb-mobile-btn {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.07);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .nb-mobile-btn {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
        }

        .nb-mobile-btn:hover {
          background: rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.3);
        }

        /* ─── Mobile dropdown ─── */
        .nb-mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          animation: nbMobileIn 0.35s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border-radius: 0 0 20px 20px;
          border: 1px solid rgba(124, 58, 237, 0.1);
          border-top: none;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.14);
          z-index: 100;
        }

        .dark .nb-mobile-menu {
          background: rgba(10, 6, 20, 0.98);
          border-color: rgba(124, 58, 237, 0.18);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
        }

        @keyframes nbMobileIn {
          from { opacity: 0; max-height: 0; transform: translateY(-10px); }
          to   { opacity: 1; max-height: 400px; transform: translateY(0); }
        }

        .nb-mobile-inner {
          padding: 12px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .nb-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          border-radius: 13px;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--nav-muted);
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .nb-mobile-link:hover {
          background: rgba(124,58,237,0.07);
          color: var(--nav-text);
        }

        .nb-mobile-link.active {
          background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(219,39,119,0.08));
          color: var(--nav-accent);
          font-weight: 600;
        }

        .dark .nb-mobile-link.active {
          color: #c4b5fd;
        }

        .nb-mobile-arrow {
          font-size: 0.75rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
        }

        .nb-mobile-link.active .nb-mobile-arrow,
        .nb-mobile-link:hover .nb-mobile-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* mobile footer row */
        .nb-mobile-footer {
          margin-top: 8px;
          padding: 12px 16px 4px;
          border-top: 1px solid var(--nav-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nb-mobile-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--nav-muted);
        }

        .nb-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: nbPulse 2s ease infinite;
        }

        @keyframes nbPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.0); }
        }

        .nb-mobile-cta {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: white;
          background: linear-gradient(135deg, var(--nav-accent), var(--nav-accent-2));
          text-decoration: none;
          box-shadow: 0 4px 14px var(--nav-glow);
        }

        /* ─── Entrance animation ─── */
        @keyframes nbEnter {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb-root {
          animation: nbEnter 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }
      `}</style>

      <nav className="nb-root">
        {/* Scroll progress */}
        <div
          className="nb-progress"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className={`nb-shell ${scrolled ? 'is-scrolled' : 'is-top'}`} style={{ position: 'relative' }}>
          <div className={`nb-inner ${scrolled ? 'is-scrolled' : 'is-top'}`}>
            <div className="nb-row">

              {/* Logo */}
              <a href="#home" className="nb-logo">
                <div className="nb-logo-mark">M</div>
                <span className="nb-logo-text">
                  mudassir<span className="nb-logo-dot" />
                </span>
              </a>

              {/* Desktop nav links */}
              <div ref={navRef} className="nb-links">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    ref={(el) => { itemRefs.current[item.label] = el }}
                    className={`nb-link ${activeItem === item.label ? 'active' : ''}`}
                    onClick={() => setActiveItem(item.label)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Right controls */}
              <div className="nb-controls">

                {/* Hire Me CTA */}
                <a href="#contact" className="nb-cta">
                  <span>Hire Me</span>
                  <span style={{ fontSize: '0.7rem' }}>✦</span>
                </a>

                {/* Theme toggle */}
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="nb-theme-btn"
                    aria-label="Toggle theme"
                  >
                    <span className="nb-theme-icon">
                      {theme === 'dark'
                        ? <Sun style={{ width: 16, height: 16, color: '#fbbf24' }} />
                        : <Moon style={{ width: 16, height: 16, color: '#7c3aed' }} />
                      }
                    </span>
                  </button>
                )}

                {/* Hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="nb-mobile-btn"
                  aria-label="Toggle menu"
                >
                  <div style={{ position: 'relative', width: 20, height: 20 }}>
                    <span style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'opacity 0.2s, transform 0.2s',
                      opacity: mobileMenuOpen ? 0 : 1,
                      transform: mobileMenuOpen ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
                    }}>
                      <Menu style={{ width: 18, height: 18, color: 'var(--nav-text)' }} />
                    </span>
                    <span style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'opacity 0.2s, transform 0.2s',
                      opacity: mobileMenuOpen ? 1 : 0,
                      transform: mobileMenuOpen ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
                    }}>
                      <X style={{ width: 18, height: 18, color: 'var(--nav-text)' }} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown — absolutely positioned OUTSIDE nb-inner, floats over page */}
          {mobileMenuOpen && (
            <div className="nb-mobile-menu">
              <div className="nb-mobile-inner">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`nb-mobile-link ${activeItem === item.label ? 'active' : ''}`}
                    onClick={() => {
                      setActiveItem(item.label)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.label}
                    <span className="nb-mobile-arrow">→</span>
                  </a>
                ))}

                <div className="nb-mobile-footer">
                  <div className="nb-mobile-status">
                    <div className="nb-status-dot" />
                    Available for work
                  </div>
                  <a href="#contact" className="nb-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                    Hire Me
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </nav>
    </>
  )
}