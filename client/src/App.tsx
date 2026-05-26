import { Routes, Route } from "react-router-dom"
import Portfolio from "./components/portfolio"
import Portfolio3 from "./components/portfolio-1"
import Portfolio1 from "./components/Portfolio1"
import Portfolio2 from "./components/Portfolio2"

function App() {

  return (
    <>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/p1" element={<Portfolio1 />} />
        <Route path="/p2" element={<Portfolio2 />} />
        <Route path="/p3" element={<Portfolio3 />} />
      </Routes>
    </>
  )
}

export default App
