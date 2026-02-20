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
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Detect active section based on scroll position
      const sections = navItems.map((item) => item.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveItem(navItems[i].label)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update pill position whenever activeItem changes
  useEffect(() => {
    const activeRef = itemRefs.current[activeItem]
    const navEl = navRef.current
    if (activeRef && navEl) {
      const navRect = navEl.getBoundingClientRect()
      const itemRect = activeRef.getBoundingClientRect()
      setPillStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      })
    }
  }, [activeItem, mounted])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .navbar-root {
          font-family: 'DM Sans', sans-serif;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .logo-text::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .logo-text:hover::after {
          transform: scaleX(1);
        }

        /* Glass nav container */
        .nav-glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.06),
            0 1px 0 rgba(255, 255, 255, 0.3) inset;
        }

        .dark .nav-glass {
          background: rgba(10, 10, 20, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.05) inset;
        }

        /* Desktop nav pill track */
        .nav-track {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .dark .nav-track {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Animated sliding pill */
        .nav-pill {
          position: absolute;
          top: 4px;
          height: calc(100% - 8px);
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 999px;
          transition: left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 12px rgba(99, 102, 241, 0.45), 0 0 0 1px rgba(99, 102, 241, 0.2);
          pointer-events: none;
        }

        .nav-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, transparent 100%);
        }

        /* Nav link styles */
        .nav-link {
          position: relative;
          z-index: 1;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(30, 30, 50, 0.65);
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }

        .dark .nav-link {
          color: rgba(220, 220, 255, 0.55);
        }

        .nav-link.active {
          color: #ffffff;
        }

        .nav-link:not(.active):hover {
          color: rgba(30, 30, 50, 0.95);
        }

        .dark .nav-link:not(.active):hover {
          color: rgba(220, 220, 255, 0.9);
        }

        /* Theme toggle button */
        .theme-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.07);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .dark .theme-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .theme-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
          transform: scale(1.05);
        }

        .theme-btn:active {
          transform: scale(0.95);
        }

        .theme-icon {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
        }

        /* Mobile toggle */
        .mobile-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.07);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .mobile-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Mobile menu dropdown */
        .mobile-menu {
          overflow: hidden;
          animation: slideDown 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }

        @keyframes slideDown {
          from { 
            opacity: 0;
            max-height: 0;
            transform: translateY(-8px);
          }
          to { 
            opacity: 1;
            max-height: 320px;
            transform: translateY(0);
          }
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(30, 30, 50, 0.7);
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .dark .mobile-link {
          color: rgba(210, 210, 240, 0.7);
        }

        .mobile-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          opacity: 0;
          transition: opacity 0.2s ease;
          border-radius: inherit;
        }

        .mobile-link:hover::before,
        .mobile-link.active::before {
          opacity: 1;
        }

        .mobile-link.active {
          color: #6366f1;
          font-weight: 600;
        }

        .dark .mobile-link.active {
          color: #a78bfa;
        }

        .mobile-link-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          flex-shrink: 0;
        }

        .mobile-link.active .mobile-link-dot {
          opacity: 1;
          transform: scale(1.2);
        }

        /* Top scroll progress bar */
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
          border-radius: 2px;
          transition: width 0.1s ease;
        }

        /* Navbar entrance animation */
        @keyframes navEnter {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-enter {
          animation: navEnter 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }

        /* ── Responsive layout via CSS (no Tailwind md: dependency) ── */

        /* Desktop nav: hidden on mobile, shown on desktop */
        .nav-desktop {
          display: none;
        }

        /* Mobile hamburger button: shown on mobile, hidden on desktop */
        .nav-mobile-btn {
          display: flex;
        }

        /* Mobile dropdown: always block, visibility controlled by JS */
        .nav-mobile-menu {
          display: block;
        }

        /* Navbar inner row height */
        .nav-inner-row {
          height: 64px;
        }

        /* Logo size mobile */
        .logo-text {
          font-size: 1.2rem;
        }

        @media (min-width: 768px) {
          /* Show desktop nav track */
          .nav-desktop {
            display: flex;
          }

          /* Hide hamburger on desktop */
          .nav-mobile-btn {
            display: none !important;
          }

          /* Hide mobile dropdown on desktop no matter what */
          .nav-mobile-menu {
            display: none !important;
          }

          /* Taller nav row on desktop */
          .nav-inner-row {
            height: 80px;
          }

          /* Larger logo on desktop */
          .logo-text {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <nav className="navbar-root fixed top-0 w-full z-50 transition-all duration-500 nav-enter">
        <div style={{ transition: 'all 0.5s', padding: scrolled ? '12px 16px' : '0' }}>
          <div
            className={scrolled ? 'nav-glass' : ''}
            style={{
              transition: 'all 0.5s',
              ...(scrolled
                ? { maxWidth: '56rem', margin: '0 auto', borderRadius: '1rem', padding: '0 20px' }
                : { width: '100%', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)' }
              )
            }}
          >
            <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 20px' }}>
              {/* Main nav row */}
              <div
                className="nav-inner-row"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'height 0.3s' }}
              >
                {/* Logo */}
                <a href="#home" className="logo-text" style={{ userSelect: 'none', textDecoration: 'none' }}>
                  Mudassar
                </a>

                {/* Desktop Nav Track — CSS hides this on mobile */}
                <div ref={navRef} className="nav-desktop nav-track">
                  <div
                    className="nav-pill"
                    style={{ left: pillStyle.left, width: pillStyle.width }}
                  />
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      ref={(el) => { itemRefs.current[item.label] = el }}
                      className={`nav-link ${activeItem === item.label ? 'active' : ''}`}
                      onClick={() => setActiveItem(item.label)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Right controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Theme toggle — always visible */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="theme-btn"
                      aria-label="Toggle theme"
                    >
                      <span className="theme-icon">
                        {theme === 'dark' ? (
                          <Sun className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Moon className="w-4 h-4 text-indigo-500" />
                        )}
                      </span>
                    </button>
                  )}

                  {/* Hamburger — CSS hides this on desktop */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="nav-mobile-btn mobile-btn"
                    aria-label="Toggle menu"
                  >
                    <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                      <span style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'opacity 0.2s, transform 0.2s',
                        opacity: mobileMenuOpen ? 0 : 1,
                        transform: mobileMenuOpen ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
                      }}>
                        <Menu className="w-5 h-5" />
                      </span>
                      <span style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'opacity 0.2s, transform 0.2s',
                        opacity: mobileMenuOpen ? 1 : 0,
                        transform: mobileMenuOpen ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
                      }}>
                        <X className="w-5 h-5" />
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile dropdown — CSS forces display:none on desktop */}
              {mobileMenuOpen && (
                <div className="nav-mobile-menu mobile-menu" style={{ paddingBottom: '16px', paddingTop: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`mobile-link ${activeItem === item.label ? 'active' : ''}`}
                        onClick={() => {
                          setActiveItem(item.label)
                          setMobileMenuOpen(false)
                        }}
                      >
                        {/* <span className="mobile-link-dot" /> */}
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}