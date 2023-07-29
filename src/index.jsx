import { useState, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { KeyboardControls, Sky } from "@react-three/drei"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode"
import { Leva } from "leva"
import { useGameStateStore, useUserInfoStore } from "./store/store.js"
import { GameState } from "./constants/index.js"
import { isDebugMode } from "./utils/index.js"
import Stats from "./components/Stats.jsx"
import Explanation from "./components/Explanation.jsx"
import App from "./App.jsx"
import "./style/style.css"
import { Controllers, Hands, VRButton, XR } from "@react-three/xr"

const root = createRoot(document.getElementById("root"))

const map = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
  { name: "menu", keys: ["M", "m"] },
]

// google login client id
const clientId = "906152247999-urgeo4b4ht8f5d9aoaogutbjjle5ca5n.apps.googleusercontent.com"

const Intro = () => {
  const [ready, setReady] = useState(false)
  const [logged, setLogged] = useState(false)
  const [mode, setMode] = useState("")
  const setGameState = useGameStateStore((state) => state.setGameState)
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)

  const responseMessage = (response) => {
    console.log("success", response)
    if (response.credential) {
      const decoded = jwtDecode(response.credential)
      setUserInfo({ username: decoded.name, email: decoded.email })
    }
    setLogged(true)
  }
  const errorMessage = (error) => {
    console.log("error", error)
  }

  const handleClick = (type) => {
    if (type === "3d") {
      setReady(true)
      setMode("3d")
      setGameState(GameState.READY)
    } else if (type === "vr") {
      setReady(true)
      setMode("vr")
      setGameState(GameState.READY)
    }
  }

  return (
    <>
      {/* login */}
      <GoogleOAuthProvider clientId={clientId}>
        <div className={`fullscreen bg login ${logged ? "logged" : ""}`}>
          <GoogleLogin theme="outline" onSuccess={responseMessage} onError={errorMessage} />
          <a href="void:0" className="skip" onClick={() => setLogged(true)}>
            skip
          </a>
        </div>
      </GoogleOAuthProvider>

      {/* fullscreen */}
      <div className={`fullscreen bg ${ready ? "ready" : ""}`}>
        <button onClick={() => handleClick("3d")}>Play in 3D</button>
        <button onClick={() => handleClick("vr")}>Play in VR</button>
      </div>

      {/* 3D scene */}
      {ready && mode === "3d" && (
        <Suspense fallback={<Explanation />}>
          <KeyboardControls map={map}>
            <Canvas shadows>
              <App />
            </Canvas>
          </KeyboardControls>
        </Suspense>
      )}

      {ready && mode === "vr" && (
        <Suspense fallback={<Explanation />}>
          <VRButton />
          <Canvas shadows>
            <XR>
              <Controllers />
              <Sky sunPosition={[0, 1, 0]} />
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <mesh>
                <boxGeometry />
                <meshBasicMaterial color="blue" />
              </mesh>
            </XR>
          </Canvas>
        </Suspense>
      )}

      {/* crosshair */}
      <div className="dot"></div>

      {/* game stats */}
      <Stats />

      {/* debug config */}
      <Leva hidden={!isDebugMode()} />
    </>
  )
}

root.render(<Intro />)
