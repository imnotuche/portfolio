"use client";

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
        let lastScrollY = window.scrollY;

        const handleScroll = () => { lastScrollY = window.scrollY; };
        window.addEventListener("scroll", handleScroll, { passive: true });

        navItems.forEach((name, index) => {
            const section = document.getElementById(name);
            if (!section) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    const scrollingDown = window.scrollY >= lastScrollY;

                    if (scrollingDown && entry.isIntersecting) {
                        setActiveIndex(index);
                    } else if (!scrollingDown && entry.isIntersecting) {
                        setActiveIndex(index);
                    } else if (!scrollingDown && !entry.isIntersecting && entry.boundingClientRect.bottom > 0) {
                        // section just scrolled out from the bottom while going up
                        setActiveIndex(Math.max(0, index - 1));
                    }
                },
                { threshold: 0, rootMargin: "-80px 0px -60% 0px" }
            );

            observer.observe(section);
            observers.push(observer);
        });

        return () => {
            observers.forEach((o) => o.disconnect());
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="
            bg-white/5 backdrop-blur-md
            fixed top-5 left-1/2 -translate-x-1/2
            flex items-center overflow-hidden
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
                                    stiffness: 250,
                                    damping: 18,
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