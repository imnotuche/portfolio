"use client";

import { useState, useEffect } from "react";

const full = "Uche";

export default function Home() {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        let deleting = false;
        let timeout: ReturnType<typeof setTimeout>;

        const tick = () => {
            if (!deleting) {
                setDisplayed(full.slice(0, i + 1));
                i++;
                if (i === full.length) deleting = true;
            } else {
                setDisplayed(full.slice(0, i - 1));
                i--;
                if (i === 0) deleting = false;
            }
            const delay = deleting ? 800 : 400;
            timeout = setTimeout(tick, delay);
        };

        timeout = setTimeout(tick, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section
            id="home"
            className="relative z-10 min-h-screen flex flex-col justify-center px-6 pt-30 pb-20 max-w-225 mx-auto"
        >
            <div className="font-mono text-[11px] tracking-[0.3em] text-white/25 uppercase mb-6">
                <div className="flex items-center gap-2.5 mb-8">
                    <div
                        className="w-2 h-2 rounded-full bg-[#22ff88] shadow-[0_0_12px_#22ff88]"
                        style={{ animation: "blink 2s ease-in-out infinite" }}
                    />
                    <span className="text-[12px] tracking-[0.2em] text-white/40 uppercase">
                        Available for work
                    </span>
                </div>
            </div>

            <h1
                className="font-mono text-[clamp(48px,9vw,92px)] font-extrabold leading-[0.95] tracking-[-0.04em] mb-6"
                style={{
                    background: "linear-gradient(180deg, #fff 55%, rgba(255,255,255,0.3) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                <span>{displayed}</span>
                <span>_</span>
                <br />
                <span
                    className="text-[clamp(28px,5.5vw,58px)] font-normal tracking-[-0.02em]"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.18) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Software Engineer &<br />ML Engineer
                </span>
            </h1>

            <p className="text-[15px] text-white/40 max-w-110 leading-[1.85] mb-9">
                Building scalable web applications, backend systems, and machine learning
                projects with a focus on performance, usability, and real-world impact. B.Sc. Computer Science
            </p>

            <div className="absolute bottom-10 left-6 flex flex-col items-center gap-2">
                <div
                    className="w-px h-11 bg-linear-to-b from-transparent to-white/30"
                    style={{ animation: "scrollPulse 2s ease infinite" }}
                />
                <span
                    className="font-mono text-[9px] tracking-[0.22em] text-white/20 uppercase"
                    style={{ writingMode: "vertical-rl" }}
                >
                    scroll
                </span>
            </div>
        </section>
    );
}