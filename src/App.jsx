import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "About", "Contact"];

const HERO_PROOF_POINTS = [
  "Hospitality technology",
  "Enterprise SaaS",
  "Revenue strategy",
  "AI-assisted prototypes",
];

const PROJECTS = [
  {
    id: 1,
    tag: "Hospitality Tech Prototype",
    title: "Hotel Multi-Date Rate Scanner",
    problem:
      "Many travelers already know the hotel they want. When their dates are flexible, they need a faster way to scan rates across possible stay dates without repeating the same search.",
    description: [
      "Built a feature prototype that helps travelers compare live rates for a preferred hotel across multiple date combinations in one decision-friendly view. If rates are above the traveler’s budget, they can set a price alert that automatically checks for updates every six hours.",
      "Defined the product problem, user workflow, booking logic, alerting experience, and API requirements, using AI-assisted development, SerpAPI, GitHub, and Render to move from concept to live prototype.",
    ],
    link: "https://hotelscanner.paul-totah.com",
    linkLabel: "View Live Prototype →",
    metrics: [
      { label: "Status", value: "Deployed" },
      { label: "Focus", value: "Hotel rates" },
    ],
    color: "#4FFFB0",
  },
  {
    id: 2,
    tag: "Mobile App Enhancement Prototype",
    title: <>Alaska Airlines <span style={{ whiteSpace: "nowrap" }}>App Enhancement</span></>,
    problem:
      "An Alaska Airlines Atmos member can check their progress toward status, including miles earned and miles remaining, but already-booked trips are not factored into the calculation.",
    description: [
      "Designed a UX enhancement to the existing Account section that adds projected status progress from already-booked trips.",
      "The prototype adds an Upcoming Trips list, earned-versus-projected progress, and a status summary card showing the remaining mileage gap after booked trips.",
    ],
    metrics: [
      { label: "Status", value: "Shared concept" },
      { label: "Focus", value: "Loyalty status UX" },
    ],
    modalImage: "/alaska-atmos-linkedin.png",
    modalLabel: "View UX Enhancement Suggestion →",
    modalAlt: "Alaska Airlines Atmos upcoming trips status projection UX enhancement concept",
    color: "#FF6FD8",
  },
];

