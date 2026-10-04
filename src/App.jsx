import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const CASE_STUDIES = [
  {
    id: "hotel-scanner",
    eyebrow: "Prototype",
    title: "Hotel Multi-Date Rate Scanner",
    meta: ["Hospitality tech", "Live prototype"],
    problem:
      "Many travelers already know the hotel they want. When dates are flexible, comparing rates across stay options usually means repeating the same search again and again.",
    approach:
      "I framed the workflow around one preferred hotel, then designed a decision view that compares live rates across date combinations and lets travelers set a budget alert checked every six hours.",
    outcome:
      "Moved from problem framing to a deployed prototype using AI-assisted development, SerpAPI, GitHub, and Render—enough to test the booking logic and alerting experience with real rate data.",
    link: "https://hotelscanner.paul-totah.com",
    linkLabel: "View live prototype",
    image: "/hotel-scanner-results.png",
    imageAlt: "Hotel Rate Scanner comparison results for The Ritz-Carlton Bacara across two date options",
    images: [
      {
        src: "/hotel-scanner-results.png",
        alt: "Hotel Rate Scanner comparison results showing best nightly rate across two date options",
      },
      {
        src: "/hotel-scanner-landing.png",
        alt: "Hotel Rate Scanner landing page with multi-date search and compare workflow",
      },
    ],
  },
  {
    id: "alaska-atmos",
    eyebrow: "UX concept",
    title: "Alaska Airlines Atmos status projection",
    meta: ["Loyalty UX", "Shared concept"],
    problem:
      "An Atmos member can see miles earned and miles remaining, but already-booked trips are not factored into the status progress calculation.",
    approach:
      "I designed an enhancement to the existing Account section: an Upcoming Trips list, earned-versus-projected progress, and a summary that shows the remaining mileage gap after booked trips.",
    outcome:
      "The concept makes future status feel actionable instead of retrospective—so members can understand what they already have in motion before they book more travel.",
    image: "/atmos-rewards-prototype.jpg",
    imageAlt: "Mobile concept preview for Alaska Airlines Atmos status projection",
  },
  {
    id: "domain-signal",
    eyebrow: "Adjacent product work",
    title: "Turning hotel and SaaS friction into product signal",
    meta: ["Duetto", "SAP", "Hyatt"],
    problem:
      "Before holding a formal PM title, most of my work sat next to the product: hotel commercial strategy, enterprise SaaS delivery, and hospitality technology used across large property footprints.",
    approach:
      "I stayed close to the workflow—why a rate plan stalls, why a forecast misses, why a feature fails to activate—and translated that friction into clearer requirements, prioritization input, and adoption support.",
    outcome:
      "That path is how I work now: domain judgment first, then a practical product direction teams can ship and customers can recognize.",
    placeholder: "Domain work that informs product decisions",
  },
];

const APPROACH_STEPS = [
  {
    title: "Find the real workflow friction",
    body: "I start with the job someone is trying to finish—not the feature request. In hospitality and SaaS, the useful problem is usually buried inside a rate, forecast, booking, or adoption workflow.",
  },
  {
    title: "Tie it to a business reason",
    body: "Every product direction needs a commercial why: revenue leakage, slow time-to-value, weak activation, or decision latency. If the business reason is fuzzy, the roadmap will be too.",
  },
  {
    title: "Define a shippable path",
    body: "I turn the problem into a clear workflow, requirements, and tradeoffs. The goal is not a perfect vision deck—it is a direction engineering, design, and go-to-market can actually execute.",
  },
  {
    title: "Prototype and pressure-test",
    body: "I use AI-assisted tools to move from judgment to something testable quickly: flows, logic, and interfaces people can react to before a full build cycle.",
  },
];

