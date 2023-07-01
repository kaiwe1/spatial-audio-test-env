import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import App from "./App.jsx"
import "./style.css"

const root = createRoot(document.getElementById("root"))

const Intro = () => {
  const [ready, setReady] = useState(false)

  return (
    <>
      {/* 3D scene */}
      <Canvas shadows>
        <App ready={ready} />
      </Canvas>
      {/* dot */}
      {/* <div className="dot" /> */}
      {/* fullscreen */}
      <div className={`fullscreen bg ${ready ? "ready" : ""}`}>
        <button onClick={() => setReady(true)}>Play in VR</button>
        <button onClick={() => setReady(true)}>Play in Non-VR</button>
      </div>
    </>
  )
}

root.render(<Intro />)
