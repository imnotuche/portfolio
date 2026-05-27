export default function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 mb-11">
            <span className="font-mono text-[11px] tracking-[0.25em] text-white/25 uppercase whitespace-nowrap">
                {children}
            </span>
            <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }}
            />
        </div>
    );
}