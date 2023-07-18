import React from "react"
import { useEffect, useRef, useState } from "react"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { button, useControls } from "leva"
import { PositionalAudio, useGLTF, useHelper } from "@react-three/drei"
import { useClicksStore, useScoreStore } from "../store/store"
import * as THREE from "three"
import { calculateScore } from "../utils"
import Audio from "./Audio"

// BoomBox model bind to positional audio
const BoomBox = () => {
  const positionalAudio = useRef()
  const audio = useRef()
  const [play, setPlay] = useState(true)

  const increaseClicks = useClicksStore((state) => state.increaseClicks)
  const clicks = useClicksStore((state) => state.clicks)
  const increaseScore = useScoreStore(state => state.increaseScore)
  
  const clockRef = useRef(new THREE.Clock())
  
  const boomBox = useGLTF("./model/BoomBox.glb")
  
  useHelper(positionalAudio, PositionalAudioHelper)

  // control panel
  const [{ audioType, random, interval, position }, set] = useControls("Audio", () => ({
    audioType: { 
      label: "Audio Type", 
      value: "stereo", 
      options: ["positionalAudio", "stereo", "mono"],
    },
    random: false,
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
      if(audioType === "positionalAudio") {
        positionalAudio.current?.play()
      } else {
        audio.current?.play()
      }
      setPlay(true)
    }),
    pause: button(() => {
      // 这里如果用useState会保存过失的闭包。
      if(audioType === "positionalAudio") {
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
        {
          audioType !== "positionalAudio" && 
          <Audio 
            ref={audio}
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
