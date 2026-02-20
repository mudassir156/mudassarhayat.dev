'use client'

import { Heart, ArrowUp } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          background: oklch(0.985 0 0);
          border-top: 1px solid rgba(0,0,0,0.07);
          padding: 48px 1.5rem 32px;
        }

        .dark .footer-root {
          background: oklch(0.12 0 0);
          border-top-color: rgba(255,255,255,0.06);
        }

        @media (min-width: 768px) {
          .footer-root {
            padding: 56px 2rem 36px;
          }
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 80% at 50% 120%, rgba(99,102,241,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          margin-bottom: 8px;
        }

        .footer-tagline {
          font-size: 0.82rem;
          color: oklch(0.58 0 0);
          font-weight: 300;
          max-width: 180px;
          line-height: 1.5;
        }

        .dark .footer-tagline {
          color: oklch(0.52 0 0);
        }

        .footer-nav-link {
          font-size: 0.85rem;
          color: oklch(0.5 0 0);
          font-weight: 400;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
        }

        .footer-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }

        .footer-nav-link:hover {
          color: #6366f1;
        }

        .footer-nav-link:hover::after {
          transform: scaleX(1);
        }

        .dark .footer-nav-link {
          color: oklch(0.55 0 0);
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.15), rgba(168,85,247,0.15), transparent);
          margin: 1.5rem 0;
        }

        .footer-copyright {
          font-size: 0.78rem;
          color: oklch(0.6 0 0);
          font-weight: 300;
        }

        .dark .footer-copyright {
          color: oklch(0.48 0 0);
        }

        .built-with {
          font-size: 0.78rem;
          color: oklch(0.6 0 0);
          font-weight: 300;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dark .built-with {
          color: oklch(0.48 0 0);
        }

        .built-with strong {
          color: oklch(0.35 0 0);
          font-weight: 500;
        }

        .dark .built-with strong {
          color: oklch(0.7 0 0);
        }

        /* Back to top button */
        .back-top-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1));
          border: 1px solid rgba(99,102,241,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          color: #6366f1;
        }

        .dark .back-top-btn {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.2);
        }

        .back-top-btn:hover {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: transparent;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(99,102,241,0.3);
        }

        /* Heart pulse */
        .heart-icon {
          animation: heartbeat 1.8s ease-in-out infinite;
          color: #ef4444;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }
      `}</style>

      <div className="footer-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Brand */}
          <div>
            <a href="#home" className="footer-logo">Mudassar</a>
            <p className="footer-tagline">Building digital products with care and craft.</p>
          </div>

          {/* Nav links */}
          <div className="flex justify-start md:justify-center gap-8 flex-wrap">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Projects', href: '#projects' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ].map(item => (
              <a key={item.href} href={item.href} className="footer-nav-link">{item.label}</a>
            ))}
          </div>

          {/* Back to top */}
          <div className="flex justify-start md:justify-end">
            <button onClick={scrollToTop} className="back-top-btn" aria-label="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="footer-divider" />

        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="built-with">
            Built with <Heart className="heart-icon w-3.5 h-3.5" fill="currentColor" /> by <strong>Mudassar Hayat</strong>
          </p>
          <p className="footer-copyright">
            © {currentYear} Mudassar Hayat. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  )
}