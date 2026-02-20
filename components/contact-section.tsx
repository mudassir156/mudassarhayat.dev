"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    )
      return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ← must be FIRST, before anything else

    if (!validateForm()) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-section {
          font-family: 'DM Sans', sans-serif;
          padding: 80px 1.5rem 80px;
          scroll-margin-top: 80px;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .contact-section { padding: 100px 2rem 100px; }
        }
        @media (min-width: 1024px) {
          .contact-section { padding: 120px 2rem 120px; }
        }

        .contact-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 80% 20%, rgba(99,102,241,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(168,85,247,0.06) 0%, transparent 60%);
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

        .contact-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: oklch(0.145 0 0);
        }

        .dark .contact-title {
          color: oklch(0.95 0 0);
        }

        /* Info cards */
        .info-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: all 0.25s ease;
        }

        .dark .info-card {
          background: oklch(0.17 0 0);
          border-color: rgba(255,255,255,0.07);
        }

        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.2);
        }

        .info-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: oklch(0.6 0 0);
          margin-bottom: 3px;
        }

        .dark .info-label { color: oklch(0.55 0 0); }

        .info-value {
          font-size: 0.9rem;
          font-weight: 500;
          color: #6366f1;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .info-value:hover { color: #4f46e5; }
        .dark .info-value { color: #a78bfa; }

        /* Form */
        .form-wrap {
          background: white;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 2rem;
        }

        .dark .form-wrap {
          background: oklch(0.17 0 0);
          border-color: rgba(255,255,255,0.07);
        }

        .form-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: oklch(0.3 0 0);
          margin-bottom: 7px;
          text-transform: uppercase;
        }

        .dark .form-label {
          color: oklch(0.65 0 0);
        }

        .form-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          background: oklch(0.985 0 0);
          border: 1.5px solid rgba(0,0,0,0.08);
          color: oklch(0.15 0 0);
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
          outline: none;
        }

        .dark .form-input {
          background: oklch(0.12 0 0);
          border-color: rgba(255,255,255,0.08);
          color: oklch(0.9 0 0);
        }

        .form-input::placeholder {
          color: oklch(0.65 0 0);
        }

        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
          background: white;
        }

        .dark .form-input:focus {
          background: oklch(0.145 0 0);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        textarea.form-input {
          resize: none;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.4);
        }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Connect panel */
        .connect-panel {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.06) 50%, rgba(236,72,153,0.04) 100%);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 20px;
          padding: 2rem;
          height: 100%;
        }

        .dark .connect-panel {
          background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(236,72,153,0.06) 100%);
          border-color: rgba(99,102,241,0.18);
        }

        .connect-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: oklch(0.15 0 0);
          margin-bottom: 1rem;
        }

        .dark .connect-title {
          color: oklch(0.92 0 0);
        }

        .connect-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: oklch(0.45 0 0);
          font-weight: 300;
          margin-bottom: 1.5rem;
        }

        .dark .connect-text {
          color: oklch(0.6 0 0);
        }

        .detail-chip {
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.06);
          margin-bottom: 10px;
        }

        .dark .detail-chip {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }

        .chip-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6366f1;
          margin-bottom: 3px;
        }

        .chip-value {
          font-size: 0.85rem;
          color: oklch(0.4 0 0);
          font-weight: 400;
        }

        .dark .chip-value {
          color: oklch(0.65 0 0);
        }

        .social-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: white;
          border: 1px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: oklch(0.4 0 0);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .dark .social-btn {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.08);
          color: oklch(0.65 0 0);
        }

        .social-btn:hover {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(99,102,241,0.3);
        }

        /* Status alerts */
        .alert-success {
          padding: 12px 16px;
          border-radius: 10px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #15803d;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dark .alert-success {
          color: #86efac;
          background: rgba(34,197,94,0.1);
          border-color: rgba(34,197,94,0.2);
        }

        .alert-error {
          padding: 12px 16px;
          border-radius: 10px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          color: #b91c1c;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .dark .alert-error {
          color: #fca5a5;
          background: rgba(239,68,68,0.1);
        }

        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .c-animate { animation: contactFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .c-delay-1 { animation-delay: 0.1s; }
        .c-delay-2 { animation-delay: 0.2s; }
        .c-delay-3 { animation-delay: 0.3s; }
      `}</style>

      <div className="contact-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 c-animate">
          <span className="section-eyebrow">Contact</span>
          <h2 className="contact-title">Get In Touch</h2>
          <p
            style={{
              color: "oklch(0.55 0 0)",
              fontSize: "1rem",
              marginTop: "8px",
              fontWeight: 300,
            }}
          >
            Let's work together on your next project
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 c-animate c-delay-1">
          {[
            {
              icon: <Mail className="w-5 h-5 text-indigo-500" />,
              label: "Email",
              value: "imudassarhayat@gmail.com",
              href: "mailto:imudassarhayat@gmail.com",
            },
            {
              icon: <Phone className="w-5 h-5 text-indigo-500" />,
              label: "Phone",
              value: "+92 312 1560289",
              href: "tel:+923121560289",
            },
            {
              icon: <MapPin className="w-5 h-5 text-indigo-500" />,
              label: "Location",
              value: "Pakistan",
              href: null,
            },
          ].map((item) => (
            <div key={item.label} className="info-card">
              <div className="info-icon">{item.icon}</div>
              <div>
                <p className="info-label">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="info-value">
                    {item.value}
                  </a>
                ) : (
                  <p
                    className="info-value"
                    style={{ textDecoration: "none", cursor: "default" }}
                  >
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form + Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — takes 3 cols */}
          <div className="lg:col-span-3 c-animate c-delay-2">
            <div className="form-wrap">
              {submitStatus === "success" && (
                <div className="alert-success">
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="alert-error">
                  Please fill in all fields with valid information.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Project inquiry"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Connect panel — 2 cols */}
          <div className="lg:col-span-2 c-animate c-delay-3">
            <div className="connect-panel">
              <h3 className="connect-title">Let's Connect</h3>
              <p className="connect-text">
                Always interested in new projects and opportunities. Whether you
                have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="detail-chip">
                <p className="chip-label">Response Time</p>
                <p className="chip-value">Typically within 24 hours</p>
              </div>
              <div className="detail-chip">
                <p className="chip-label">Open To</p>
                <p className="chip-value">
                  Freelance, full-time & collaborations
                </p>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "oklch(0.5 0 0)",
                    marginBottom: "10px",
                  }}
                >
                  Social
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    {
                      href: "https://github.com/mudassir156",
                      icon: <Github className="w-5 h-5" />,
                      label: "GitHub",
                    },
                    {
                      href: "https://pk.linkedin.com/in/mudassir-hayat-ab43b7262",
                      icon: <Linkedin className="w-5 h-5" />,
                      label: "LinkedIn",
                    },
                    // { href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
