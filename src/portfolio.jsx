import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "About", "Contact"];

const PROJECTS = [
  {
    id: 1,
    tag: "0 → 1 Product",
    title: "AI-Powered Onboarding",
    description:
      "Redesigned the new user journey with ML-personalized flows, cutting time-to-value by 47% and improving 30-day retention across all cohorts.",
    metrics: [
      { label: "Retention lift", value: "+47%" },
      { label: "NPS delta", value: "+22pts" },
    ],
    color: "#4FFFB0",
  },
  {
    id: 2,
    tag: "Growth",
    title: "Monetization Engine",
    description:
      "Led a cross-functional team to ship a dynamic pricing system, unlocking a new revenue tier and increasing ARPU within two quarters.",
    metrics: [
      { label: "ARPU growth", value: "+31%" },
      { label: "Time to ship", value: "8 weeks" },
    ],
    color: "#FF6FD8",
  },
  {
    id: 3,
    tag: "Platform",
    title: "Developer API v2",
    description:
      "Defined and shipped a public API platform from scratch — strategy, roadmap, partner onboarding, and full technical spec — adopted by 200+ integrations in year one.",
    metrics: [
      { label: "Integrations Y1", value: "200+" },
      { label: "Eng velocity", value: "3× faster" },
    ],
    color: "#FFD166",
  },
  {
    id: 4,
    tag: "Operations",
    title: "Data Governance Framework",
    description:
      "Established company-wide data taxonomy and governance processes, enabling product analytics maturity and unblocking 5 stalled roadmap items.",
    metrics: [
      { label: "Roadmap unblocked", value: "5 items" },
      { label: "Reporting accuracy", value: "+99%" },
    ],
    color: "#6FDDFF",
  },
];

