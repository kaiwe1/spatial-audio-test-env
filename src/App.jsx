import React, { useRef, useEffect } from "react"
import { PointerLockControls, Sky, useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { Physics } from "@react-three/rapier"
import { GameState, TOTAL_TIME } from "./constants"
import { useTimeStore, useGameStateStore, useScoreStore, useClickStore, useUserInfoStore } from "./store/store"
import { getUserStats, sendUserStats } from "./api"
import { useControls } from "leva"
import { Perf } from "r3f-perf"
import { isDebugMode } from "./utils"
import Menu from "./components/Menu"
import BoomBox from "./components/BoomBox"
import Light from "./components/Light"
import Ground from "./components/Ground"
import Player from "./components/Player"
import Cube from "./components/Cube"
import Sphere from "./components/Sphere"

const App = ({ mode }) => {
  const directionalLight = useRef()
  useHelper(directionalLight, DirectionalLightHelper)
  const decreaseTime = useTimeStore(state => state.decreaseTime)
  const setGameState = useGameStateStore(state => state.setGameState)
  const score = useScoreStore(state => state.score)
  const click = useClickStore(state => state.click)
  const { username, email } = useUserInfoStore(state => ({ username: state.username, email: state.email }))

  // get user stats from firebase
  useEffect(() => {
    getUserStats()
  }, [])

  useEffect(() => {
    setGameState(GameState.RUNNING)

    const timer = setTimeout(() => {
      setGameState(GameState.END)
      sendUserStats({ username, email, score, click, averageResponseTime: 1.5, minResponseTime: 1 })
    }, TOTAL_TIME)

    const interval = setInterval(() => {
      decreaseTime();
    }, 1000);

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const { sunPosition, wireframe } = useControls("App", {
    sunPosition: { x: 5, y: 5, z: 5 },
    wireframe: false
  })

  return (
    <>
      <PointerLockControls />

      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />
      <Light position={sunPosition} ref={directionalLight} />

      <BoomBox />

      <Physics gravity={[0, -3, 0]}>
        <Cube wireframe={wireframe} />
        <Sphere wireframe={wireframe} />
        <Ground wireframe={wireframe} />
        { mode === '3d' && <Player /> }
      </Physics>

      { mode === '3d' && <Menu /> }

      { isDebugMode() && <Perf position="bottom-left" /> }
    </>
  )
}

export default App
