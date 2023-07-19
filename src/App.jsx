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
import { AudioType, ROUND_INTERVAL } from "./consts"
import { useAudioStore, useTimeStore } from "./store/store"

const App = () => {
  const directionalLight = useRef()
  useHelper(directionalLight, DirectionalLightHelper)
  const setAudioType = useAudioStore(state => state.setAudioType)
  const decreaseTime = useTimeStore(state => state.decreaseTime)

  const sunPosition = { x: 5, y: 5, z: 5 }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAudioType(AudioType.STEREO)
    }, ROUND_INTERVAL)

    const interval = setInterval(() => {
      decreaseTime();
    }, 1000);

    return () => {
      clearTimeout(timer) 
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
