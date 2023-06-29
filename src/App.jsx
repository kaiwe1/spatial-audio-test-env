import React, { useRef } from "react"
import { OrbitControls, Sky, PositionalAudio, useHelper } from "@react-three/drei"
import * as THREE from "three"
import { PositionalAudioHelper } from 'three/addons/helpers/PositionalAudioHelper.js';

const App = ({started}) => {
  const positionalAudio = useRef()
  useHelper(positionalAudio, PositionalAudioHelper)

  return (
    <>
      <OrbitControls makeDefault />

      {started && (
        <PositionalAudio ref={positionalAudio} url="./audio/piano2.wav" distance={1} autoplay loop/>
      )}

      <Sky />

      <ambientLight intensity={0.3} />
      <directionalLight castShadow intensity={0.7} position={[10, 10, 10]} />

      <mesh castShadow receiveShadow position-x={-2}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
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
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

export default App
