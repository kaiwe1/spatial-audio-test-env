import React, { useRef } from "react"
import { OrbitControls, Sky, useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"
import Menu from "./components/Menu"
import BoomBox from "./components/BoomBox"
import Light from "./components/Light"
import Ground from "./components/Ground"

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
      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />
      <Light position={sunPosition} ref={directionalLight} />
      <BoomBox />

      <mesh castShadow receiveShadow position-x={-2}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh castShadow receiveShadow position-x={2}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <Ground />

      <Menu />
    </>
  )
}

export default App
