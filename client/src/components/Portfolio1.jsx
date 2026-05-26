import { useState, useEffect, useRef, useCallback } from "react";

// ── Dynamic Island Navbar ──────────────────────────────────────────────────────
const NAV_ITEMS = ["home", "about", "projects", "contact"];

function DynamicIslandNav({ active, setActive }) {
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef({});

  const updatePill = useCallback((key) => {
    const el = itemRefs.current[key];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const parent = el.closest("nav").getBoundingClientRect();
    setPillStyle({ left: rect.left - parent.left, width: rect.width });
  }, []);

  useEffect(() => { updatePill(active); }, [active, updatePill]);

  return (
    <nav style={{
      position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 1000,
      background: "rgba(12,12,12,0.88)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: 999, padding: "5px 6px",
      display: "flex", alignItems: "center", gap: 2,
      boxShadow: "0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
      whiteSpace: "nowrap",
    }}>
      <span style={{
        position: "absolute", height: "calc(100% - 10px)",
        background: "rgba(255,255,255,0.11)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 999,
        transition: "left 0.38s cubic-bezier(0.34,1.4,0.64,1), width 0.38s cubic-bezier(0.34,1.4,0.64,1)",
        pointerEvents: "none",
        ...pillStyle,
      }} />
      {NAV_ITEMS.map(item => (
        <button
          key={item}
          ref={el => (itemRefs.current[item] = el)}
          onClick={() => {
            setActive(item);
            document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            position: "relative", zIndex: 1,
            background: "none", border: "none",
            padding: "8px 16px", borderRadius: 999,
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 11, fontWeight: 600, letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: active === item ? "#fff" : "rgba(255,255,255,0.4)",
            transition: "color 0.25s",
            cursor: "pointer",
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

// ── Liquid Glass Card ──────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        boxShadow: "0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.3s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.34,1.4,0.64,1)",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        pointerEvents: "none",
      }} />
      {children}
    </div>
  );
}

// ── Spotify Card ───────────────────────────────────────────────────────────────
function SpotifyCard() {
  const [progress, setProgress] = useState(38);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.15)), 300);
    return () => clearInterval(iv);
  }, [playing]);

  const elapsed = Math.floor((progress * 132) / 100);
  const eMin = Math.floor(elapsed / 60);
  const eSec = String(elapsed % 60).padStart(2, "0");

  return (
    <GlassCard style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          Currently Listening
        </span>
        <span style={{
          marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
          background: playing ? "#1DB954" : "#444",
          boxShadow: playing ? "0 0 8px #1DB954" : "none",
          transition: "all 0.3s",
        }} />
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 10, flexShrink: 0,
          background: "linear-gradient(135deg, #222, #3a3a3a)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>♪</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Song Title Here
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "'Courier New', monospace", marginBottom: 10 }}>
            Artist Name
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 99 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#fff", borderRadius: 99, transition: "width 0.3s linear" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontFamily: "'Courier New', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
            <span>{eMin}:{eSec}</span><span>2:12</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 14, alignItems: "center" }}>
        {["⏮", playing ? "⏸" : "▶", "⏭"].map((icon, i) => (
          <button key={i} onClick={() => i === 1 && setPlaying(p => !p)} style={{
            background: "none", border: "none",
            color: i === 1 ? "#fff" : "rgba(255,255,255,0.35)",
            fontSize: i === 1 ? 18 : 13, cursor: "pointer", padding: 4,
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => (e.target.style.transform = "scale(1.2)")}
            onMouseLeave={e => (e.target.style.transform = "scale(1)")}
          >{icon}</button>
        ))}
      </div>
    </GlassCard>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({ title, desc, tags, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <GlassCard
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 26,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        borderColor: hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 4px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{
          color: hovered ? "#fff" : "rgba(255,255,255,0.2)",
          fontSize: 16, transition: "transform 0.3s, color 0.3s",
          transform: hovered ? "translate(2px,-2px)" : "none", display: "inline-block",
        }}>↗</span>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, marginBottom: 18 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.1em",
            padding: "4px 10px", borderRadius: 999,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
          }}>{tag}</span>
        ))}
      </div>
    </GlassCard>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.25em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
    </div>
  );
}

