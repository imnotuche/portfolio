"use client";

import { useState } from "react";
import SectionLabel from "./UI/SectionLabel";
import GlassCard from "./UI/GlassCard";
import ContactInput from "./UI/ContactInput";

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.75 h-3.75">
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <path d="m3 7 9 6 9-6" />
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.75 h-3.75">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.75 h-3.75">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.75 h-3.75">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.51 5.831L.057 23.535a.75.75 0 0 0 .908.908l5.704-1.453A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.953-1.355l-.355-.214-3.683.938.955-3.587-.233-.371A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
);

const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.75 h-3.75">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.81 13.81 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
);

const channels = [
    { icon: <EmailIcon />, label: "Email", value: "uchechukwuekwe714@gmail.com", href: "mailto:uchechukwuekwe714@gmail.com" },
    { icon: <GitHubIcon />, label: "GitHub", value: "@imnotuche", href: "https://github.com/imnotuche" },
    { icon: <XIcon />, label: "Twitter / X", value: "@imnotuche", href: "https://x.com/imnotuche" },
    { icon: <WhatsAppIcon />, label: "Whatsapp", value: "08127644432", href: "https://wa.me/2348127644432" },
    { icon: <DiscordIcon />, label: "Discord", value: "@imnotuche", href: "https://discord.com/users/1099740092748284005" },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async () => {
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setStatus(data.success ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="min-h-screen px-6 pt-25 pb-20 max-w-225 mx-auto relative z-10">
            <SectionLabel>03 — Contact</SectionLabel>
            <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                <div>
                    <h2 className="text-[clamp(26px,4vw,36px)] text-white font-bold tracking-[-0.03em] mb-3.5 leading-[1.2]">
                        Let's build<br />
                        <span className="text-white/[0.28] italic">something.</span>
                    </h2>
                    <p className="text-white/38 leading-[1.8] text-sm mb-7.5">
                        Open to collaborations, research discussions, internships, and interesting problems. Response within 24 hours.
                    </p>
                    <div className="flex flex-col">
                        {channels.map((ch) => (
                            
                            <a
                                key={ch.label}
                                href={ch.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3.5 no-underline py-3.25 border-b border-white/6 transition-opacity duration-200 hover:opacity-65"
                            >
                                <span className="text-white/[0.28] w-5 flex items-center justify-center shrink-0">
                                    {ch.icon}
                                </span>
                                <div>
                                    <div className="font-mono text-[10px] tracking-[0.15em] text-white/22 uppercase">{ch.label}</div>
                                    <div className="text-[13px] text-white/55 mt-0.5">{ch.value}</div>
                                </div>
                                <span className="ml-auto text-white/20 text-[13px]">↗</span>
                            </a>
                        ))}
                    </div>
                </div>

                <GlassCard className="p-6.5">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-white/22 mb-5.5 uppercase">
                        Send a Message
                    </div>
                    <ContactInput label="Name" placeholder="Your name" value={form.name} onChange={handleChange("name")} />
                    <ContactInput label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange("email")} />
                    <ContactInput label="Subject" placeholder="What's this about?" value={form.subject} onChange={handleChange("subject")} />
                    <ContactInput label="Message" placeholder="Tell me more..." multiline value={form.message} onChange={handleChange("message")} />

                    {status === "success" && (
                        <p className="text-green-400 text-xs mt-2 mb-1">Message sent.</p>
                    )}
                    {status === "error" && (
                        <p className="text-red-400 text-xs mt-2 mb-1">Something went wrong. Try again.</p>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                        className="w-full py-3.25 rounded-xl bg-white text-black border-none text-[13px] font-bold cursor-pointer tracking-[0.08em] mt-1 transition-opacity duration-200 hover:opacity-[0.88] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Sending..." : "Send Message ↗"}
                    </button>
                </GlassCard>
            </div>
        </section>
    );
}