const SKILLS = [
  "Product Strategy",
  "Roadmapping",
  "User Research",
  "Stakeholder Alignment",
  "Go-to-Market",
  "Data Analytics",
  "Agile / Scrum",
  "API Products",
  "OKR Frameworks",
  "Cross-functional Leadership",
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
    <span style={{ color: "#4FFFB0" }}>
      {text}
      <span style={{ animation: "blink 1s step-end infinite", opacity: 1 }}>|</span>
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#16161f" : "#111119",
        border: `1px solid ${hovered ? project.color : "#222230"}`,
        borderRadius: 16,
        padding: "2rem",
        transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
        transform: inView
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${project.color}18, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase", color: project.color,
        fontFamily: "'DM Mono', monospace",
        background: `${project.color}18`,
        padding: "3px 10px", borderRadius: 100,
        display: "inline-block", marginBottom: "1rem",
      }}>{project.tag}</span>
      <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#f0f0fa", margin: "0 0 0.75rem", fontFamily: "'Syne', sans-serif" }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#8888aa", margin: "0 0 1.5rem" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {project.metrics.map((m) => (
          <div key={m.label}>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: project.color, fontFamily: "'Syne', sans-serif" }}>{m.value}</div>
            <div style={{ fontSize: "0.75rem", color: "#666688", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</div>
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
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh", color: "#f0f0fa", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gridFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        ::selection { background: #4FFFB044; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0F; } ::-webkit-scrollbar-thumb { background: #4FFFB055; border-radius: 2px; }
        input, textarea { outline: none; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #ffffff0a" : "none",
        transition: "all 0.4s ease",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.05em", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          ALEX<span style={{ color: "#4FFFB0" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{ background: "none", border: "none", color: "#aaaacc", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.target.style.color = "#4FFFB0"}
              onMouseLeave={e => e.target.style.color = "#aaaacc"}
            >{l}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2.5rem", position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(79,255,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,255,176,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,255,176,0.08) 0%, transparent 65%)", pointerEvents: "none", animation: "gridFloat 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(111,221,255,0.06) 0%, transparent 65%)", pointerEvents: "none", animation: "gridFloat 10s ease-in-out infinite reverse" }} />

        <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s ease forwards" : "none" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#4FFFB0", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              ↳ Product Manager
            </p>
          </div>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.1s ease forwards" : "none" }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 800, lineHeight: 1.0, color: "#f0f0fa", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              Alex Rivera
            </h1>
          </div>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.2s ease forwards" : "none" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.2, color: "#5a5a7a", marginBottom: "2rem" }}>
              Building products that{" "}<TypeWriter words={["scale.", "convert.", "delight.", "ship.", "matter."]} />
            </h2>
          </div>
          <div style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.3s ease forwards" : "none" }}>
            <p style={{ fontSize: "1.05rem", color: "#7777aa", maxWidth: 540, lineHeight: 1.75, marginBottom: "2.5rem" }}>
              I'm a product leader with 7+ years turning ambiguous problems into shipped solutions — at the intersection of user empathy, data, and engineering pragmatism.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp 0.7s 0.4s ease forwards" : "none" }}>
            <button onClick={() => scrollTo("work")}
              style={{ background: "#4FFFB0", color: "#0A0A0F", padding: "0.85rem 2rem", border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "#7FFFCC"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "#4FFFB0"; e.target.style.transform = "translateY(0)"; }}
            >View My Work ↓</button>
            <button onClick={() => scrollTo("contact")}
              style={{ background: "transparent", color: "#f0f0fa", padding: "0.85rem 2rem", border: "1px solid #333344", borderRadius: 8, fontWeight: 500, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor = "#4FFFB066"; e.target.style.color = "#4FFFB0"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#333344"; e.target.style.color = "#f0f0fa"; }}
            >Get in Touch</button>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem", opacity: 0.4 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #4FFFB0)", animation: "fadeIn 2s 1s ease forwards", opacity: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#4FFFB0", writingMode: "vertical-rl", textOrientation: "mixed" }}>SCROLL</span>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "6rem 2.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#4FFFB0", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Selected Work</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f0f0fa", letterSpacing: "-0.02em" }}>
            Products I've shipped
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} style={{ padding: "6rem 2.5rem", background: "#0D0D14", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #4FFFB033, transparent)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div style={{ transform: aboutInView ? "translateX(0)" : "translateX(-40px)", opacity: aboutInView ? 1 : 0, transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#4FFFB0", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>About Me</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f0f0fa", marginBottom: "1.5rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              I turn complex problems into clear roadmaps.
            </h2>
            <p style={{ color: "#8888aa", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              With a background spanning B2B SaaS, consumer apps, and developer platforms, I've led products from 0 to 1 and scaled them to millions of users. I sit at the intersection of strategy, design, and engineering — fluent in all three.
            </p>
            <p style={{ color: "#8888aa", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "2rem" }}>
              Previously at <span style={{ color: "#f0f0fa", fontWeight: 600 }}>Stripe</span>, <span style={{ color: "#f0f0fa", fontWeight: 600 }}>Figma</span>, and <span style={{ color: "#f0f0fa", fontWeight: 600 }}>an early-stage fintech startup</span>. I hold an MBA from Wharton and a CS degree from Georgia Tech.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[["7+", "Years in product"], ["$40M+", "Revenue attributed"], ["3", "Products launched"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#4FFFB0", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: "0.72rem", color: "#555577", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ transform: aboutInView ? "translateX(0)" : "translateX(40px)", opacity: aboutInView ? 1 : 0, transition: "all 0.7s 0.15s cubic-bezier(.22,1,.36,1)" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#555577", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Core Skills</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              {SKILLS.map((s, i) => (
                <span key={s} style={{
                  padding: "0.45rem 1rem", border: "1px solid #1e1e2e",
                  borderRadius: 100, fontSize: "0.82rem", color: "#9999bb",
                  background: "#111119", fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s", cursor: "default",
                  animationDelay: `${i * 0.05}s`,
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "#4FFFB055"; e.target.style.color = "#4FFFB0"; e.target.style.background = "#4FFFB00e"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#1e1e2e"; e.target.style.color = "#9999bb"; e.target.style.background = "#111119"; }}
                >{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} style={{ padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", transform: contactInView ? "translateY(0)" : "translateY(40px)", opacity: contactInView ? 1 : 0, transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#4FFFB0", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Contact</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#f0f0fa", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Let's build something great.
          </h2>
          <p style={{ color: "#7777aa", lineHeight: 1.75, marginBottom: "3rem", fontSize: "0.95rem" }}>
            Open to new opportunities, advisory roles, and interesting conversations. Drop me a line and I'll get back to you promptly.
          </p>

          {sent ? (
            <div style={{ background: "#4FFFB011", border: "1px solid #4FFFB044", borderRadius: 12, padding: "2rem", color: "#4FFFB0", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
              ✓ Message sent — I'll be in touch soon!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
              {[["name", "Your name", "text"], ["email", "Email address", "email"]].map(([field, ph, type]) => (
                <input key={field} type={type} placeholder={ph} value={formState[field]}
                  onChange={e => setFormState(s => ({ ...s, [field]: e.target.value }))}
                  style={{ background: "#111119", border: "1px solid #1e1e2e", borderRadius: 8, padding: "0.9rem 1.25rem", color: "#f0f0fa", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s", width: "100%" }}
                  onFocus={e => e.target.style.borderColor = "#4FFFB066"}
                  onBlur={e => e.target.style.borderColor = "#1e1e2e"}
                />
              ))}
              <textarea placeholder="Your message" rows={5} value={formState.message}
                onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                style={{ background: "#111119", border: "1px solid #1e1e2e", borderRadius: 8, padding: "0.9rem 1.25rem", color: "#f0f0fa", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", resize: "vertical", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#4FFFB066"}
                onBlur={e => e.target.style.borderColor = "#1e1e2e"}
              />
              <button onClick={() => { if (formState.name && formState.email) setSent(true); }}
                style={{ background: "#4FFFB0", color: "#0A0A0F", padding: "0.9rem", border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "#7FFFCC"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "#4FFFB0"; e.target.style.transform = "translateY(0)"; }}
              >Send Message →</button>
            </div>
          )}

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #1a1a28", display: "flex", justifyContent: "center", gap: "2rem" }}>
            {[["LinkedIn", "#"], ["GitHub", "#"], ["Twitter / X", "#"], ["Resume", "#"]].map(([label, href]) => (
              <a key={label} href={href}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#555577", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#4FFFB0"}
                onMouseLeave={e => e.target.style.color = "#555577"}
              >{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "1.5rem 2.5rem", textAlign: "center", borderTop: "1px solid #111119" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#333355", letterSpacing: "0.1em" }}>
          © 2026 ALEX RIVERA — PRODUCT MANAGER
        </span>
      </footer>
    </div>
  );
}
