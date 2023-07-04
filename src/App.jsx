import React, { useRef } from "react"
import {
  OrbitControls,
  Sky,
  useHelper,
} from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"
import Menu from "./components/Menu"
import BoomBox from "./components/BoomBox"

const App = ({ ready }) => {

  // positional audio
  const directionalLight = useRef()

  useHelper(directionalLight, DirectionalLightHelper)

  // control panel
  const { sunPosition } = useControls("environment", {
    sunPosition: { value: { x: 5, y: 5, z: 5 }, step: 0.1 },
  })


  return (
    <>
      <OrbitControls makeDefault />

      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        ref={directionalLight}
        castShadow
        intensity={0.7}
        position={[sunPosition.x, sunPosition.y, sunPosition.z]}
      />

      <BoomBox ready={ready} />

      <mesh castShadow receiveShadow position-x={-2}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh castShadow receiveShadow position-x={2}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        rotation-x={Math.PI * -0.5}
        position-y={-1}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="grey" />
      </mesh>

      <Menu />
    </>
  )
}

export default App
