'use client'

const skills = {
  'Frontend': ['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vue.js'],
  'Backend': ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase', 'GraphQL'],
  'Mobile': ['React Native', 'Expo', 'Native iOS', 'Native Android', 'Firebase', 'Redux Native'],
  'Tools & Platforms': ['Git', 'Docker', 'AWS', 'Vercel', 'GitHub', 'Figma', 'VS Code'],
}

const skillIcons: Record<string, string> = {
  Frontend: '⬡',
  Backend: '◈',
  Mobile: '◉',
  'Tools & Platforms': '◎',
}

export function AboutSection() {
  return (
    <section id="about" className="about-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section {
          font-family: 'DM Sans', sans-serif;
          /* Fix mobile: ensure enough top padding since navbar is fixed */
          padding: 80px 1.5rem 80px;
          scroll-margin-top: 80px;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .about-section {
            padding: 100px 2rem 100px;
          }
        }

        @media (min-width: 1024px) {
          .about-section {
            padding: 120px 2rem 120px;
          }
        }

        .about-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(99,102,241,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 90% 80%, rgba(168,85,247,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 12px;
        }

        .section-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          border-radius: 2px;
        }

        .about-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: oklch(0.145 0 0);
          margin-bottom: 0.5rem;
        }

        .dark .about-title {
          color: oklch(0.95 0 0);
        }

        .about-subtitle {
          color: oklch(0.55 0 0);
          font-size: 1rem;
          font-weight: 300;
          margin-bottom: 3rem;
        }

        .dark .about-subtitle {
          color: oklch(0.6 0 0);
        }

        .about-text-lead {
          font-size: 1.05rem;
          line-height: 1.8;
          color: oklch(0.25 0 0);
          margin-bottom: 1.25rem;
          font-weight: 400;
        }

        .dark .about-text-lead {
          color: oklch(0.82 0 0);
        }

        .about-text {
          font-size: 0.97rem;
          line-height: 1.8;
          color: oklch(0.45 0 0);
          margin-bottom: 1.25rem;
          font-weight: 300;
        }

        .dark .about-text {
          color: oklch(0.62 0 0);
        }

        /* Profile in about */
        .about-image-wrap {
          position: relative;
          max-width: 380px;
          width: 100%;
        }

        .about-img-card {
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/5;
          position: relative;
        }

        .about-img-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          z-index: 0;
        }

        .about-img-inner {
          position: absolute;
          inset: 2px;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1;
        }

        .about-img-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Skill card decoration */
        .about-deco-card {
          position: absolute;
          bottom: -16px;
          right: -16px;
          background: white;
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 10;
          border: 1px solid rgba(99,102,241,0.1);
        }

        .dark .about-deco-card {
          background: oklch(0.2 0 0);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.08);
        }

        /* Skills section */
        .skills-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: oklch(0.145 0 0);
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .dark .skills-title {
          color: oklch(0.95 0 0);
        }

        .skill-card {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(99,102,241,0.1);
          border-radius: 18px;
          padding: 1.5rem;
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.34,1.2,0.64,1);
          position: relative;
          overflow: hidden;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .skill-card:hover {
          border-color: rgba(99,102,241,0.25);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(99,102,241,0.1);
        }

        .skill-card:hover::before {
          transform: scaleX(1);
        }

        .dark .skill-card {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.07);
        }

        .dark .skill-card:hover {
          border-color: rgba(99,102,241,0.3);
          box-shadow: 0 16px 40px rgba(99,102,241,0.15);
        }

        .skill-category-icon {
          font-size: 1.25rem;
          margin-bottom: 4px;
          display: block;
        }

        .skill-category-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: oklch(0.2 0 0);
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .dark .skill-category-name {
          color: oklch(0.85 0 0);
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 500;
          background: rgba(99,102,241,0.07);
          color: #5155d6;
          margin: 3px 3px 3px 0;
          transition: all 0.15s ease;
        }

        .skill-tag:hover {
          background: rgba(99,102,241,0.15);
          transform: translateY(-1px);
        }

        .dark .skill-tag {
          background: rgba(99,102,241,0.15);
          color: #a5b4fc;
        }

        .dark .skill-tag:hover {
          background: rgba(99,102,241,0.25);
        }

        /* Animations */
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .about-animate { animation: aboutFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .about-delay-1 { animation-delay: 0.1s; }
        .about-delay-2 { animation-delay: 0.2s; }
        .about-delay-3 { animation-delay: 0.3s; }
        .about-delay-4 { animation-delay: 0.4s; }
      `}</style>

      <div className="about-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 about-animate">
          <span className="section-eyebrow">Who I am</span>
          <h2 className="about-title">About Me</h2>
          <p className="about-subtitle">A developer who cares about craft</p>
        </div>

        {/* Bio + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          <div className="about-animate about-delay-1">
            <p className="about-text-lead">
              I'm a passionate full-stack developer with over 5 years of experience building beautiful, functional applications.
            </p>
            <p className="about-text">
              I specialize in React Native for mobile development and modern web technologies for creating scalable web solutions. My approach combines clean code architecture with user-focused design — I believe in creating applications that not only work perfectly but also provide an exceptional experience.
            </p>
            <p className="about-text">
              I'm constantly learning new technologies and best practices to stay ahead in this fast-paced industry. When I'm not coding, you can find me contributing to open-source projects or sharing knowledge with the developer community.
            </p>

            {/* Highlight chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.5rem' }}>
              {['Clean Code', 'User-First', 'Performance', 'Open Source'].map(tag => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="about-animate about-delay-2 flex justify-center lg:justify-end">
            <div className="about-image-wrap">
              <div className="about-img-card">
                <div className="about-img-inner">
                  <img
                    src="/images/profile/profile.png"
                    alt="Mudassar Hayat"
                  />
                </div>
              </div>
              <div className="about-deco-card">
                <p style={{ color: '#6366f1', marginBottom: '2px' }}>✦ Full Stack</p>
                <p style={{ color: '#a855f7' }}>5+ yrs experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="about-animate about-delay-3">
          <h3 className="skills-title">Skills & Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={category}
                className="skill-card"
                style={{ animationDelay: `${0.3 + index * 0.08}s` }}
              >
                <span className="skill-category-icon">{skillIcons[category]}</span>
                <h4 className="skill-category-name">{category}</h4>
                <div>
                  {skillList.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}