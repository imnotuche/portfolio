import SectionLabel from "./UI/SectionLabel";
import GlassCard from "./UI/GlassCard";
import ContactInput from "./UI/ContactInput";

export default function Contact () { 

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
                {[
                { icon: "✉", label: "Email", value: "uchechukwuekwe714@gmail.com", href: "mailto:uchechukwuekwe714@gmail.com" },
                { icon: "⌥", label: "GitHub", value: "@imnotuche", href: "https://github.com/imnotuche" },
                { icon: "◎", label: "Twitter / X", value: "@imnotuche", href: "https://x.com/imnotuche" },
                { icon: "💬", label: "Whatsapp", value: "08127644432", href: "https://wa.me/2348127644432" },
                ].map((ch) => (
                <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 no-underline py-3.25 border-b border-white/6 transition-opacity duration-200 hover:opacity-65"
                >
                    <span className="text-[15px] text-white/[0.28] w-5 text-center shrink-0">{ch.icon}</span>
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
            <ContactInput label="Name" placeholder="Your name"/>
            <ContactInput label="Email" type="email" placeholder="your@email.com" />
            <ContactInput label="Subject" placeholder="What's this about?" />
            <ContactInput label="Message" placeholder="Tell me more..." multiline />
            <button className="w-full py-3.25 rounded-xl bg-white text-black border-none text-[13px] font-bold cursor-pointer tracking-[0.08em] mt-1 transition-opacity duration-200 hover:opacity-[0.88]">
                Send Message ↗
            </button>
            </GlassCard>
        </div>
        </section>
    )

}  