const PROOF_POINTS = [
  {
    title: "Hospitality technology at Duetto",
    body: "Worked across product-adjacent hotel commercial workflows in a large property footprint, translating customer friction into signal for revenue and pricing tools.",
  },
  {
    title: "Enterprise SaaS at SAP",
    body: "Supported delivery and customer outcomes in a sizable enterprise portfolio, where release readiness, clear requirements, and adoption mattered as much as the feature itself.",
  },
  {
    title: "Hotel commercial strategy with Hyatt",
    body: "Built judgment around how hotels actually make revenue decisions—useful context when shaping tools meant to support those decisions.",
  },
];

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function CaseStudy({ study, index }) {
  const [ref, inView] = useInView(0.16);

  return (
    <article
      ref={ref}
      className={`case-study${inView ? " in-view" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div
        className={`case-media${study.placeholder ? " placeholder" : ""}${
          study.images?.length ? " case-media-stack" : ""
        }${study.image?.endsWith(".png") || study.images ? " product-shot" : ""}`}
      >
        {study.placeholder ? (
          <span>{study.placeholder}</span>
        ) : study.images?.length ? (
          study.images.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))
        ) : (
          <img src={study.image} alt={study.imageAlt} />
        )}
      </div>
      <div className="case-body">
        <p className="eyebrow">{study.eyebrow}</p>
        <h3>{study.title}</h3>
        <ul className="case-meta">
          {study.meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="case-block">
          <strong>Problem</strong>
          <p>{study.problem}</p>
        </div>
        <div className="case-block">
          <strong>What I did</strong>
          <p>{study.approach}</p>
        </div>
        <div className="case-block">
          <strong>Result</strong>
          <p>{study.outcome}</p>
        </div>
        {study.link && (
          <a className="case-link" href={study.link} target="_blank" rel="noreferrer">
            {study.linkLabel} →
          </a>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroInView] = useInView(0.12);
  const [approachRef, approachInView] = useInView(0.12);
  const [contactRef, contactInView] = useInView(0.16);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <div className="portfolio">
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <button type="button" className="brand" onClick={() => scrollTo("hero")}>
          PAUL<span>.</span>
        </button>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <button key={link.id} type="button" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-media" aria-hidden="true">
          <img
            src="/hero-hospitality.jpg"
            alt=""
            fetchPriority="high"
          />
        </div>
        <div className={`hero-content${heroInView ? " is-visible" : ""}`}>
          <p className="eyebrow">Product-minded · Hospitality & SaaS</p>
          <h1 className="hero-brand">
            <em>Paul</em> Totah<span>.</span>
          </h1>
          <p className="hero-title">
            Hospitality and revenue experience, applied to product problems.
          </p>
          <p className="hero-copy">
            I connect hotel operations, commercial strategy, and enterprise SaaS
            delivery to shippable product ideas—using AI-assisted prototyping to
            move from friction to something you can test.
          </p>
          <button type="button" className="primary-cta" onClick={() => scrollTo("work")}>
            See selected work ↓
          </button>
        </div>
      </section>

      <section id="work" className="section">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Product thinking from real customer friction</h2>
            <p>
              A short set of case studies: two prototypes that show how I frame
              and build, plus the domain work that shapes how I make product
              decisions.
            </p>
          </div>
          <div className="case-list">
            {CASE_STUDIES.map((study, index) => (
              <CaseStudy
                key={study.id}
                study={study}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="section">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">How I work</p>
            <h2>A practical path from friction to a testable product idea</h2>
            <p>
              I do not lead with a long skill list. I lead with a method that
              stays useful whether the next step is a prototype, a PRD, or a
              sharper problem statement.
            </p>
          </div>
          <div className="approach-grid" ref={approachRef}>
            {APPROACH_STEPS.map((step, index) => (
              <article
                key={step.title}
                className={`approach-item${approachInView ? " in-view" : ""}`}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <span className="index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="section-inner about-grid">
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h2>My path into product started before the title did.</h2>
            <p>
              I have worked across nonprofit, hospitality, enterprise SaaS at{" "}
              <strong>SAP</strong>, hospitality technology at{" "}
              <strong>Duetto</strong>, and hotel commercial strategy with{" "}
              <strong>Hyatt Hotels & Resorts</strong>. Much of that time was
              spent close to the customer problems products are meant to solve.
            </p>
            <p>
              Formal product management is a newer chapter. The useful part is
              not years in the seat—it is the judgment I already built around
              hotel operations, revenue decisions, and enterprise delivery, now
              paired with AI-forward tools like <strong>Claude</strong> and{" "}
              <strong>Cursor</strong> to move faster from problem to prototype.
            </p>
            <p>
              I am looking for product roles where domain fluency, clear
              problem framing, and practical execution matter more than a long
              title history.
            </p>
          </div>
          <div className="proof-points">
            {PROOF_POINTS.map((point) => (
              <article key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="section-inner">
          <div
            ref={contactRef}
            className={`contact-panel${contactInView ? " in-view" : ""}`}
          >
            <p className="eyebrow">Contact</p>
            <h2>Let’s talk about hospitality product problems.</h2>
            <p>
              Open to product opportunities where hospitality, revenue systems,
              or enterprise SaaS experience is an advantage. Email is the
              fastest path; LinkedIn and my resume are here too.
            </p>
            <div className="contact-actions">
              <a className="primary" href="mailto:paultotah@gmail.com">
                Email Paul
              </a>
              <a
                className="secondary"
                href="https://linkedin.com/in/paultotah/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="secondary" href="/Paul-Totah-Resume.pdf">
                Resume
              </a>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, name: event.target.value }))
                }
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formState.email}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, email: event.target.value }))
                }
                required
              />
              <textarea
                name="message"
                placeholder="What should we talk about?"
                rows={5}
                value={formState.message}
                onChange={(event) =>
                  setFormState((state) => ({
                    ...state,
                    message: event.target.value,
                  }))
                }
                required
              />
              <button type="submit">Open email draft →</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Paul Totah — Product Manager</span>
      </footer>
    </div>
  );
}
