import React from "react"
import { useEffect, useRef } from "react"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { button, useControls } from "leva"
import { PositionalAudio, useGLTF, useHelper } from "@react-three/drei"
import { useClicksStore, useScoreStore } from "../store/store"
import * as THREE from "three"
import { calculateScore } from "../utils"
import { useThree } from "@react-three/fiber"

// BoomBox model bind to positional audio
const BoomBox = () => {
  const positionalAudio = useRef()
  useHelper(positionalAudio, PositionalAudioHelper)
  const increaseClicks = useClicksStore((state) => state.increaseClicks)
  const clicks = useClicksStore((state) => state.clicks)
  const increaseScore = useScoreStore(state => state.increaseScore)
  const clockRef = useRef(new THREE.Clock())
  const boomBox = useGLTF("./model/BoomBox.glb")
  const { camera } = useThree()
  console.log(camera)
  // control panel
  const [{ audioType, random, interval, position }, set] = useControls("audio", () => ({
    audioType: { value: "positionalAudio", options: ["positionalAudio", "stereo", "mono"]},
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
      console.log(positionalAudio.current)
      set({ random: true })
    }),
    pause: button(() => {
      positionalAudio.current?.pause()
      set({ random: false })
    }),
  }))

  // randomly set audio position and start clock
  useEffect(() => {
    let timer
    if (random) {
      timer = setInterval(() => {
        if (clockRef.current.getElapsedTime() > 3) {
          clockRef.current = new THREE.Clock()
        }
        if (!clockRef.current.running) {
          clockRef.current.start()
        }

        randomlySetPosition()
      }, interval)
    }

    return () => {
      clearInterval(timer)
    }
  }, [random, interval, clicks])

  const randomlySetPosition = () => {
    set({
      position: {
        x: 10 * (Math.random() - 0.5),
        y: 10 * Math.random(),
        z: 10 * (Math.random() - 0.5),
      },
    })
  }

  const handleClick = () => {
    increaseClicks()
    randomlySetPosition()
    increaseScore(calculateScore(clockRef.current.getElapsedTime()))
    clockRef.current = new THREE.Clock() 
    clockRef.current.start()
  }

  return (
    <>
      <group position={[position.x, position.y, position.z]}>
        {
          audioType === 'positionalAudio' && 
          <PositionalAudio
            ref={positionalAudio}
            url="./audio/badcat.mp3"
            distance={1}
            autoplay
            loop
          />
        }
        <primitive
          object={boomBox.scene}
          rotation-y={Math.PI}
          scale={20}
          onClick={handleClick}
        />
      </group>
    </>
  )
}

export default BoomBox
