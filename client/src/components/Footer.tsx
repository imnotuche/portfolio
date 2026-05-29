

export default function Footer() {

    return (
        <>
            <footer className="
                relative z-10
                flex justify-between items-center
                flex-wrap gap-5 
                max-w-225 mx-auto  
                py-9 px-6 
                border-t border-white/[0.07] 
            ">

                <div>

                    <div className="
                        text-[15px] text-white
                        font-mono font-bold  
                        tracking-[0.06em] 
                        mb-1
                    ">

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
                    <div>© {new Date().getFullYear()} Uche</div>
                </div>

            </footer>
        </>
    );

}