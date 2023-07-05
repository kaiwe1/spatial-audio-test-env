import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import App from "./App.jsx"
import "./style.css"
import { KeyboardControls, PointerLockControls } from "@react-three/drei"
import Stats from "./components/Stats.jsx"

const root = createRoot(document.getElementById("root"))

const map = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
  { name: "menu", keys: ["M", "m"] },
]

const Intro = () => {
  const [ready, setReady] = useState(false)

  return (
    <>
      {/* 3D scene */}
      {ready && (
        <KeyboardControls map={map}>
          <Canvas shadows>
            <PointerLockControls />
            <App />
          </Canvas>
        </KeyboardControls>
      )}

      {/* fullscreen */}
      <div className={`fullscreen bg ${ready ? "ready" : ""}`}>
        <button onClick={() => setReady(true)}>Play in VR</button>
        <button onClick={() => setReady(true)}>Play in Non-VR</button>
      </div>

      {/* stats */}
      <Stats />
    </>
  )
}

root.render(<Intro />)
