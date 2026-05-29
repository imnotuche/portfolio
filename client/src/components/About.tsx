import SectionLabel from "./UI/SectionLabel";
import GlassCard from "./UI/GlassCard";
import SpotifyCard from "./UI/SpotifyCard";

export default function About() {

    const stats = [["3+", "Projects"], ["B.sc.", "Computer Science"], ["Full Stack", "Developer"]];
    const SKILLS = [
        "React", "Next.js", "TypeScript", "Node.js", "Vue", "PostgreSQL", 
        "Render", "Vercel", "MongoDB Atlas",
        "MongoDB", "Redis", "Python", "ML", "Express", "Git", "REST", "APIs",
        "PyTorch", "scikit-learn"
    ];

    return (
        <section
            id="about"
            className="
                relative z-10
                min-h-screen
                px-6 pt-25 pb-20
                max-w-225 mx-auto
            "
        >
            <SectionLabel>01 — About</SectionLabel>

            <div className="grid gap-9 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                
                <div>
                    <h2 className="
                        text-[clamp(26px,4vw,36px)]
                        text-white
                        font-bold tracking-[-0.03em]
                        leading-[1.2] mb-4.5
                    ">
                        Obsessed with systems that{" "}
                        <span className="text-white/30 italic">think.</span>
                    </h2>

                    <p className="text-white/40 leading-[1.85] text-[14px] mb-3">
                        I'm a software engineer focused primarily on full-stack and backend development, 
                        with growing experience in machine learning and intelligent systems.
                        My work ranges from web applications and REST APIs to experimental ML projects involving clustering, 
                        classification, and data analysis. I enjoy building systems that combine solid engineering with practical problem-solving.
                    </p>

                    <p className="text-white/40 leading-[1.85] text-[14px] mb-7">
                        I'm especially interested in backend architecture, machine learning workflows, 
                        and data-centric applications.
                    </p>

                    <div className="flex gap-7 flex-wrap">
                        {stats.map(([val, lbl]) => (
                            <div key={lbl}>
                                <div className="font-mono text-[26px] font-bold text-white leading-none">
                                    {val}
                                </div>
                                <div className="text-[10px] text-white/30 mt-1 tracking-[0.12em] uppercase">
                                    {lbl}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4.5">
                    <GlassCard className="p-5.5">
                        <p className="
                            font-mono text-[10px] tracking-[0.2em]
                            text-white/25 uppercase mb-3
                        ">
                            Skills & Tools
                        </p>
                        <div className="flex flex-wrap gap-1.75">
                            {SKILLS.map(s => (
                                <span
                                    key={s}
                                    className="
                                        font-mono text-[10px] tracking-[0.09em]
                                        px-2.75 py-1.25 rounded-full
                                        bg-white/5 border border-white/10
                                        text-white/50
                                    "
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </GlassCard>

                    {/*<SpotifyCard />*/}

                </div>
            </div>
        </section>
    );

}