import React from "react"
import { useEffect, useRef, useState } from "react"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { button, useControls } from "leva"
import { PositionalAudio, useGLTF, useHelper } from "@react-three/drei"
import { useClickStore, useScoreStore } from "../store/store"
import * as THREE from "three"
import { calculateScore } from "../utils"
import Audio from "./Audio"
import { AudioType } from "../consts"

// BoomBox model bind to positional audio
const BoomBox = () => {
  const positionalAudio = useRef()
  const audio = useRef()
  const [play, setPlay] = useState(true)

  const increaseClick = useClickStore((state) => state.increaseClick)
  const click = useClickStore((state) => state.click)
  const increaseScore = useScoreStore((state) => state.increaseScore)

  const clockRef = useRef(new THREE.Clock())

  const boomBox = useGLTF("./model/BoomBox.glb")

  useHelper(positionalAudio, PositionalAudioHelper)

  // control panel
  const [{ audioType, random, interval, position }, set] = useControls("Audio", () => ({
    audioType: {
      label: "Audio Type",
      value: AudioType.STEREO,
      options: {
        "Positional Audio": AudioType.POSITIONAL,
        "Stereo Audio": AudioType.STEREO,
        "Mono Audio": AudioType.MONO,
      },
    },
    random: { label: "Random Position", value: false },
    interval: { label: "Time Interval", value: 3000, min: 1000, max: 10000 },
    position: { label: "Audio Position", value: { x: 0, y: 0, z: 0 }, step: 0.1 },
    volume: {
      label: "Audio Volume",
      value: 0.5,
      min: 0,
      max: 1,
      onChange: (v) => positionalAudio.current?.setVolume(v),
    },
    play: button(() => {
      if (audioType === AudioType.POSITIONAL) {
        positionalAudio.current?.play()
      } else {
        audio.current?.play()
      }
      setPlay(true)
    }),
    pause: button(() => {
      if (audioType === AudioType.POSITIONAL) {
        positionalAudio.current?.pause()
      } else {
        audio.current?.pause()
      }
      setPlay(false)
    }),
  }))

  // randomly set audio position and start clock
  useEffect(() => {
    let timer
    if (random && play) {
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
  }, [random, interval, click])

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
    increaseClick()
    randomlySetPosition()
    increaseScore(calculateScore(clockRef.current.getElapsedTime()))
    clockRef.current = new THREE.Clock()
    clockRef.current.start()
  }

  return (
    <>
      <group position={[position.x, position.y, position.z]}>
        {audioType === AudioType.POSITIONAL && (
          <PositionalAudio
            ref={positionalAudio}
            url="./audio/piano2.wav"
            distance={1}
            autoplay
            loop
          />
        )}
        {audioType === AudioType.STEREO && <Audio ref={audio} url="./audio/piano2.wav" />}
        <primitive object={boomBox.scene} rotation-y={Math.PI} scale={20} onClick={handleClick} />
      </group>
    </>
  )
}

export default BoomBox