function ContactInput({ label, type = "text", placeholder, multiline }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? "textarea" : "input";
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontFamily: "'Courier New', monospace",
        fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)",
        marginBottom: 7, textTransform: "uppercase",
      }}>{label}</label>
      <Tag type={type} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={multiline ? 5 : undefined}
        style={{
          width: "100%", background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.09)"}`,
          borderRadius: 12, padding: "13px 15px",
          color: "#fff", fontSize: 14,
          fontFamily: multiline ? "'Courier New', monospace" : "inherit",
          outline: "none", resize: multiline ? "vertical" : undefined,
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(255,255,255,0.03)" : "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Image Clustering System",
    desc: "Unsupervised image clustering pipeline using DINO-based feature extraction, UMAP for dimensionality reduction, and HDBSCAN for density-based clustering. Final year research project.",
    tags: ["Python", "DINO", "UMAP", "HDBSCAN", "PyTorch"],
  },
  {
    title: "Inventory Management & Analytics",
    desc: "Web-based inventory system for retail stores with real-time analytics, role-based access control, and comprehensive reporting features.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js"],
  },
  {
    title: "ClaimVision AI",
    desc: "AI-powered insurance underwriting platform targeting informal workers in Nigeria. Tackles the cold-start problem using proxy data and ML-driven risk scoring.",
    tags: ["ML", "Feature Engineering", "Python", "Risk Modelling"],
  },
  {
    title: "GBP/JPY Directional Classifier",
    desc: "Binary classifier predicting forex candle direction on GBP/JPY using OHLCV data. Incorporates regime detection via HDBSCAN and a quantitative backtesting framework.",
    tags: ["Python", "sklearn", "Backtesting", "HDBSCAN", "Time Series"],
  },
];

