import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "../LenisContext";

const navItems = ["home", "about", "projects", "contact"];

export default function NavBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const lenis = useLenis();

    function scrollToSection(name: string, index: number) {
        setActiveIndex(index);
        lenis?.scrollTo(`#${name}`, { duration: 1.2 });
    }

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        navItems.forEach((name, index) => {
            const section = document.getElementById(name);
            if (!section) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveIndex(index);
                },
                { threshold: 0.5 }
            );

            observer.observe(section);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <nav className="
            bg-white/5 backdrop-blur-md
            fixed top-5 left-1/2 -translate-x-1/2
            flex items-center
            border border-white/10
            rounded-full px-1 py-1
            gap-1 z-50
        ">
            <AnimatePresence>
                {navItems.map((name, index) => (
                    <button
                        key={name}
                        className="relative z-10 px-4 py-2 rounded-full tracking-widest text-xs font-mono font-medium transition-colors duration-200"
                        onClick={() => scrollToSection(name, index)}
                        style={{ color: activeIndex === index ? "#fff" : "rgba(255,255,255,0.4)" }}
                    >
                        {activeIndex === index && (
                            <motion.span
                                layoutId="pill"
                                className="absolute inset-0 bg-white/10 border border-white/15 rounded-full -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            />
                        )}
                        {name === "home" ? "./" : name}
                    </button>
                ))}
            </AnimatePresence>
        </nav>
    );
}