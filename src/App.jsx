import React, { useRef } from "react"
import {
  OrbitControls,
  Sky,
  PositionalAudio,
  useHelper,
  useGLTF,
} from "@react-three/drei"
import { DoubleSide, DirectionalLightHelper } from "three"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { button, useControls } from "leva"
import { useEffect } from "react"

const App = ({ ready }) => {
  // positional audio
  const positionalAudio = useRef()
  const directionalLight = useRef()
  useHelper(positionalAudio, PositionalAudioHelper)
  useHelper(directionalLight, DirectionalLightHelper)

  // control panel
  const { position, volume } = useControls("audio", {
    position: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
    volume: { value: 0.5, min: 0, max: 1 },
    play: button(() => positionalAudio.current.play()),
    pause: button(() => positionalAudio.current.pause()),
  })

  const { sunPosition } = useControls("environment", {
    sunPosition: { value: { x: 5, y: 5, z: 5 }, step: 0.1 }
  })

  // load model
  const boomBox = useGLTF("./model/BoomBox.glb")

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     set({
  //       position: {x: 5 * Math.random(), y: 5 * Math.random(), z: 5 * Math.random()}
  //     })
  //   }, 1000)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return (
    <>
      <OrbitControls makeDefault />

      {ready && (
        <PositionalAudio
          ref={positionalAudio}
          position={[position.x, position.y, position.z]}
          url="./audio/badcat.mp3"
          distance={1}
          volume={volume}
          autoplay
          loop
        />
      )}
      <primitive object={boomBox.scene} position={[position.x, position.y, position.z]} scale={20} rotation-y={Math.PI} />

      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />

      <ambientLight intensity={0.3} />
      <directionalLight ref={directionalLight} castShadow intensity={0.7} position={[sunPosition.x, sunPosition.y, sunPosition.z]} />

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
        <meshStandardMaterial color="grey" side={DoubleSide} />
      </mesh>
    </>
  )
}

export default App
