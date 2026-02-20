'use client'

import { useState } from 'react'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Productivity Dashboard',
    description: 'A web application that shows employee productivity and performance metrics in real-time with customizable dashboards and reports.',
    category: 'Web Apps',
    image: '/images/projects/dashboard.png',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    links: { live: 'https://example.com' },
  },
  {
    id: 2,
    title: 'Mobile Chat App',
    description: 'Real-time messaging application built with React Native supporting text, images, and file sharing.',
    category: 'Mobile Apps',
    image: '/project-2.jpg',
    tags: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
    links: { github: 'https://github.com/mudassar/chat-app' },
  },
  {
    id: 3,
    title: 'ExpenseFlow',
    description: 'A personal finance management tool that helps users track expenses, set budgets, and visualize spending habits with interactive charts.',
    category: 'Web Apps',
    image: '/images/projects/expenseflow.png',
    tags: ['Next.js', 'Prisma', 'MongoDB', 'Tailwind CSS'],
    links: { live: 'https://expenseflow-three.vercel.app', github: 'https://github.com/mudassir156/expenseflow' },
  },
  {
    id: 4,
    title: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with personalized recommendations.',
    category: 'Mobile Apps',
    image: '/project-4.jpg',
    tags: ['React Native', 'Expo', 'GraphQL', 'Firebase'],
    links: { github: 'https://github.com/mudassar/fitness-tracker' },
  },
  {
    id: 5,
    title: 'Streakly',
    description: 'A habit tracking web app that helps users build and maintain good habits by visualizing streaks and providing motivational insights.',
    category: 'Web Apps',
    image: '/images/projects/streakly.png',
    tags: ['Next.js', 'Fast API', 'MongoDB', 'Tailwind CSS'],
    links: { github: 'https://github.com/mudassir156/streakly' },
  },
  {
    id: 6,
    title: 'Typing Challenge Game',
    description: 'A fun and interactive typing challenge game that helps users improve their typing speed and accuracy.',
    category: 'Web Apps',
    image: '/images/projects/typinggame.png',
    tags: ['Next.js', 'TypeScript', 'CSS', 'JavaScript'],
    links: { live: 'https://typing-challenge-game-tau.vercel.app', github: 'https://github.com/mudassir156/TypingChallengeGame' },
  },
]

type Category = 'All' | 'Web Apps' | 'Mobile Apps' | 'Design'
const categories: Category[] = ['All', 'Web Apps', 'Mobile Apps', 'Design']

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="projects-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .projects-section {
          font-family: 'DM Sans', sans-serif;
          padding: 80px 1.5rem 80px;
          scroll-margin-top: 80px;
          position: relative;
          overflow: hidden;
          background: oklch(0.985 0 0);
        }

        .dark .projects-section {
          background: oklch(0.12 0 0);
        }

        @media (min-width: 768px) {
          .projects-section { padding: 100px 2rem 100px; }
        }

        @media (min-width: 1024px) {
          .projects-section { padding: 120px 2rem 120px; }
        }

        .projects-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
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

        .projects-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: oklch(0.145 0 0);
        }

        .dark .projects-title {
          color: oklch(0.95 0 0);
        }

        /* Filter tabs */
        .filter-track {
          display: inline-flex;
          padding: 4px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 12px;
          gap: 2px;
        }

        .dark .filter-track {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: oklch(0.45 0 0);
          transition: all 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
          border: none;
          background: transparent;
        }

        .dark .filter-btn {
          color: oklch(0.6 0 0);
        }

        .filter-btn:hover {
          color: oklch(0.2 0 0);
          background: rgba(0,0,0,0.04);
        }

        .dark .filter-btn:hover {
          color: oklch(0.85 0 0);
          background: rgba(255,255,255,0.06);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          box-shadow: 0 2px 10px rgba(99,102,241,0.35);
        }

        /* Project cards */
        .project-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.34,1.2,0.64,1);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .dark .project-card {
          background: oklch(0.17 0 0);
          border-color: rgba(255,255,255,0.06);
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.1);
          border-color: rgba(99,102,241,0.2);
        }

        .dark .project-card:hover {
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          border-color: rgba(99,102,241,0.25);
        }

        /* Image area */
        .project-img-wrap {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
        }

        .project-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-img-wrap img {
          transform: scale(1.06);
        }

        /* Overlay */
        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,5,30,0.85) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          gap: 10px;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-link-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .project-link-btn:hover {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: transparent;
          transform: scale(1.1);
        }

        /* Card body */
        .project-body {
          padding: 20px 20px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-category {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 6px;
        }

        .dark .project-category {
          color: #a78bfa;
        }

        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: oklch(0.15 0 0);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .dark .project-title {
          color: oklch(0.92 0 0);
        }

        .project-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: oklch(0.5 0 0);
          font-weight: 300;
          flex: 1;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dark .project-desc {
          color: oklch(0.6 0 0);
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .project-tag {
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 500;
          background: rgba(99,102,241,0.07);
          color: #5155d6;
          letter-spacing: 0.01em;
        }

        .dark .project-tag {
          background: rgba(99,102,241,0.15);
          color: #a5b4fc;
        }

        /* Animations */
        @keyframes projectFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .proj-animate {
          animation: projectFadeIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div className="projects-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 proj-animate">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="projects-title">My Projects</h2>
          <p style={{ color: 'oklch(0.55 0 0)', fontSize: '1rem', marginTop: '8px', fontWeight: 300 }}>
            Recent work across web and mobile platforms
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-10 proj-animate" style={{ animationDelay: '0.1s' }}>
          <div className="filter-track flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card proj-animate"
              style={{ animationDelay: `${0.15 + index * 0.08}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="project-img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.opacity = '0' }}
                />
                <div className="project-overlay">
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="View live">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="View source">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-body">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}