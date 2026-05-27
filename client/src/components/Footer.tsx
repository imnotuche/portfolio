export default function Footer() {

    return (
        <>
            <footer className="border-t border-white/[0.07] py-9 px-6 max-w-225 mx-auto flex justify-between items-center flex-wrap gap-5 relative z-10">
                <div>

                    <div className="font-mono text-[15px] font-bold text-white tracking-[0.06em] mb-1">
                        UCHE
                        <span style={{
                            animation: "cursorBlink 1.5s step-end infinite"
                        }}>_</span>
                    </div>
                    
                    <div className="font-mono text-[10px] text-white/18 tracking-[0.14em] uppercase">
                        Software Engineer & ML Engineer
                    </div>

                </div>

                <div className="font-mono text-[10px] text-white/16 tracking-widest text-right">
                    <div>© 2026 Uche</div>
                </div>

            </footer>
        </>
    );

}