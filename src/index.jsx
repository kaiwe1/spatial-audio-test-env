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
        {/* 3D scene */}
        <Canvas>
            <App started={started} />
        </Canvas>
        {/* fullscreen */}
        <div className={`fullscreen bg ${started ? "clicked" : ""}`}>
            <button onClick={() => setStarted(true)}>
                Play in VR
            </button>
            <button onClick={() => setStarted(true)}>
                Play in Non-VR
            </button>
        </div>
    </>
    )
}

root.render(
  <Intro />
)
