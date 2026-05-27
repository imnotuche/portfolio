import GlassCard from "./GlassCard";

export default function SpotifyCard() {

    const bars = Array.from({ length: 40 }, () => Math.random() * 0.8);

    return (
        <GlassCard className="p-5.5">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="font-mono text-[10px] tracking-[0.15em] text-white/35 uppercase">
                    WHAT IM LISTENING TO
                </span>
                <span
                    className="ml-auto w-1.75 h-1.75 rounded-full shrink-0 transition-all duration-300"
                    style={{
                        
                    }}
                />
            </div>

            {/* Track info */}
            <div className="flex gap-3.5 items-center">
                <div
                    className="
                        w-14 h-14 rounded-[10px] shrink-0
                        border border-white/10
                        flex items-center justify-center
                        text-[22px]
                    "
                    style={{ background: "linear-gradient(135deg, #222, #3a3a3a)" }}
                >
                    ♪
                </div>

                <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-[13px] mb-0.5 truncate">
                        Song Title Here
                    </div>
                    <div className="text-white/40 text-[11px] font-mono">
                        Artist Name
                    </div>

                </div>

                <div className="flex items-end gap-0.5 h-8">
                    {bars.map((d, i) => (
                        <div
                        key={i}
                        className="w-0.5 bg-[#1DB954] rounded-sm"
                        style={{ animation: `barPulse 0.5s ${d}s ease-in-out infinite alternate` }}
                        />
                    ))}
                </div>

            </div>

        </GlassCard>
    );
}