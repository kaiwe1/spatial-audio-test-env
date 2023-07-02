import React, { useRef } from "react"
import {
  OrbitControls,
  Sky,
  PositionalAudio,
  useHelper,
  useGLTF,
  Html,
} from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { button, useControls } from "leva"
import { useEffect } from "react"
import Menu from "./components/Menu"

const App = ({ ready }) => {
  // positional audio
  const positionalAudio = useRef()
  const directionalLight = useRef()
  useHelper(positionalAudio, PositionalAudioHelper)
  useHelper(directionalLight, DirectionalLightHelper)

  // control panel
  const [{ random, interval, position, volume }, set] = useControls(
    "audio",
    () => ({
      random: true,
      interval: { value: 3000, min: 1000, max: 10000 },
      position: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
      volume: {
        value: 0.5,
        min: 0,
        max: 1,
        onChange: (v) => positionalAudio.current?.setVolume(v),
      },
      play: button(() => {
        positionalAudio.current?.play()
        set({ random: true })
      }),
      pause: button(() => {
        positionalAudio.current?.pause()
        set({ random: false })
      }),
    })
  )

  const { sunPosition } = useControls("environment", {
    sunPosition: { value: { x: 5, y: 5, z: 5 }, step: 0.1 },
  })

  // load model
  const boomBox = useGLTF("./model/BoomBox.glb")

  const randomlySetPosition = () => {
    set({
      position: {
        x: 10 * (Math.random() - 0.5),
        y: 10 * Math.random(),
        z: 10 * (Math.random() - 0.5),
      },
    })
  }

  // randomly set audio position
  useEffect(() => {
    let timer
    if (random) {
      timer = setInterval(randomlySetPosition, interval)
    }

    return () => {
      clearInterval(timer)
    }
  }, [random, interval])

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

      {ready && (
        <group position={[position.x, position.y, position.z]}>
          <PositionalAudio
            ref={positionalAudio}
            url="./audio/badcat.mp3"
            distance={1}
            volume={volume}
            autoplay
            loop
          />
          <primitive
            object={boomBox.scene}
            scale={20}
            rotation-y={Math.PI}
            onClick={() => console.log("click")}
          />
        </group>
      )}

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
