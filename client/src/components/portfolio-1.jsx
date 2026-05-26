import { useState, useEffect, useRef, useCallback } from "react";

const MONO = "'Space Mono', monospace";
const SANS = "'Syne', sans-serif";

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #080808; color: #f5f5f5; font-family: 'Syne', sans-serif; overflow-x: hidden; cursor: none; }
      a, button { cursor: none; }
      input::placeholder, textarea::placeholder { color: rgba(245,245,245,0.2); }
      input:focus, textarea:focus { outline: none; border-color: rgba(255,255,255,0.3) !important; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes scanLine { from { left:-100%; } to { left:100%; } }
      @keyframes vinylSpin { to { transform:rotate(360deg); } }
      @keyframes barPulse { from { height:3px; } to { height:10px; } }
      @keyframes statusPulse { 0%,100% { box-shadow:0 0 8px #4ade80; } 50% { box-shadow:0 0 2px #4ade80; } }
      @keyframes spotifyIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes navIn { from { opacity:0; transform:translateX(-50%) translateY(-10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    `}</style>
  );
}

function GlitchCursor() {
  const canvasRef = useRef(null);
  const mousePos  = useRef({ x: -999, y: -999 });
  const targetPos = useRef({ x: -999, y: -999 });
  const glitchRef = useRef({ active: false, intensity: 0 });
  const timerRef  = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    const triggerGlitch = (intensity) => {
      glitchRef.current = { active: true, intensity };
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => { glitchRef.current = { active: false, intensity: 0 }; },
        intensity > 0.7 ? 280 : 120
      );
    };

    const onMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (Math.random() < 0.04) triggerGlitch(0.4);
    };
    document.addEventListener("mousemove", onMove);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-glitch]").forEach((el) => {
        el.addEventListener("mouseenter", () => triggerGlitch(1));
        el.addEventListener("mouseleave", () => {
          glitchRef.current = { active: false, intensity: 0 };
        });
      });
    };
    setTimeout(attachHover, 500);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.18;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.18;
      ctx.clearRect(0, 0, W, H);

      const cx = mousePos.current.x;
      const cy = mousePos.current.y;
      const g  = glitchRef.current;
      const dotR = g.active ? 3 + g.intensity * 4 : 3;

      ctx.save();
      ctx.globalCompositeOperation = "difference";

      if (g.active) {
        const off = g.intensity * 6;
        ctx.fillStyle = "rgba(255,0,60,0.9)";
        ctx.beginPath(); ctx.arc(cx - off, cy, dotR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(0,255,200,0.9)";
        ctx.beginPath(); ctx.arc(cx + off, cy, dotR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.beginPath(); ctx.arc(cx, cy, dotR * 0.5, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI * 2); ctx.fill();
      }

      const lCount = g.active ? 6 : 2;
      const lLen   = g.active ? 18 + g.intensity * 24 : 10;
      ctx.strokeStyle = g.active
        ? "rgba(255,255,255," + (0.3 + g.intensity * 0.4) + ")"
        : "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < lCount; i++) {
        const angle = (i / lCount) * Math.PI * 2 + (g.active ? (Math.random() - 0.5) * 0.4 : 0);
        const gap   = dotR + 5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * gap, cy + Math.sin(angle) * gap);
        ctx.lineTo(cx + Math.cos(angle) * (gap + lLen), cy + Math.sin(angle) * (gap + lLen));
        ctx.stroke();
      }

      const baseR = g.active ? 40 + g.intensity * 60 : 28;
      ctx.globalCompositeOperation = "screen";
      const grad = ctx.createRadialGradient(cx, cy, baseR * 0.5, cx, cy, baseR);
      grad.addColorStop(0, g.active ? "rgba(255,50,100,0.2)" : "rgba(255,255,255,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, baseR, 0, Math.PI * 2); ctx.fill();

      if (g.active) {
        ctx.globalCompositeOperation = "difference";
        const bands = Math.floor(g.intensity * 5) + 1;
        for (let b = 0; b < bands; b++) {
          const bY = cy + (Math.random() - 0.5) * baseR * 1.4;
          const bH = 1 + Math.random() * 2;
          const bW = 20 + Math.random() * 60;
          const bX = cx - bW / 2 + (Math.random() - 0.5) * 20;
          const rv = Math.random() > 0.5 ? 255 : 0;
          const gv = Math.random() > 0.5 ? 255 : 0;
          const bv = Math.random() > 0.5 ? 255 : 0;
          ctx.fillStyle = "rgba(" + rv + "," + gv + "," + bv + "," + (0.3 + Math.random() * 0.4) + ")";
          ctx.fillRect(bX, bY, bW, bH);
        }
        ctx.strokeStyle = "rgba(0,255,200," + (0.6 + g.intensity * 0.3) + ")";
        ctx.lineWidth = 1.5;
        const ts = 8 + g.intensity * 10;
        const tg = baseR * 0.85;
        const corners = [[1,1],[-1,1],[1,-1],[-1,-1]];
        corners.forEach(function(pair) {
          const sx = pair[0];
          const sy = pair[1];
          ctx.beginPath();
          ctx.moveTo(cx + sx * tg, cy + sy * tg - sy * ts);
          ctx.lineTo(cx + sx * tg, cy + sy * tg);
          ctx.lineTo(cx + sx * tg - sx * ts, cy + sy * tg);
          ctx.stroke();
        });
      }

      ctx.restore();
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
    />
  );
}

const NAV_ITEMS = [
  { id: "hero",     label: "./home"   },
  { id: "about",    label: "about"    },
  { id: "projects", label: "projects" },
  { id: "contact",  label: "contact"  },
];

function Navbar({ active }) {
  const navRef   = useRef(null);
  const pillRefs = useRef({});
  const [hl, setHl] = useState({ left: 8, width: 80 });

  const updateHl = useCallback((id) => {
    const nav  = navRef.current;
    const pill = pillRefs.current[id];
    if (!nav || !pill) return;
    const nr = nav.getBoundingClientRect();
    const pr = pill.getBoundingClientRect();
    setHl({ left: pr.left - nr.left, width: pr.width });
  }, []);

  useEffect(() => { updateHl(active); }, [active, updateHl]);

  useEffect(() => {
    const ro = new ResizeObserver(() => updateHl(active));
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [active, updateHl]);

  return (
    <nav ref={navRef} style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:1000, background:"rgba(10,10,10,0.88)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, padding:"6px 8px", display:"flex", alignItems:"center", gap:2, boxShadow:"0 8px 32px rgba(0,0,0,0.6)", animation:"navIn .5s .1s both" }}>
      <div style={{ position:"absolute", top:6, height:"calc(100% - 12px)", background:"#f5f5f5", borderRadius:100, zIndex:0, pointerEvents:"none", transition:"left .4s cubic-bezier(.34,1.56,.64,1), width .4s cubic-bezier(.34,1.56,.64,1)", left:hl.left, width:hl.width }} />
      {NAV_ITEMS.map(({ id, label }) => (
        <a key={id} ref={(el) => { pillRefs.current[id] = el; }} href={"#" + id} style={{ position:"relative", zIndex:1, padding:"8px 18px", fontFamily:MONO, fontSize:12, color:active === id ? "#080808" : "rgba(245,245,245,0.6)", textDecoration:"none", borderRadius:100, transition:"color .25s", whiteSpace:"nowrap" }}>
          {label}
        </a>
      ))}
    </nav>
  );
}

function SpotifyWidget({ track, artist, progress }) {
  return (
    <div style={{ position:"fixed", bottom:28, right:28, zIndex:900, background:"rgba(10,10,10,0.9)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, minWidth:260, maxWidth:320, boxShadow:"0 8px 32px rgba(0,0,0,0.6)", animation:"spotifyIn .6s 1.4s both", overflow:"hidden" }}>
      <div style={{ width:46, height:46, borderRadius:9, background:"#111", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:"conic-gradient(#111 0deg,#2a2a2a 90deg,#111 180deg,#2a2a2a 270deg,#111 360deg)", animation:"vinylSpin 3s linear infinite", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:9, height:9, borderRadius:"50%", background:"#080808", border:"1px solid #333" }} />
        </div>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:10 }}>
            {[0, 0.2, 0.4].map((d, i) => (
              <div key={i} style={{ width:2, background:"#1DB954", borderRadius:1, animation:"barPulse 0.8s " + d + "s ease-in-out infinite alternate" }} />
            ))}
          </div>
          <span style={{ fontFamily:MONO, fontSize:9, color:"#1DB954", letterSpacing:"0.15em" }}>NOW PLAYING</span>
        </div>
        <div style={{ fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{track}</div>
        <div style={{ fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.6)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{artist}</div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"rgba(255,255,255,0.06)" }}>
        <div style={{ height:"100%", width:progress + "%", background:"#1DB954" }} />
      </div>
    </div>
  );
}

const glassStyle = { background:"rgba(255,255,255,0.05)", backdropFilter:"blur(20px) saturate(1.6)", WebkitBackdropFilter:"blur(20px) saturate(1.6)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:28, position:"relative", overflow:"hidden" };
const labelStyle = { fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.55)", letterSpacing:"0.18em", textTransform:"uppercase" };

function Divider() {
  return <div style={{ height:1, maxWidth:1200, margin:"0 auto", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />;
}

function Hero() {
  const tags = ["Python","PyTorch","Computer Vision","PySide6","Vue.js","Node.js"];
  return (
    <section id="hero" style={{ position:"relative", maxWidth:1200, margin:"0 auto", padding:"160px 5vw 100px", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <div style={{ fontFamily:MONO, fontSize:12, color:"rgba(245,245,245,0.55)", letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:28, animation:"fadeUp .8s .2s both" }}>
        // CS Final Year · Adeleke University · Nigeria
      </div>
      <h1 style={{ fontFamily:SANS, fontWeight:800, lineHeight:0.9, letterSpacing:"-0.03em", marginBottom:24, fontSize:"clamp(52px,9vw,110px)", animation:"fadeUp .8s .4s both" }}>
        Uche<br />
        <span style={{ color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.38)" }}>Builds</span><br />
        Things.
      </h1>
      <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"rgba(245,245,245,0.6)", maxWidth:520, lineHeight:1.7, marginBottom:44, animation:"fadeUp .8s .6s both" }}>
        Software engineer focused on machine learning systems and clean interfaces. I turn complex pipelines into things that actually work.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:48, animation:"fadeUp .8s .72s both" }}>
        {tags.map((t) => (
          <span key={t} style={{ fontFamily:MONO, fontSize:11, padding:"6px 14px", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, color:"rgba(245,245,245,0.6)", background:"rgba(255,255,255,0.04)" }}>{t}</span>
        ))}
      </div>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", animation:"fadeUp .8s .85s both" }}>
        <a href="#projects" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 26px", background:"#f5f5f5", color:"#080808", fontFamily:MONO, fontSize:13, fontWeight:700, textDecoration:"none", borderRadius:100 }}>View Projects</a>
        <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 26px", background:"transparent", color:"#f5f5f5", fontFamily:MONO, fontSize:13, textDecoration:"none", borderRadius:100, border:"1px solid rgba(255,255,255,0.12)" }}>Get in Touch</a>
      </div>
      <div style={{ position:"absolute", bottom:40, left:"5vw", display:"flex", alignItems:"center", gap:12, fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.25)", animation:"fadeUp .8s 1.1s both" }}>
        <div style={{ width:40, height:1, background:"rgba(255,255,255,0.15)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:"-100%", width:"100%", height:"100%", background:"#f5f5f5", animation:"scanLine 2s 1.4s infinite" }} />
        </div>
        scroll
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { num:"3+",   label:"Years coding"     },
    { num:"5+",   label:"Projects shipped" },
    { num:"B.Sc", label:"Computer Science" },
    { num:"2027", label:"Masters target"   },
  ];
  const groups = [
    { g:"ML / AI",         chips:["PyTorch","DINO ViT","UMAP","HDBSCAN","Contrastive Learning","NumPy"] },
    { g:"Frontend",        chips:["Vue.js","Vite","PySide6","HTML/CSS","JavaScript"]                    },
    { g:"Backend / Tools", chips:["Node.js","MongoDB","Python","Git","Linux"]                           },
  ];
  return (
    <section id="about" style={{ maxWidth:1200, margin:"0 auto", padding:"120px 5vw" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
        <div>
          <div style={{ ...labelStyle, marginBottom:16 }}>// 01 about me</div>
          <h2 style={{ fontFamily:SANS, fontSize:"clamp(32px,5vw,52px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:22 }}>
            Engineer.<br />Builder.<br />Problem solver.
          </h2>
          <p style={{ color:"rgba(245,245,245,0.6)", lineHeight:1.8, fontSize:16, marginBottom:16 }}>
            Final year CS student with a thing for ML systems that actually ship. FYP is an unsupervised image clustering pipeline: DINO ViT embeddings, UMAP, HDBSCAN — no labels, no hand-holding.
          </p>
          <p style={{ color:"rgba(245,245,245,0.6)", lineHeight:1.8, fontSize:16 }}>
            I care about the full stack: from model architecture down to the UI that makes it usable. Targeting a master's in Germany (2027) after NYSC.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:32 }}>
            {stats.map((s) => (
              <div key={s.label} style={glassStyle}>
                <div style={{ fontFamily:MONO, fontSize:32, fontWeight:700, lineHeight:1, marginBottom:6 }}>{s.num}</div>
                <div style={labelStyle}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:26 }}>
          <div style={{ ...labelStyle, marginBottom:4 }}>// skills</div>
          {groups.map(({ g, chips }) => (
            <div key={g}>
              <div style={{ ...labelStyle, marginBottom:10 }}>{g}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {chips.map((c) => (
                  <span key={c} style={{ fontFamily:MONO, fontSize:12, padding:"6px 13px", borderRadius:100, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"#f5f5f5" }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { num:"001", span:7, badge:"Featured", title:"Unsupervised Image Clustering System", desc:"FYP. DINO ViT-S/8 to UMAP to HDBSCAN with MLP projection head trained via supervised contrastive loss. PySide6 desktop UI. No labels needed. Benchmarked on STL-10 and TinyImageNet.", stack:["PyTorch","DINO","UMAP","HDBSCAN","PySide6","STL-10"] },
  { num:"002", span:5, title:"Playlist Transfer App", desc:"Cross-platform playlist migration. Move your library between streaming services without losing a track.", stack:["Vue.js","Node.js","MongoDB","Spotify API"] },
  { num:"003", span:4, title:"Your Project 3", desc:"Short description of what this does and why it matters.", stack:["Python","FastAPI"] },
  { num:"004", span:4, title:"Your Project 4", desc:"Short description of what this does and why it matters.", stack:["Vue","MongoDB"] },
  { num:"005", span:4, title:"Your Project 5", desc:"Short description of what this does and why it matters.", stack:["C++","Arduino"] },
];

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div data-glitch onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...glassStyle, gridColumn:"span " + p.span, transform:hov ? "translateY(-5px)" : "translateY(0)", borderColor:hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)", boxShadow:hov ? "0 24px 64px rgba(0,0,0,0.5)" : "none", transition:"transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s, box-shadow .3s" }}>
      <div style={{ fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.25)", letterSpacing:"0.18em", marginBottom:16 }}>
        {"// " + p.num + (p.badge ? " · " + p.badge : "")}
      </div>
      <h3 style={{ fontSize:20, fontWeight:700, marginBottom:10 }}>{p.title}</h3>
      <p style={{ fontSize:14, color:"rgba(245,245,245,0.6)", lineHeight:1.7, marginBottom:22 }}>{p.desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:22 }}>
        {p.stack.map((s) => (
          <span key={s} style={{ fontFamily:MONO, fontSize:10, padding:"4px 10px", borderRadius:100, border:"1px solid rgba(255,255,255,0.1)", color:"rgba(245,245,245,0.55)" }}>{s}</span>
        ))}
      </div>
      <a href="#" style={{ fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.6)", textDecoration:"none" }}>GitHub</a>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ maxWidth:1200, margin:"0 auto", padding:"120px 5vw" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52 }}>
        <div>
          <div style={{ ...labelStyle, marginBottom:16 }}>// 02 selected work</div>
          <h2 style={{ fontFamily:SANS, fontSize:"clamp(34px,5vw,54px)", fontWeight:800, letterSpacing:"-0.02em" }}>Projects</h2>
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 26px", background:"transparent", color:"#f5f5f5", fontFamily:MONO, fontSize:13, textDecoration:"none", borderRadius:100, border:"1px solid rgba(255,255,255,0.12)" }}>All on GitHub</a>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:16 }}>
        {PROJECTS.map((p) => <ProjectCard key={p.num} p={p} />)}
      </div>
    </section>
  );
}

function InputField({ label, placeholder, type, textarea }) {
  const s = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"13px 16px", color:"#f5f5f5", fontFamily:MONO, fontSize:13, width:"100%", resize:"none" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? <textarea placeholder={placeholder} rows={5} style={s} /> : <input type={type || "text"} placeholder={placeholder} style={s} />}
    </div>
  );
}

function Contact() {
  const [hovIdx, setHovIdx] = useState(null);
  const methods = [
    { label:"Email",       val:"you@email.com",              href:"mailto:you@email.com" },
    { label:"LinkedIn",    val:"linkedin.com/in/yourhandle", href:"https://linkedin.com" },
    { label:"GitHub",      val:"github.com/yourhandle",      href:"https://github.com"   },
    { label:"Twitter / X", val:"@yourhandle",                href:"https://x.com"        },
  ];
  return (
    <section id="contact" style={{ maxWidth:1200, margin:"0 auto", padding:"120px 5vw", textAlign:"center" }}>
      <div style={{ ...labelStyle, textAlign:"center", marginBottom:16 }}>// 03 get in touch</div>
      <h2 style={{ fontFamily:SANS, fontSize:"clamp(40px,7vw,80px)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:20 }}>
        Lets talk.
      </h2>
      <p style={{ color:"rgba(245,245,245,0.6)", fontSize:17, lineHeight:1.7, maxWidth:500, margin:"0 auto 52px" }}>
        Open to collaborations, opportunities, and interesting problems.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:36, textAlign:"left" }}>
        {methods.map((m, i) => (
          <a key={m.label} href={m.href} target="_blank" rel="noreferrer" data-glitch
            onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}
            style={{ ...glassStyle, textDecoration:"none", color:"#f5f5f5", display:"block", transform:hovIdx === i ? "translateY(-4px)" : "translateY(0)", borderColor:hovIdx === i ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)", transition:"transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s" }}>
            <h4 style={{ fontSize:15, fontWeight:700, marginBottom:6 }}>{m.label}</h4>
            <span style={{ fontFamily:MONO, fontSize:12, color:"rgba(245,245,245,0.6)" }}>{m.val}</span>
          </a>
        ))}
      </div>
      <div style={{ ...glassStyle, textAlign:"left" }}>
        <div style={{ ...labelStyle, marginBottom:24 }}>// send a message</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <InputField label="Name"  placeholder="Your name"      />
          <InputField label="Email" placeholder="your@email.com" type="email" />
        </div>
        <InputField label="Subject" placeholder="What is this about?" />
        <InputField label="Message" placeholder="Tell me what you are working on..." textarea />
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
          <button type="button" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 26px", background:"#f5f5f5", color:"#080808", fontFamily:MONO, fontSize:13, fontWeight:700, borderRadius:100, border:"none" }}>
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.08)", padding:"36px 5vw" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontFamily:MONO, fontSize:15, fontWeight:700 }}>uche_</div>
          <div style={{ fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.25)" }}>2025 · Built with intention, not a template.</div>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {["hero","about","projects","contact"].map((id) => (
            <a key={id} href={"#" + id} style={{ fontFamily:MONO, fontSize:12, color:"rgba(245,245,245,0.6)", textDecoration:"none" }}>{id}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {["GH","LI","X"].map((s) => (
            <a key={s} href="#" style={{ width:36, height:36, border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.04)", color:"rgba(245,245,245,0.6)", textDecoration:"none", fontFamily:MONO, fontSize:10 }}>{s}</a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:MONO, fontSize:11, color:"rgba(245,245,245,0.6)" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", animation:"statusPulse 2s infinite" }} />
          Available for opportunities
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero","about","projects","contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <GlitchCursor />
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
      <Navbar active={active} />
      <div style={{ position:"relative", zIndex:1 }}>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
        <Footer />
      </div>
      <SpotifyWidget track="Song Title Here" artist="Artist Name" progress={38} />
    </>
  );
}
