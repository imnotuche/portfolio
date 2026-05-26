import { useState, useEffect, useRef } from "react";

// ── Custom cursor hook ──────────────────────────────────────────────────────
function useGlitchCursor() {
  const canvasRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const prevPosRef = useRef({ x: -200, y: -200 });
  const frameRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      prevPosRef.current = { ...posRef.current };
      posRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailRef.current.length > 18) trailRef.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x, y } = posRef.current;
      const dx = x - prevPosRef.current.x;
      const dy = y - prevPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Trail
      trailRef.current = trailRef.current.map((p) => ({ ...p, age: p.age + 1 })).filter((p) => p.age < 18);
      trailRef.current.forEach((p, i) => {
        const alpha = (1 - p.age / 18) * 0.35;
        const size = (1 - p.age / 18) * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // Glitch displacement blocks
      if (speed > 3) {
        const glitchCount = Math.min(Math.floor(speed / 4), 6);
        for (let g = 0; g < glitchCount; g++) {
          const radius = 28 + g * 8;
          const sx = x - radius + Math.random() * 8 - 4;
          const sy = y - radius + Math.random() * 8 - 4;
          const sw = radius * 2;
          const sh = Math.random() * 10 + 3;
          const offsetX = (Math.random() - 0.5) * speed * 0.8;
          if (sx >= 0 && sy >= 0 && sx + sw <= canvas.width && sy + sh <= canvas.height) {
            try {
              const imageData = ctx.getImageData(sx, sy, sw, sh);
              ctx.putImageData(imageData, sx + offsetX, sy);
              // RGB split
              const channels = ["rgba(255,0,80,0.18)", "rgba(0,255,200,0.15)"];
              channels.forEach((c, ci) => {
                ctx.fillStyle = c;
                ctx.fillRect(sx + offsetX + (ci === 0 ? -3 : 3), sy, sw, sh);
              });
            } catch {}
          }
        }
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.55 + Math.sin(Date.now() * 0.005) * 0.15})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      // Speed lines
      if (speed > 8) {
        for (let s = 0; s < 3; s++) {
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
          const len = speed * 1.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - Math.cos(angle) * len, y - Math.sin(angle) * len);
          ctx.strokeStyle = `rgba(255,255,255,${0.08 + Math.random() * 0.08})`;
          ctx.lineWidth = Math.random() * 2;
          ctx.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return canvasRef;
}

// ── Data ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Home", "About", "Projects", "Contact"];

const PROJECTS = [
  {
    id: 1,
    name: "NeuralDraft",
    desc: "AI-powered writing assistant that learns your tone and style to co-author documents in real time.",
    stack: ["React", "Python", "OpenAI", "FastAPI"],
    year: "2024",
    tag: "AI / Productivity",
  },
  {
    id: 2,
    name: "Orbitex",
    desc: "Real-time satellite tracking dashboard with 3D globe rendering and live TLE data feeds.",
    stack: ["Three.js", "Node.js", "WebSockets", "D3"],
    year: "2024",
    tag: "Data Viz",
  },
  {
    id: 3,
    name: "Krypt",
    desc: "Decentralized file vault with end-to-end encryption, IPFS storage, and on-chain access control.",
    stack: ["Solidity", "React", "IPFS", "ethers.js"],
    year: "2023",
    tag: "Web3",
  },
];

const SKILLS = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "GraphQL", "Three.js"];

