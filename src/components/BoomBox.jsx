import React from "react"
import { useEffect, useRef, useState } from "react"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { PositionalAudio, useGLTF, useHelper } from "@react-three/drei"
import { useClickStore, useScoreStore, useAudioStore } from "../store/store"
import * as THREE from "three"
import { calculateScore } from "../utils"
import Audio from "./Audio"
import { AudioType, INTERVAL } from "../constants"

// BoomBox model bind to positional audio
const BoomBox = () => {
  const clockRef = useRef(new THREE.Clock())
  const positionalAudio = useRef()
  const audio = useRef()
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const { click, increaseClick} = useClickStore((state) => ({ increaseClick: state.increaseClick, click: state.click}))
  const increaseScore = useScoreStore((state) => state.increaseScore)
  const audioType = useAudioStore((state) => state.audioType)
  const boomBox = useGLTF("./model/BoomBox.glb")
  useHelper(positionalAudio, PositionalAudioHelper)

  useEffect(() => {
    let timer
    timer = setInterval(() => {
      resetClock()
      // randomlySetPosition()
    }, INTERVAL)

    return () => {
      clearInterval(timer)
    }
  }, [click])

  const randomlySetPosition = () => {
    setPosition({
      x: 10 * (Math.random() - 0.5),
      y: 10 * Math.random(),
      z: 10 * (Math.random() - 0.5),
    })
  }

  const resetClock = () => {
    clockRef.current = new THREE.Clock()
    clockRef.current.start()
  }

  const handleClick = () => {
    increaseClick()
    randomlySetPosition()
    increaseScore(calculateScore(clockRef.current.getElapsedTime()))
    resetClock()
  }

  return (
    <>
      <group position={[position.x, position.y, position.z]}>
        {audioType === AudioType.POSITIONAL && (
          <PositionalAudio
            ref={positionalAudio}
            url="./audio/badcat.mp3"
            distance={1}
            autoplay
            loop
          />
        )}
        {audioType === AudioType.STEREO && <Audio ref={audio} url="./audio/badcat.mp3" />}
        <primitive object={boomBox.scene} rotation-y={Math.PI} scale={20} onClick={handleClick} />
      </group>
    </>
  )
}

export default BoomBox
