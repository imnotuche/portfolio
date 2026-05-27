type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function GlassCard({ children, className = "", onMouseEnter, onMouseLeave }: GlassCardProps) {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`
                relative overflow-hidden rounded-[20px]
                bg-white/4 border border-white/8
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
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
            />
            {children}
        </div>
    );
}