// ── Spotify mock ─────────────────────────────────────────────────────────────
function SpotifyWidget() {
  const [progress, setProgress] = useState(38);
  const bars = Array.from({ length: 28 });

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.18)), 300);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(24px) saturate(1.4)",
      WebkitBackdropFilter: "blur(24px) saturate(1.4)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: "18px 22px",
      display: "flex",
      alignItems: "center",
      gap: 16,
      maxWidth: 360,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow blob */}
      <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(29,185,84,0.12)", filter: "blur(40px)", top: -30, left: -20, pointerEvents: "none" }} />
      {/* Album art placeholder */}
      <div style={{ width: 52, height: 52, borderRadius: 10, background: "linear-gradient(135deg,#1db954 0%,#0a3d1f 100%)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎵</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#1db954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          <span style={{ fontSize: 10, color: "#1db954", fontFamily: "'Courier New', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Now Playing</span>
        </div>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Blinding Lights</div>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>The Weeknd</div>
        {/* Progress */}
        <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#1db954", borderRadius: 4, transition: "width 0.3s linear" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>1:{String(Math.floor(progress * 2.08)).padStart(2,"0")}</span>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>3:20</span>
        </div>
      </div>
      {/* Animated bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 28, flexShrink: 0 }}>
        {bars.map((_, i) => (
          <div key={i} style={{
            width: 2, borderRadius: 2, background: "#1db954",
            animation: `bar-dance ${0.4 + (i % 5) * 0.13}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.04}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio2() {
  const [activeNav, setActiveNav] = useState("Home");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useGlitchCursor();
  const sectionRefs = { Home: useRef(), About: useRef(), Projects: useRef(), Contact: useRef() };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (const key of NAV_ITEMS) {
        const el = sectionRefs[key].current;
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveNav(key);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (key) => {
    sectionRefs[key].current?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(key);
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Courier New', Courier, monospace", cursor: "none", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0e0e0e; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        html { scroll-behavior: smooth; }

        @keyframes bar-dance {
          from { height: 4px; }
          to { height: 24px; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes gridPulse {
          0%,100% { opacity: 0.18; } 50% { opacity: 0.28; }
        }
        @keyframes glitch-clip {
          0% { clip-path: inset(20% 0 60% 0); transform: translate(-4px,0); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(4px,0); }
          40% { clip-path: inset(40% 0 40% 0); transform: translate(0,0); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(-3px,0); }
          80% { clip-path: inset(5% 0 80% 0); transform: translate(3px,0); }
          100% { clip-path: inset(20% 0 60% 0); transform: translate(0,0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pill-glow {
          0%,100% { box-shadow: 0 0 18px rgba(255,255,255,0.06); }
          50% { box-shadow: 0 0 32px rgba(255,255,255,0.14); }
        }
        @keyframes liquid-shift {
          0%,100% { border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
          33% { border-radius: 45% 55% 40% 60% / 60% 40% 55% 45%; }
          66% { border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; }
        }
        @keyframes cursor-ring {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0.3; }
        }
        @keyframes tag-in {
          from { opacity:0; transform:scale(0.8) translateY(8px); }
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes hero-line {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        .nav-pill {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          z-index: 1000;
          background: rgba(18,18,18,0.72);
          backdrop-filter: blur(28px) saturate(1.6);
          -webkit-backdrop-filter: blur(28px) saturate(1.6);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 6px;
          display: flex; gap: 2px;
          animation: pill-glow 4s ease-in-out infinite;
          box-shadow: 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .nav-btn {
          position: relative; z-index: 1;
          background: none; border: none; cursor: none;
          font-family: 'Courier New', monospace;
          font-size: 13px; font-weight: 600; letter-spacing: 0.05em;
          padding: 8px 20px; border-radius: 999px;
          transition: color 0.25s;
          color: rgba(255,255,255,0.55);
        }
        .nav-btn.active { color: #080808; }
        .nav-btn:not(.active):hover { color: rgba(255,255,255,0.9); }
        .nav-highlight {
          position: absolute; top: 6px; height: calc(100% - 12px);
          background: #fff; border-radius: 999px;
          transition: left 0.4s cubic-bezier(0.34,1.56,0.64,1), width 0.4s cubic-bezier(0.34,1.56,0.64,1);
          z-index: 0;
        }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 56px 56px;
          animation: gridPulse 6s ease-in-out infinite;
        }
        .grid-fade {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #080808 100%);
        }

        .section { position: relative; z-index: 2; }

        .glass-card {
          background: rgba(255,255,255,0.032);
          backdrop-filter: blur(20px) saturate(1.3);
          -webkit-backdrop-filter: blur(20px) saturate(1.3);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .glass-card:hover {
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }

        .liquid-btn {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 12px;
          color: #fff; font-family: 'Courier New', monospace;
          font-size: 13px; font-weight: 700; letter-spacing: 0.08em;
          padding: 14px 28px; cursor: none;
          transition: all 0.3s;
        }
        .liquid-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .liquid-btn:hover { border-color: rgba(255,255,255,0.35); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .liquid-btn:hover::before { opacity: 1; }

        .hero-glitch {
          position: relative; display: inline-block;
        }
        .hero-glitch::before, .hero-glitch::after {
          content: attr(data-text);
          position: absolute; left: 0; top: 0; width: 100%; height: 100%;
          font-size: inherit; font-weight: inherit; line-height: inherit;
        }
        .hero-glitch::before {
          color: rgba(255,0,80,0.7);
          animation: glitch-clip 4.5s infinite linear;
          animation-play-state: paused;
        }
        .hero-glitch::after {
          color: rgba(0,255,200,0.7);
          animation: glitch-clip 4.5s infinite linear 0.12s;
          animation-play-state: paused;
        }
        .hero-glitch:hover::before, .hero-glitch:hover::after {
          animation-play-state: running;
        }

        .skill-tag {
          display: inline-block;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 6px 14px;
          font-family: 'Courier New', monospace;
          font-size: 12px; color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
          transition: all 0.25s;
        }
        .skill-tag:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
          transform: translateY(-2px);
        }

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s, background 0.3s;
          resize: none;
        }
        .contact-input:focus {
          border-color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.07);
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }

        .scanline {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none; z-index: 9999;
        }

        .project-num {
          font-family: 'Courier New', monospace;
          font-size: 11px; color: rgba(255,255,255,0.2);
          letter-spacing: 0.15em;
        }
        .stack-chip {
          display: inline-block;
          font-size: 10px; font-family: 'Courier New', monospace;
          padding: 3px 10px; border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.06em;
        }

        .footer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        }

        @media (max-width: 768px) {
          .nav-btn { padding: 7px 14px; font-size: 12px; }
          .hero-name { font-size: clamp(48px, 12vw, 96px) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .contact-row { flex-direction: column !important; }
          .footer-inner { flex-direction: column !important; gap: 24px !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .nav-pill { top: 12px; }
          .nav-btn { padding: 6px 11px; font-size: 11px; }
        }
      `}</style>

      {/* Glitch cursor canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }} />

      {/* Scanline */}
      <div className="scanline" />

      {/* Grid background */}
      <div className="grid-bg" />
      <div className="grid-fade" />

      {/* ── Dynamic Island Navbar ── */}
      <NavIsland activeNav={activeNav} hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} scrollTo={scrollTo} />

      {/* ── HERO ── */}
      <section ref={sectionRefs.Home} className="section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 6vw 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards" : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22ff88", boxShadow: "0 0 12px #22ff88", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Available for work</span>
          </div>

          <h1 className="hero-name hero-glitch" data-text="Alex Monroe" style={{ fontSize: "clamp(64px, 11vw, 128px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", fontFamily: "'Courier New', monospace", marginBottom: 32, position: "relative" }}>
            Alex Monroe
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ height: 1, width: 48, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Full Stack Engineer</span>
          </div>

          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 520, lineHeight: 1.8, marginBottom: 56, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            I build things that live on the internet — fast, thoughtful, and a little obsessive about the details.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <button className="liquid-btn" onClick={() => scrollTo("Projects")}>View Projects_</button>
            <button className="liquid-btn" onClick={() => scrollTo("Contact")} style={{ background: "transparent" }}>Get in Touch →</button>
            <div style={{ marginLeft: 8 }}>
              <SpotifyWidget />
            </div>
          </div>
        </div>

        {/* Decorative blob */}
        <div style={{ position: "absolute", right: "8vw", top: "50%", transform: "translateY(-50%)", width: 320, height: 320, borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%", background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)", border: "1px solid rgba(255,255,255,0.06)", animation: "liquid-shift 12s ease-in-out infinite, float 8s ease-in-out infinite", pointerEvents: "none" }} />
      </section>

      {/* ── ABOUT ── */}
      <section ref={sectionRefs.About} className="section" style={{ padding: "120px 6vw", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel label="01 / About" />
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 56 }}>
          <div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.02em" }}>
              Crafting experiences,<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>not just code.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 20, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
              Hey — I'm Alex, a full-stack developer based in New York with 5+ years of experience building web applications that people actually enjoy using.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
              I care deeply about performance, accessibility, and the invisible details that make a product feel <em>right</em>. When I'm not coding, I'm probably tweaking my Neovim config.
            </p>

            <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
              {[["5+", "Years exp."], ["30+", "Projects"], ["12+", "Clients"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em" }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 24, fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>// Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map((s, i) => (
                <span key={s} className="skill-tag" style={{ animationDelay: `${i * 0.05}s` }}>{s}</span>
              ))}
            </div>

            <div className="glass-card" style={{ marginTop: 36, padding: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16 }}>// Currently</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["🔨", "Building a SaaS product in stealth"],
                  ["📚", "Learning Rust"],
                  ["🎧", "Listening to The Weeknd"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui, sans-serif" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section ref={sectionRefs.Projects} className="section" style={{ padding: "120px 6vw", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel label="02 / Projects" />
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, marginTop: 56 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="liquid-btn">View all on GitHub →</button>
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={sectionRefs.Contact} className="section" style={{ padding: "120px 6vw", maxWidth: 900, margin: "0 auto" }}>
        <SectionLabel label="03 / Contact" />

        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Let's build something<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>together.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 56, fontFamily: "system-ui, sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
            Open to freelance, full-time roles, or just an interesting conversation. Drop me a line.
          </p>

          {/* Quick links */}
          <div className="contact-row" style={{ display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" }}>
            {[
              { icon: "✉️", label: "Email", value: "alex@monroe.dev", href: "mailto:alex@monroe.dev" },
              { icon: "🐦", label: "Twitter", value: "@alexmonroe", href: "https://twitter.com" },
              { icon: "💼", label: "LinkedIn", value: "Alex Monroe", href: "https://linkedin.com" },
              { icon: "🐙", label: "GitHub", value: "alexmonroe", href: "https://github.com" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{ padding: "16px 20px", display: "flex", gap: 12, alignItems: "center", minWidth: 180 }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "system-ui, sans-serif" }}>{c.value}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding: "36px" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 28 }}>// Send a message</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <input className="contact-input" placeholder="Your name" />
              <input className="contact-input" placeholder="Your email" type="email" />
            </div>
            <input className="contact-input" placeholder="Subject" style={{ marginBottom: 16 }} />
            <textarea className="contact-input" placeholder="Your message..." rows={5} style={{ marginBottom: 24 }} />
            <button className="liquid-btn" style={{ width: "100%", textAlign: "center" }}>Send Message_</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 2, padding: "0 6vw 48px" }}>
        <div className="footer-line" style={{ marginBottom: 36 }} />
        <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>Alex Monroe</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>© {new Date().getFullYear()} · All rights reserved</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "GH", href: "https://github.com" },
              { label: "TW", href: "https://twitter.com" },
              { label: "LI", href: "https://linkedin.com" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)", transition: "all 0.2s", fontWeight: 700 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >{s.label}</div>
              </a>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", fontFamily: "'Courier New', monospace" }}>
            Designed &amp; built by Alex Monroe
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Nav Island ───────────────────────────────────────────────────────────────
function NavIsland({ activeNav, hoveredNav, setHoveredNav, scrollTo }) {
  const navRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const target = hoveredNav || activeNav;
    const nav = navRef.current;
    if (!nav) return;
    const btns = nav.querySelectorAll(".nav-btn");
    const idx = NAV_ITEMS.indexOf(target);
    if (idx < 0 || !btns[idx]) return;
    const btn = btns[idx];
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setHighlightStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
  }, [activeNav, hoveredNav]);

  return (
    <nav className="nav-pill" ref={navRef}>
      <div className="nav-highlight" style={{ left: highlightStyle.left, width: highlightStyle.width }} />
      {NAV_ITEMS.map((item) => (
        <button
          key={item}
          className={`nav-btn${activeNav === item ? " active" : ""}`}
          onClick={() => scrollTo(item)}
          onMouseEnter={() => setHoveredNav(item)}
          onMouseLeave={() => setHoveredNav(null)}
        >{item}</button>
      ))}
    </nav>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass-card"
      style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16, animationDelay: `${index * 0.1}s`, position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle at top right, rgba(255,255,255,0.04), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span className="project-num">{String(index + 1).padStart(2, "0")}</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 999, fontFamily: "monospace" }}>{project.tag}</span>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: hovered ? "#fff" : "rgba(255,255,255,0.9)", transition: "color 0.3s" }}>{project.name}</h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>{project.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
        {project.stack.map((s) => <span key={s} className="stack-chip">{s}</span>)}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button className="liquid-btn" style={{ flex: 1, textAlign: "center", padding: "10px 16px", fontSize: 12 }}>Live Demo ↗</button>
        <button className="liquid-btn" style={{ padding: "10px 16px", fontSize: 12, background: "transparent" }}>GitHub</button>
      </div>
    </div>
  );
}
