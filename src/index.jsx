import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import App from "./App.jsx"
import "./index.css"

const root = createRoot(document.getElementById("root"))

const Intro = () => {
    const [started, setStarted] = useState(false)

    return (
    <>
        <Canvas>
            <App started={started} />
        </Canvas>
        <div className={`fullscreen bg ${started ? "clicked" : ""}`}>
            <button onClick={() => setStarted(true)}>
                Start
            </button>
        </div>
    </>
    )
}

root.render(
  <Intro />
)
