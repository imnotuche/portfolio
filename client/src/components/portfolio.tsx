import GridBg from "./UI/GridBg"
import NavBar from "./UI/NavBar"
import Home from "./Home"
import About from "./About"
import Projects from "./Projects"
import Contact from "./Contact"
import Footer from "./Footer"
import { LenisProvider } from "./LenisContext"

export default function Portfolio() {
    return (
        <LenisProvider>
            <GridBg>
                <NavBar/>
                <Home/>
                <About/>
                <Projects/>
                <Contact/>
                <Footer/>
            </GridBg>
        </LenisProvider>
    )
}