import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import App from "./App.jsx"
import "./index.css"

const root = createRoot(document.getElementById("root"))

root.render(
  <>
    <Canvas>
      <App />
    </Canvas>
  </>
)
