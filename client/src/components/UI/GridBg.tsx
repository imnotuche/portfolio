type GridBgProps = {
    children?: React.ReactNode;
}

export default function GridBg({ children }: GridBgProps) {
    return (
        <>
            <div
                className="fixed inset-0 z-0 bg-black"
                style={{
                    backgroundImage: `
                        radial-gradient(ellipse, transparent 10%, black 100%),
                        linear-gradient(to right, rgba(31, 31, 31, 0.6) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(31, 31, 31, 0.6) 1px, transparent 1px)
                    `,
                    backgroundSize: "100% 100%, 50px 50px, 50px 50px",
                }}
            />
            <div
                className="fixed left-0 right-0 h-0.5 pointer-events-none z-9999"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    animation: "scanline 8s linear infinite, scanLinePulse 0.07s infinite",
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </>
    )
}