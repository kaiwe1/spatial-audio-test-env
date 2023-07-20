import React, { useRef, useEffect } from "react"
import { PointerLockControls, Sky, useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { Physics } from "@react-three/rapier"
import Menu from "./components/Menu"
import BoomBox from "./components/BoomBox"
import Light from "./components/Light"
import Ground from "./components/Ground"
import Player from "./components/Player"
import Cube from "./components/Cube"
import Sphere from "./components/Sphere"
import { AudioType, ROUND_INTERVAL, GameState, TOTAL_TIME } from "./constants"
import { useAudioStore, useTimeStore, useGameStateStore, useScoreStore, useClickStore, useUserInfoStore } from "./store/store"
import { getUserStats, sendUserStats } from "./api"

const App = () => {
  const directionalLight = useRef()
  useHelper(directionalLight, DirectionalLightHelper)
  const setAudioType = useAudioStore(state => state.setAudioType)
  const decreaseTime = useTimeStore(state => state.decreaseTime)
  const setGameState = useGameStateStore(state => state.setGameState)
  const score = useScoreStore(state => state.score)
  const click = useClickStore(state => state.click)
  const { username, email } = useUserInfoStore(state => ({ username: state.username, email: state.email }))

  const sunPosition = { x: 5, y: 5, z: 5 }
  
  useEffect(() => {
    getUserStats()
  }, [])

  useEffect(() => {
    setGameState(GameState.RUNNING)

    const timer = setTimeout(() => {
      setAudioType(AudioType.STEREO)
    }, ROUND_INTERVAL)

    const timer2 = setTimeout(() => {
      setGameState(GameState.END)
      sendUserStats({ username, email, score, click, averageResponseTime: 1.5, minResponseTime: 1 })
    }, TOTAL_TIME)

    const interval = setInterval(() => {
      decreaseTime();
    }, 1000);

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <PointerLockControls />

      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />
      <Light position={sunPosition} ref={directionalLight} />

      <BoomBox />

      <Physics gravity={[0, -3, 0]}>
        <Cube />
        <Sphere />
        <Ground />
        <Player />
      </Physics>

      <Menu />
    </>
  )
}

export default App
