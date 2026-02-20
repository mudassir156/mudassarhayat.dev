'use client'

import { ArrowRight, Phone, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      id="home"
      className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .hero-section {
          font-family: 'DM Sans', sans-serif;
          padding-top: 100px;
          padding-bottom: 60px;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        @media (min-width: 768px) {
          .hero-section {
            padding-top: 120px;
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        .hero-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 70% 40%, rgba(99,102,241,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 20% 80%, rgba(168,85,247,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(236,72,153,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .dark .hero-mesh {
          background:
            radial-gradient(ellipse 80% 50% at 70% 40%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 20% 80%, rgba(168,85,247,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(236,72,153,0.08) 0%, transparent 60%);
        }

        /* Animated grid lines */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 10px;
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #6366f1;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }

        .dark .hero-badge {
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.12));
          border-color: rgba(99,102,241,0.3);
          color: #a78bfa;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: oklch(0.145 0 0);
          margin-bottom: 1.5rem;
        }

        .dark .hero-title {
          color: oklch(0.95 0 0);
        }

        .hero-name {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .hero-desc {
          font-size: 1.05rem;
          line-height: 1.75;
          color: oklch(0.45 0 0);
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .dark .hero-desc {
          color: oklch(0.65 0 0);
        }

        /* Stats */
        .stat-item {
          position: relative;
          padding: 1rem 1.25rem;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(99,102,241,0.1);
          border-radius: 14px;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .dark .stat-item {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }

        .stat-item:hover {
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.12);
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.78rem;
          color: oklch(0.55 0 0);
          font-weight: 400;
          margin-top: 2px;
        }

        .dark .stat-label {
          color: oklch(0.6 0 0);
        }

        /* CTA Buttons */
        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 12px;
          letter-spacing: 0.01em;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(99,102,241,0.35);
          white-space: nowrap;
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }

        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: transparent;
          color: oklch(0.25 0 0);
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.12);
          letter-spacing: 0.01em;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .dark .hero-cta-secondary {
          color: oklch(0.85 0 0);
          border-color: rgba(255,255,255,0.14);
        }

        .hero-cta-secondary:hover {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
          color: #6366f1;
          transform: translateY(-2px);
        }

        /* Profile card */
        .profile-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 1;
          max-width: 420px;
          width: 100%;
        }

        .profile-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 26px;
          background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
          z-index: 0;
        }

        .profile-inner {
          position: absolute;
          inset: 2px;
          border-radius: 22px;
          overflow: hidden;
          z-index: 1;
          background: oklch(0.97 0 0);
        }

        .dark .profile-inner {
          background: oklch(0.2 0 0);
        }

        .profile-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .profile-card:hover img {
          transform: scale(1.03);
        }

        /* Floating decorative elements */
        .deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(99,102,241,0.15);
          animation: spin-slow 20s linear infinite;
          pointer-events: none;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Entrance animations */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroFadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero-content { animation: heroFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .hero-image { animation: heroFadeRight 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .hero-stat-1 { animation: heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .hero-stat-2 { animation: heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hero-stat-3 { animation: heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
        .hero-btns { animation: heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
      `}</style>

      <div className="hero-grid" />
      <div className="hero-mesh" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="hero-content">
            {/* <div className="hero-badge">
              <span className="badge-dot" />
              Available for work
            </div> */}

            <h1 className="hero-title">
              Hi, I'm{' '}
              <span className="hero-name">Mudassar</span>
              <br />
              Full Stack Dev
            </h1>

            <p className="hero-desc">
              Specializing in React Native and modern web development. I craft scalable mobile &amp; web applications with clean architecture and user-focused design.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="stat-item hero-stat-1">
                <p className="stat-number">5+</p>
                <p className="stat-label">Years Exp.</p>
              </div>
              <div className="stat-item hero-stat-2">
                <p className="stat-number">20+</p>
                <p className="stat-label">Projects Done</p>
              </div>
              <div className="stat-item hero-stat-3">
                <p className="stat-number">15+</p>
                <p className="stat-label">Happy Clients</p>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-btns flex flex-col sm:flex-row gap-3">
              <a href="#projects" className="hero-cta-primary">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="hero-cta-secondary">
                <Phone className="w-4 h-4" />
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="hero-image hidden md:flex justify-center items-center">
            <div className="relative" style={{ width: '360px' }}>
              {/* Decorative rings — contained, no overflow */}
              <div className="deco-ring" style={{ width: '110%', height: '110%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              <div className="deco-ring" style={{ width: '95%', height: '95%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDirection: 'reverse', animationDuration: '14s' }} />

              <div className="profile-card" style={{ width: '360px' }}>
                <div className="profile-inner">
                  <img
                    src="/images/profile/profile.png"
                    alt="Mudassar Hayat"
                  />
                </div>
              </div>

              {/* Floating badge — placed below-right, fully within bounds
              <div style={{
                position: 'absolute',
                bottom: '-18px',
                right: '20px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                whiteSpace: 'nowrap',
                animation: 'heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s both',
              }}>
                 React Native Expert
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}