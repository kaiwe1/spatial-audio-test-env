import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import App from "./App.jsx"
import { KeyboardControls } from "@react-three/drei"
import Stats from "./components/Stats.jsx"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import jwtDecode from 'jwt-decode'
import "./style.css"

const root = createRoot(document.getElementById("root"))

const map = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "menu", keys: ["M", "m"] },
]

const clientId = "191262778626-r0dfcsosplunu635g1mk8gddsr89evj3.apps.googleusercontent.com"

const Intro = () => {
  const [ready, setReady] = useState(false)
  const [logged, setLogged] = useState(false)
  const [name, setName] = useState("")

  const responseMessage = (response) => {
    console.log("success", response)
    if (response.credential) {
      const decoded = jwtDecode(response.credential);
      setName(decoded.name)
    }
    setLogged(true)
  }
  const errorMessage = (error) => {
    console.log("error", error)
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* 3D scene */}
      {ready && (
        <KeyboardControls map={map}>
          <Canvas shadows>
            <App />
          </Canvas>
        </KeyboardControls>
      )}

      {/* login */}
      {/* <div className={`fullscreen bg login ${logged ? "logged" : ""}`}>
        <GoogleLogin theme="outline" onSuccess={responseMessage} onError={errorMessage} />
      </div> */}

      {/* fullscreen */}
      <div className={`fullscreen bg ${ready ? "ready" : ""}`}>
        <button onClick={() => setReady(true)}>Play in VR</button>
        <button onClick={() => setReady(true)}>Play in Non-VR</button>
      </div>

      <div className="dot"></div>

      {/* click and score stats */}
      <Stats />
    </GoogleOAuthProvider>
  )
}

root.render(<Intro />)
