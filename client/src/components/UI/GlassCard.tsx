"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    glare?: boolean;
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function GlassCard({ 
    children, 
    className = "",
    glare = false,
    onMouseEnter, 
    onMouseLeave 
}: GlassCardProps) {

    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const background = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 70%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        mouseX.set(-999);
        mouseY.set(-999);
        onMouseLeave?.(e);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className={`
                bg-white/4 border border-white/8
                relative overflow-hidden rounded-[20px]
                backdrop-blur-xl
                transition-[border-color,box-shadow,transform] duration-300
                ${className}
            `}
            style={{
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                transitionTimingFunction: "cubic-bezier(0.34,1.4,0.64,1)",
            }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{ 
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)"
                }}
            />
            {glare && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background }}
                />
            )}
            {children}
        </motion.div>
    );
}