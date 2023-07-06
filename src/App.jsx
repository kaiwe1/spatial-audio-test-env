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

      <Physics gravity={[0, -30, 0]}>
        <mesh castShadow receiveShadow position-x={-2}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>

        <mesh castShadow receiveShadow position-x={2}>
          <sphereGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <Player />

        <Ground />
      </Physics>

      <Menu />
    </>
  )
}

export default App
