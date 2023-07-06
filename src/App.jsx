import React, { useRef } from "react"
import { OrbitControls, PointerLockControls, Sky, useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"
import Menu from "./components/Menu"
import BoomBox from "./components/BoomBox"
import Light from "./components/Light"
import Ground from "./components/Ground"
import { Physics } from "@react-three/rapier"
import Player from "./components/Player"
import Cube from "./components/Cube"
import Sphere from "./components/Sphere"

const App = () => {
  const directionalLight = useRef()

  useHelper(directionalLight, DirectionalLightHelper)

  // control panel
  const { sunPosition } = useControls("environment", {
    sunPosition: { value: { x: 5, y: 5, z: 5 }, step: 0.1 },
  })

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
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
