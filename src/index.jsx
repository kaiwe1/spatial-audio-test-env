import { useState, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { KeyboardControls } from "@react-three/drei"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode"
import { Leva } from "leva"
import { useGameStateStore, useUserInfoStore, useModeStore } from "./store/store.js"
import { GameState } from "./constants/index.js"
import { addHashtagToURL, isDebugMode } from "./utils/index.js"
import { Controllers, VRButton, XR } from "@react-three/xr"
import Stats from "./components/Stats.jsx"
import Explanation from "./components/Explanation.jsx"
import App from "./App.jsx"
import "./style/style.css"
import GameEnd from "./components/GameEnd.jsx"

const root = createRoot(document.getElementById("root"))

// keyboard control map
const map = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
  { name: "menu", keys: ["M", "m"] },
]

const Intro = () => {
  const [logged, setLogged] = useState(false)
  const [mode, setMode] = useState("")
  const setGameState = useGameStateStore((state) => state.setGameState)
  const gameState = useGameStateStore((state) => state.gameState)
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)
  const setViewMode = useModeStore((state) => state.setMode)

  const [isDebug, setDebug] = useState(isDebugMode())

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
      setMode("3d")
      setViewMode('3d')
    } else if (type === "vr") {
      setMode("vr")
      setViewMode('vr')
    } else if (type === 'debug') {
      setMode("3d")
      setViewMode('3d')
      setDebug(true)
      addHashtagToURL('debug')
    }
    setGameState(GameState.READY)
  }

  return (
    <>
      {/* login */}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className={`fullscreen bg login ${logged ? "logged" : ""}`}>
          <GoogleLogin theme="outline" onSuccess={responseMessage} onError={errorMessage} />
          <a href="void:0" className="skip" onClick={() => setLogged(true)}>
            skip
          </a>
        </div>
      </GoogleOAuthProvider>

      {/* fullscreen */}
      <div className={`fullscreen bg ${gameState === GameState.READY || gameState === GameState.END ? "ready" : ""}`}>
        <button onClick={() => handleClick("3d")}>Play in 3D</button>
        <button onClick={() => handleClick("vr")}>Play in VR</button>
        <button onClick={() => handleClick("debug")}>Debug Mode</button>
      </div>

      {/* 3D scene */}
      {gameState === GameState.READY && mode === "3d" && (
        <Suspense fallback={<Explanation />}>
          <KeyboardControls map={map}>
            <Canvas shadows>
              <App mode={mode} />
            </Canvas>
          </KeyboardControls>
        </Suspense>
      )}

      {/* VR */}
      {mode === "vr" && (
        <Suspense fallback={<Explanation />}>
          <VRButton />
          <Canvas shadows>
            <XR>
              <Controllers />
              <App mode={mode} />
            </XR>
          </Canvas>
        </Suspense>
      )}

      {/* crosshair */}
      <div className="dot"></div>

      {/* game stats */}
      <Stats />

      {/* game end */}
      <GameEnd />

      {/* debug */}
      <Leva hidden={!isDebug} />
    </>
  )
}

root.render(<Intro />)