const SKILL_GROUPS = [
  {
    title: "Product Discovery & Strategy",
    skills: [
      "Customer Discovery",
      "Product Strategy",
      "Roadmap Thinking",
      "Problem Framing",
      "PRDs & User Stories",
      "Platform & Integration Design",
    ],
  },
  {
    title: "Revenue, Forecasting & Analytics",
    skills: [
      "Revenue Management",
      "Dynamic Pricing",
      "Revenue Forecasting",
      "Product Analytics",
      "Reporting Workflows",
      "AI Workflow Automation",
    ],
  },
  {
    title: "Execution & Delivery",
    skills: [
      "Root Cause Analysis",
      "Defect Triage",
      "Release Readiness & GTM Support",
      "Feature Activation",
      "Support Escalation Analysis",
    ],
  },
  {
    title: "Hospitality & Enterprise SaaS",
    skills: [
      "Hotel Commercial Strategy",
      "Hospitality Technology",
      "Enterprise SaaS",
      "Customer Adoption",
      "Value Realization",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AccentCircle({ children }) {
  return (
    <span className="accent-circle">
      {children}
      <span aria-hidden="true" />
    </span>
  );
}

function TypeWriter({ words }) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    const speed = deleting ? 50 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, cIdx + 1));
        if (cIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCIdx(c => c + 1);
        }
      } else {
        setText(word.slice(0, cIdx - 1));
        if (cIdx - 1 === 0) {
          setDeleting(false);
          setWIdx(i => (i + 1) % words.length);
          setCIdx(0);
        } else {
          setCIdx(c => c - 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [cIdx, deleting, wIdx, words]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function ProjectCard({ project, index, onOpenModal }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        "--project-color": project.color,
        transform: inView
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="project-orb" />
      <span className="eyebrow project-tag">{project.tag}</span>
      <h3>
        {project.title}
      </h3>
      {project.problem && (
        <p className="project-problem">
          <span>Problem: </span>
          {project.problem}
        </p>
      )}
      <div className="project-description">
        {(Array.isArray(project.description) ? project.description : [project.description]).map((paragraph) => (
          <p key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer"
          className="text-link"
          onMouseEnter={e => e.target.style.opacity = 0.75}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          {project.linkLabel}
        </a>
      )}
      {project.modalImage && (
        <button type="button" onClick={() => onOpenModal(project)}
          className="text-link button-link"
          onMouseEnter={e => e.target.style.opacity = 0.75}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          {project.modalLabel}
        </button>
      )}
      <div className="project-metrics">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <div>{m.value}</div>
            <div>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [aboutRef, aboutInView] = useInView();
  const [contactRef, contactInView] = useInView();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [activeModalProject, setActiveModalProject] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio contact from ${formState.name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );

    window.location.href = `mailto:paultotah@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="portfolio-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        #root { width: 100%; border-inline: none; text-align: initial; background: #0A0A0F; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0F; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gridFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes drawCircle { to { stroke-dashoffset: 0; } }
        @keyframes underlineSweep { 0%, 100% { transform: scaleX(0.82); opacity: 0.7; } 50% { transform: scaleX(1); opacity: 1; } }
        ::selection { background: #4FFFB044; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0F; } ::-webkit-scrollbar-thumb { background: #4FFFB055; border-radius: 2px; }
        input, textarea { outline: none; }
        a { text-decoration: none; color: inherit; }
        button, input, textarea { font: inherit; }

        .portfolio-shell {
          --bg: #0A0A0F;
          --panel: #111119;
          --panel-soft: #0D0D14;
          --line: #222230;
          --line-soft: #1a1a28;
          --text: #f0f0fa;
          --muted: #8888aa;
          --muted-strong: #aaaacc;
          --dim: #555577;
          --accent: #4FFFB0;
          background:
            radial-gradient(circle at 12% 12%, rgba(79,255,176,0.08), transparent 26rem),
            radial-gradient(circle at 88% 32%, rgba(111,221,255,0.06), transparent 28rem),
            var(--bg);
          min-height: 100vh;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        .eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem clamp(1.2rem, 4vw, 3rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          transition: all 0.4s ease;
        }

        .site-nav.scrolled {
          background: rgba(10,10,15,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #ffffff0a;
        }

        .brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          color: var(--text);
        }

        .brand span {
          color: var(--accent);
        }

        .nav-links {
          display: flex;
          gap: clamp(1rem, 3vw, 2rem);
        }

        .nav-links button {
          background: none;
          border: none;
          color: var(--muted-strong);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .nav-links button:hover {
          color: var(--accent);
        }

        .hero-section {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 7rem clamp(1.2rem, 4vw, 3rem) 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          inset: clamp(1.2rem, 4vw, 3rem);
          border: 1px solid rgba(79,255,176,0.12);
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(17,17,25,0.78), rgba(13,13,20,0.68));
          box-shadow: 0 28px 90px rgba(0,0,0,0.28);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(79,255,176,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,255,176,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, black, transparent 72%);
          pointer-events: none;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: gridFloat 9s ease-in-out infinite;
        }

        .hero-orb.one {
          top: 18%;
          right: 5%;
          width: 28rem;
          height: 28rem;
          background: radial-gradient(circle, rgba(79,255,176,0.09) 0%, transparent 66%);
        }

        .hero-orb.two {
          bottom: 8%;
          left: -8%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(111,221,255,0.06) 0%, transparent 65%);
          animation-direction: reverse;
        }

        .hero-content {
          max-width: 980px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .hero-mark {
          width: 54px;
          height: 54px;
          border: 1px solid rgba(79,255,176,0.45);
          border-radius: 50%;
          display: inline-grid;
          place-items: center;
          margin-bottom: 4rem;
          color: var(--accent);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          box-shadow: 0 0 28px rgba(79,255,176,0.12);
        }

        .hero-mark::before {
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 18px rgba(79,255,176,0.48);
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.4rem, 9vw, 7.8rem);
          font-weight: 800;
          line-height: 1.06;
          color: var(--text);
          letter-spacing: -0.045em;
          margin: 1.1rem 0 1.45rem;
          padding-bottom: 0.08em;
        }

        .hero-title em {
          font-style: italic;
          font-weight: 600;
          letter-spacing: -0.06em;
        }

        .accent-circle {
          position: relative;
          display: inline-block;
          white-space: nowrap;
        }

        .accent-circle span {
          position: absolute;
          inset: -0.03em -0.12em 0.02em;
          border: 2px solid rgba(79,255,176,0.58);
          border-radius: 50%;
          transform: rotate(-5deg) scaleY(0.82);
          pointer-events: none;
        }

        .accent-circle span::after {
          content: "";
          position: absolute;
          inset: 4px -2px -2px 3px;
          border: 1px solid rgba(79,255,176,0.26);
          border-radius: 50%;
          transform: rotate(9deg);
        }

        .hero-subtitle {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.55rem, 4vw, 3.1rem);
          font-weight: 600;
          line-height: 1.15;
          color: #5a5a7a;
          margin-bottom: 2rem;
        }

        .typewriter {
          color: var(--accent);
          white-space: nowrap;
        }

        .typewriter-cursor {
          animation: blink 1s step-end infinite;
          opacity: 1;
        }

        .hero-copy {
          color: #7777aa;
          max-width: 650px;
          line-height: 1.75;
          margin: 0 auto 2.35rem;
          font-size: 1.05rem;
        }

        .proof-list {
          list-style: none;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 0 2.5rem;
        }

        .proof-list li {
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--muted-strong);
          background: rgba(17,17,25,0.88);
          padding: 0.5rem 0.85rem;
          font-size: 0.78rem;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
        }

        .cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .primary-cta,
        .secondary-cta {
          padding: 0.85rem 2rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.2s;
          position: relative;
        }

        .primary-cta {
          background: var(--accent);
          color: var(--bg);
          border: none;
        }

        .primary-cta:hover {
          background: #7FFFCC;
          transform: translateY(-2px);
        }

        .secondary-cta {
          background: transparent;
          color: var(--text);
          border: 1px solid #333344;
        }

        .secondary-cta:hover {
          border-color: #4FFFB066;
          color: var(--accent);
          transform: translateY(-2px);
        }

        .secondary-cta::after {
          content: "";
          position: absolute;
          left: 1.65rem;
          right: 1.65rem;
          bottom: 0.62rem;
          height: 1px;
          background: var(--accent);
          transform-origin: left;
          animation: underlineSweep 2.4s ease-in-out infinite;
        }

        .animated-underline {
          position: relative;
          display: inline-block;
          white-space: nowrap;
        }

        .animated-underline::after {
          content: "";
          position: absolute;
          left: 0.04em;
          right: 0.02em;
          bottom: 0.02em;
          height: 0.08em;
          border-radius: 999px;
          background: var(--accent);
          transform-origin: left;
          animation: underlineSweep 2.4s ease-in-out infinite;
          opacity: 0.75;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: clamp(1.2rem, 4vw, 3rem);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          opacity: 0.42;
        }

        .scroll-indicator div {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, var(--accent));
          animation: fadeIn 2s 1s ease forwards;
          opacity: 0;
        }

        .scroll-indicator span {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--accent);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .section {
          padding: 6.5rem clamp(1.2rem, 4vw, 3rem);
        }

        .section-inner {
          max-width: 1120px;
          margin: 0 auto;
        }

        .section-heading {
          margin-bottom: 3.4rem;
          text-align: center;
        }

        .section-heading h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.04em;
          line-height: 1.18;
          margin: 0.75rem 0 1.35rem;
          padding-bottom: 0.06em;
        }

        .section-heading p:not(.eyebrow) {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.75;
          max-width: 680px;
          margin: 0 auto;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 470px), 1fr));
          gap: 1.5rem;
        }

        .project-card {
          background: linear-gradient(180deg, rgba(17,17,25,0.96), rgba(13,13,20,0.96));
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: clamp(1.5rem, 4vw, 2.4rem);
          transition: all 0.35s cubic-bezier(.22,1,.36,1);
          cursor: default;
          position: relative;
          overflow: hidden;
          min-height: 100%;
        }

        .project-card:hover {
          border-color: var(--project-color);
          background: #16161f;
        }

        .project-orb {
          position: absolute;
          top: -70px;
          right: -60px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--project-color) 18%, transparent), transparent 68%);
          pointer-events: none;
        }

        .project-tag {
          display: inline-block;
          color: var(--project-color);
          background: color-mix(in srgb, var(--project-color) 12%, transparent);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 1rem;
        }

        .project-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.35rem, 3vw, 1.9rem);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.9rem;
          letter-spacing: -0.02em;
        }

        .project-problem {
          font-size: 0.92rem;
          line-height: 1.75;
          color: var(--muted-strong);
          margin: 0 0 1rem;
        }

        .project-problem span {
          color: var(--project-color);
          font-weight: 700;
        }

        .project-description {
          margin: 0 0 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .project-description p {
          font-size: 0.92rem;
          line-height: 1.75;
          color: var(--muted);
          margin: 0 0 0.8rem;
        }

        .text-link {
          display: inline-block;
          margin-bottom: 1.5rem;
          color: var(--project-color);
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }

        .button-link {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .project-metrics {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .project-metrics > div > div:first-child {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--project-color);
          font-family: 'Syne', sans-serif;
        }

        .project-metrics > div > div:last-child {
          font-size: 0.75rem;
          color: #666688;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .about-section {
          background: linear-gradient(180deg, var(--panel-soft), #0A0A0F);
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4FFFB033, transparent);
        }

        .about-grid {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: start;
        }

        .about-copy,
        .skills-panel {
          transition: all 0.7s cubic-bezier(.22,1,.36,1);
        }

        .about-copy h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.95rem, 4vw, 3.15rem);
          font-weight: 800;
          color: var(--text);
          margin: 0.85rem 0 1.5rem;
          line-height: 1.08;
          letter-spacing: -0.04em;
        }

        .about-copy p {
          color: var(--muted);
          line-height: 1.8;
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
          max-width: 650px;
        }

        .about-copy strong,
        .about-copy span {
          color: var(--text);
          font-weight: 700;
        }

        .stats {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 2.5rem;
        }

        .stats > div {
          min-width: 120px;
        }

        .stats > div > div:first-child {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent);
          font-family: 'Syne', sans-serif;
          line-height: 1;
        }

        .stats > div > div:last-child {
          font-size: 0.72rem;
          color: var(--dim);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }

        .skills-panel {
          border: 1px solid var(--line-soft);
          border-radius: 24px;
          background: rgba(17,17,25,0.72);
          padding: clamp(1.4rem, 4vw, 2rem);
        }

        .skill-group + .skill-group {
          margin-top: 1.35rem;
          padding-top: 1.35rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .skill-group h3 {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          color: var(--text);
          margin: 0 0 0.65rem;
          letter-spacing: -0.01em;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .skill-list span {
          padding: 0.45rem 1rem;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 0.82rem;
          color: #9999bb;
          background: var(--panel);
          transition: all 0.2s;
          cursor: default;
        }

        .skill-list span:hover {
          border-color: #4FFFB055;
          color: var(--accent);
          background: #4FFFB00e;
        }

        .contact-card {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
          border: 1px solid rgba(79,255,176,0.14);
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(17,17,25,0.86), rgba(13,13,20,0.9));
          padding: clamp(2rem, 6vw, 4rem);
          transition: all 0.7s cubic-bezier(.22,1,.36,1);
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: "";
          position: absolute;
          top: -160px;
          right: -120px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79,255,176,0.08), transparent 68%);
          pointer-events: none;
        }

        .contact-card h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--text);
          margin: 0.75rem 0 1.2rem;
          letter-spacing: -0.04em;
          line-height: 1.18;
          padding-bottom: 0.08em;
        }

        .contact-card p:not(.eyebrow) {
          color: #7777aa;
          line-height: 1.75;
          margin: 0 auto 3rem;
          font-size: 0.95rem;
          max-width: 620px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
          position: relative;
          z-index: 1;
        }

        .contact-form input,
        .contact-form textarea {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 0.95rem 1.25rem;
          color: var(--text);
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #4FFFB066;
          box-shadow: 0 0 0 4px rgba(79,255,176,0.05);
        }

        .contact-form textarea {
          resize: vertical;
        }

        .contact-form button {
          background: var(--accent);
          color: var(--bg);
          padding: 0.95rem;
          border: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }

        .contact-form button:hover {
          background: #7FFFCC;
          transform: translateY(-2px);
        }

        .social-links {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--line-soft);
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .social-links a {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--dim);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .social-links a:hover {
          color: var(--accent);
        }

        .site-footer {
          padding: 1.5rem clamp(1.2rem, 4vw, 3rem);
          text-align: center;
          border-top: 1px solid var(--panel);
        }

        .site-footer span {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: #333355;
          letter-spacing: 0.1em;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-content {
          position: relative;
          max-width: 420px;
          width: 100%;
        }

        .modal-content button {
          position: absolute;
          top: -2.75rem;
          right: 0;
          background: transparent;
          border: 1px solid #333344;
          border-radius: 999px;
          color: var(--text);
          width: 36px;
          height: 36px;
          cursor: pointer;
          font-size: 1.2rem;
          line-height: 1;
        }

        .modal-content img {
          display: block;
          width: 100%;
          max-height: 82vh;
          object-fit: contain;
          border-radius: 18px;
          border: 1px solid var(--line);
          box-shadow: 0 24px 80px rgba(0,0,0,0.45);
        }

        @media (max-width: 820px) {
          .nav-links { gap: 0.85rem; }
          .hero-mark { margin-bottom: 2.6rem; }
          .hero-section::before { inset: 0.75rem; border-radius: 22px; }
          .about-grid { grid-template-columns: 1fr; }
          .section-heading { text-align: left; }
          .section-heading p:not(.eyebrow) { margin-left: 0; }
          .scroll-indicator { display: none; }
        }

        @media (max-width: 560px) {
          .site-nav { align-items: flex-start; gap: 1rem; }
          .nav-links { flex-wrap: wrap; justify-content: flex-end; }
          .hero-content { text-align: left; }
          .hero-mark { margin-left: 0; }
          .proof-list,
          .cta-row { justify-content: flex-start; }
          .contact-card { text-align: left; }
          .social-links { justify-content: flex-start; gap: 1rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <span className="brand" onClick={() => scrollTo("hero")}>
          PAUL<span style={{ color: "#4FFFB0" }}>.</span>
        </span>
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
            >{l}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="hero-section">
        <div className="hero-grid" />
        <div className="hero-orb one" />
        <div className="hero-orb two" />

        <div className="hero-content">
          <div className="hero-mark" aria-hidden="true" />
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s ease forwards" : "none" }}>
            <p className="eyebrow">
              ↳ Product Manager
            </p>
          </div>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.1s ease forwards" : "none" }}>
            <h1 className="hero-title">
              <em>Paul</em> <AccentCircle>Totah</AccentCircle>
            </h1>
          </div>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.2s ease forwards" : "none" }}>
            <h2 className="hero-subtitle">
              Hospitality tech and SaaS products that{" "}<TypeWriter words={["scale.", "convert.", "delight.", "ship.", "matter."]} />
            </h2>
          </div>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.3s ease forwards" : "none" }}>
            <p className="hero-copy">
              I’m a product manager connecting hospitality operations, revenue strategy, and enterprise SaaS experience with AI-assisted prototyping to turn customer problems into shippable product ideas.
            </p>
          </div>
          <ul
            aria-label="Product management focus areas"
            className="proof-list"
            style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.35s ease forwards" : "none" }}
          >
            {HERO_PROOF_POINTS.map((point) => (
              <li key={point}>
                {point}
              </li>
            ))}
          </ul>
          <div className="cta-row" style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.4s ease forwards" : "none" }}>
            <button onClick={() => scrollTo("work")}
              className="primary-cta"
            >View My Work ↓</button>
            <button onClick={() => scrollTo("contact")}
              className="secondary-cta"
            >Get in Touch</button>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="scroll-indicator">
          <div />
          <span>SCROLL</span>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section">
        <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>
            Hospitality product thinking <span className="animated-underline">in practice</span>
          </h2>
          <p>
            Short case studies showing how I frame customer problems, define product workflows, and move from discovery to testable prototypes.
          </p>
        </div>
        <div className="work-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpenModal={setActiveModalProject} />)}
        </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} className="section about-section">
        <div className="about-grid">
          <div className="about-copy" style={{ transform: aboutInView ? "translateX(0)" : "translateX(-40px)", opacity: aboutInView ? 1 : 0 }}>
            <p className="eyebrow">About Me</p>
            <h2>
              I connect customer problems to shippable product ideas.
            </h2>
            <p>
              My path into product management started before I had the title. I’ve worked across nonprofit, hospitality, enterprise SaaS at <span style={{ color: "#f0f0fa", fontWeight: 700 }}>SAP</span>, hospitality tech at <span style={{ color: "#f0f0fa", fontWeight: 700 }}>Duetto</span>, and hotel commercial strategy with <span style={{ color: "#f0f0fa", fontWeight: 700 }}>Hyatt Hotels & Resorts</span>, often close to the customer problems that products are meant to solve.
            </p>
            <p>
              That background shapes how I work: understand the real workflow, find the business reason behind the friction, and translate it into a practical product direction.
            </p>
            <p>
              Today, I pair that judgment with AI-forward tools like <span style={{ color: "#f0f0fa", fontWeight: 700 }}>Claude</span>, <span style={{ color: "#f0f0fa", fontWeight: 700 }}>Cursor</span>, and modern prototyping workflows to move faster from problem to testable solution.
            </p>
            <div className="stats">
              {[
                ["6,300+", <>Hotels in product scope at <span style={{ color: "#f0f0fa", fontWeight: 700 }}>Duetto</span></>],
                ["€45M", <>Enterprise SaaS portfolio at <span style={{ color: "#f0f0fa", fontWeight: 700 }}>SAP</span></>],
                ["10+ Years", "Hospitality sales & revenue experience"],
              ].map(([val, label]) => (
                <div key={val}>
                  <div>{val}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-panel" style={{ transform: aboutInView ? "translateX(0)" : "translateX(40px)", opacity: aboutInView ? 1 : 0, transitionDelay: "0.15s" }}>
            <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Core Skills</p>
            <div>
              {SKILL_GROUPS.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h3>
                    {group.title}
                  </h3>
                  <div className="skill-list">
                    {group.skills.map((s, i) => (
                      <span key={s} style={{ animationDelay: `${i * 0.05}s` }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} className="section">
        <div className="contact-card" style={{ transform: contactInView ? "translateY(0)" : "translateY(40px)", opacity: contactInView ? 1 : 0 }}>
          <p className="eyebrow">Contact</p>
          <h2>
            Let’s build something great together.
          </h2>
          <p>
            Open to new opportunities, advisory roles, and interesting conversations. <span style={{ whiteSpace: "nowrap" }}>Drop me a line and I’ll get back to you promptly.</span>
          </p>

          <form onSubmit={handleContactSubmit} className="contact-form">
            {[["name", "Your name", "text"], ["email", "Email address", "email"]].map(([field, placeholder, type]) => (
              <input key={field} type={type} placeholder={placeholder} value={formState[field]}
                onChange={e => setFormState(s => ({ ...s, [field]: e.target.value }))}
              />
            ))}
            <textarea placeholder="Your message" rows={5} value={formState.message}
              onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
            />
            <button type="submit"
            >Send Message →</button>
          </form>

          <div className="social-links">
            {[["LinkedIn", "https://linkedin.com/in/paultotah/"], ["GitHub", "https://github.com/paultotah-7fttrvl/my-portfolio"]].map(([label, href]) => (
              <a key={label} href={href}
              >{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>
          © 2026 PAUL TOTAH — PRODUCT MANAGER
        </span>
      </footer>

      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalProject.modalAlt}
          onClick={() => setActiveModalProject(null)}
          className="modal-backdrop"
        >
          <div onClick={e => e.stopPropagation()} className="modal-content">
            <button type="button" onClick={() => setActiveModalProject(null)}
              aria-label="Close prototype preview"
            >
              ×
            </button>
            <img
              src={activeModalProject.modalImage}
              alt={activeModalProject.modalAlt}
            />
          </div>
        </div>
      )}
    </div>
  );
}