const SKILLS = [
  "Python", "TypeScript", "Next.js", "React", "PostgreSQL",
  "PyTorch", "scikit-learn", "Machine Learning", "Feature Engineering",
  "UMAP", "HDBSCAN", "Time Series", "SQL", "Prisma", "Git",
];

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const handler = () => {
      for (const item of ["contact", "projects", "about", "home"]) {
        const el = document.getElementById(item);
        if (el && window.scrollY >= el.offsetTop - 220) {
          setActiveNav(item);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>

      {/* Grid bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 50% at 50% 0%, transparent 30%, #080808 100%)" }} />

      <DynamicIslandNav active={activeNav} setActive={scrollTo} />

      {/* ── HOME ─────────────────────────────────────── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", marginBottom: 24, textTransform: "uppercase" }}>
          Portfolio — 2025
        </div>

        <h1 style={{ fontSize: "clamp(48px, 9vw, 92px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: 24, background: "linear-gradient(180deg, #fff 55%, rgba(255,255,255,0.3) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Ekwe.<br />
          <span style={{ fontSize: "clamp(28px, 5.5vw, 58px)", fontWeight: 400, letterSpacing: "-0.02em", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.18) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Software Engineer &<br />ML Researcher
          </span>
        </h1>

        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", maxWidth: 440, lineHeight: 1.85, marginBottom: 36 }}>
          Building intelligent systems at the intersection of machine learning, data, and full-stack engineering. Final year CS student at Adeleke University.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("projects")} style={{ background: "#fff", color: "#000", border: "none", padding: "13px 26px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", transition: "transform 0.2s, opacity 0.2s" }}
            onMouseEnter={e => (e.target.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.target.style.transform = "scale(1)")}>
            View Work
          </button>
          <button onClick={() => scrollTo("contact")} style={{ background: "transparent", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.14)", padding: "13px 26px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.38)"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.14)"; e.target.style.color = "rgba(255,255,255,0.55)"; }}>
            Get in Touch
          </button>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 40, left: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 44, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.28))", animation: "scrollPulse 2s ease infinite" }} />
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.22em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase", writingMode: "vertical-rl" }}>scroll</span>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section id="about" style={{ minHeight: "100vh", padding: "100px 24px 80px", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>01 — About</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 36, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.2 }}>
              Obsessed with systems that{" "}
              <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>think.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.85, fontSize: 14, marginBottom: 14 }}>
              I'm a final-year Computer Science student building at the crossroads of machine learning and software engineering. My work spans unsupervised learning research, full-stack web systems, and quantitative approaches to financial markets.
            </p>
            <p style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.85, fontSize: 14, marginBottom: 28 }}>
              I gravitate toward mathematical, data-driven frameworks — whether that's clustering images with HDBSCAN or building classifiers for forex price direction. I care about systems that are rigorous, reproducible, and actually useful.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["4+", "Projects"], ["2025", "Graduating"], ["CS", "Major"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <GlassCard style={{ padding: 22 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.22)", marginBottom: 14, textTransform: "uppercase" }}>Skills & Tools</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {SKILLS.map(s => (
                  <span key={s} style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.09em", padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{s}</span>
                ))}
              </div>
            </GlassCard>
            <SpotifyCard />
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────── */}
      <section id="projects" style={{ minHeight: "100vh", padding: "100px 24px 80px", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>02 — Projects</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 32, lineHeight: 1.2 }}>Selected Work</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} index={i} />)}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section id="contact" style={{ minHeight: "100vh", padding: "100px 24px 80px", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel>03 — Contact</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.2 }}>
              Let's build<br />
              <span style={{ color: "rgba(255,255,255,0.28)", fontStyle: "italic" }}>something.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.8, fontSize: 14, marginBottom: 30 }}>
              Open to collaborations, research discussions, internships, and interesting problems. Response within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { icon: "✉", label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
                { icon: "⌥", label: "GitHub", value: "github.com/yourusername", href: "https://github.com" },
                { icon: "◈", label: "LinkedIn", value: "linkedin.com/in/you", href: "https://linkedin.com" },
                { icon: "◎", label: "Twitter / X", value: "@yourhandle", href: "https://x.com" },
              ].map(ch => (
                <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.28)", width: 20, textAlign: "center", flexShrink: 0 }}>{ch.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>{ch.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{ch.value}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.2)", fontSize: 13 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          <GlassCard style={{ padding: 26 }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.22)", marginBottom: 22, textTransform: "uppercase" }}>
              Send a Message
            </div>
            <ContactInput label="Name" placeholder="Your name" />
            <ContactInput label="Email" type="email" placeholder="your@email.com" />
            <ContactInput label="Subject" placeholder="What's this about?" />
            <ContactInput label="Message" placeholder="Tell me more..." multiline />
            <button style={{ width: "100%", padding: "13px", borderRadius: 12, background: "#fff", color: "#000", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em", marginTop: 4, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.target.style.opacity = "0.88")}
              onMouseLeave={e => (e.target.style.opacity = "1")}>
              Send Message ↗
            </button>
          </GlassCard>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "36px 24px", maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "0.06em", marginBottom: 4 }}>EKWE.</div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Software Engineer & ML Researcher
          </div>
        </div>

        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          {["GitHub", "LinkedIn", "Twitter"].map(link => (
            <a key={link} href="#" style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => (e.target.style.color = "#fff")}
              onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.28)")}>
              {link}
            </a>
          ))}
        </div>

        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "rgba(255,255,255,0.16)", letterSpacing: "0.1em", textAlign: "right" }}>
          <div>© 2025 Ekwe</div>
          <div style={{ marginTop: 3 }}>Built with React</div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: rgba(255,255,255,0.14); }
        input, textarea { color-scheme: dark; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
