import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import jwtDecode from 'jwt-decode'
import { KeyboardControls } from "@react-three/drei"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import Stats from "./components/Stats.jsx"
import { useGameStateStore, useUserInfoStore } from "./store/store.js"
import { GameState } from "./constants/index.js"
import App from "./App.jsx"
import "./style/style.css"

const root = createRoot(document.getElementById("root"))

const map = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "menu", keys: ["M", "m"] },
]

// const clientId = "191262778626-r0dfcsosplunu635g1mk8gddsr89evj3.apps.googleusercontent.com"
const clientId = "906152247999-urgeo4b4ht8f5d9aoaogutbjjle5ca5n.apps.googleusercontent.com"

const Intro = () => {
  const [ready, setReady] = useState(false)
  const [logged, setLogged] = useState(false)
  const setGameState = useGameStateStore(state => state.setGameState)
  const setUserInfo = useUserInfoStore(state => state.setUserInfo)

  const responseMessage = (response) => {
    console.log("success", response)
    if (response.credential) {
      const decoded = jwtDecode(response.credential);
      setUserInfo({ username: decoded.name, email: decoded.email })
    }
    setLogged(true)
  }
  const errorMessage = (error) => {
    console.log("error", error)
  }

  const handleClick = () => {
    setReady(true)
    setGameState(GameState.READY)
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* login */}
      <div className={`fullscreen bg login ${logged ? "logged" : ""}`}>
        <GoogleLogin theme="outline" onSuccess={responseMessage} onError={errorMessage} />
        <a href="#" className="skip" onClick={() => setLogged(true)}>skip</a>
      </div>

      {/* fullscreen */}
      <div className={`fullscreen bg ${ready ? "ready" : ""}`}>
        <button onClick={handleClick}>Play in VR</button>
        <button onClick={handleClick}>Play in Non-VR</button>
      </div>

      {/* 3D scene */}
      {ready && (
        <KeyboardControls map={map}>
          <Canvas shadows>
            <App />
          </Canvas>
        </KeyboardControls>
      )}

      {/* crosshair */}
      <div className="dot"></div>

      {/* game stats */}
      <Stats />
    </GoogleOAuthProvider>
  )
}

root.render(<Intro />)
