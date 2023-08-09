import React from "react"
import * as THREE from "three"
import { useEffect, useRef } from "react"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { PositionalAudio, useGLTF, useHelper } from "@react-three/drei"
import { useControls } from "leva"
import { useClickStore, useScoreStore, useAudioStore } from "../store/store"
import { calculateScore } from "../utils"
import { AudioType, INTERVAL, ROUND_INTERVAL } from "../constants"
import Audio from "./Audio"
import MonoAudio from "./MonoAudio"

// BoomBox model bind to positional audio
const BoomBox = () => {
  const boomBox = useGLTF("./model/BoomBox.glb")
  const clockRef = useRef(new THREE.Clock())
  const positionalAudio = useRef()
  const audio = useRef()
  const monoAudio = useRef()
  const click = useClickStore((state) => state.click)
  const increaseClick = useClickStore((state) => state.increaseClick)
  const increaseScore = useScoreStore((state) => state.increaseScore)
  const setAudioType = useAudioStore((state) => state.setAudioType)
  const audioType = useAudioStore(state => state.audioType)

  useHelper(positionalAudio, PositionalAudioHelper)

  // debug
  const [{ position, random }, set] = useControls("BoomBox", () => ({ 
    position: { x: 0, y: 0, z: 0 },
    volume: { value: 0.5, min: 0, max: 1, onChange: (v) => {
      if(audioType === AudioType.POSITIONAL) positionalAudio.current?.setVolume(v)
      else if(audioType === AudioType.STEREO) audio.current?.setVolume(v)
      else if(audioType === AudioType.MONO) monoAudio.current?.setVolume(v)
    }},
    random: true,
    audioType: { 
      value: AudioType.POSITIONAL,
      options: {
        positional: AudioType.POSITIONAL,
        stereo: AudioType.STEREO,
        mono: AudioType.MONO,
      },
      onChange: (v) => {
        setAudioType(v)
      }
    }
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      resetClock()
      if (random) randomlySetPosition()
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [click, random])

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAudioType(AudioType.STEREO)
      set({ audioType: AudioType.STEREO })
    }, ROUND_INTERVAL)

    const timer2 = setTimeout(() => {
      setAudioType(AudioType.MONO)
      set({ audioType: AudioType.MONO })
    }, ROUND_INTERVAL)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
    }
  }, [])

  const randomlySetPosition = () => {
    set({
      position: {
        x: 10 * (Math.random() - 0.5),
        y: 10 * Math.random(),
        z: 10 * (Math.random() - 0.5),
      },
    })
  }

  const resetClock = () => {
    clockRef.current = new THREE.Clock()
    clockRef.current.start()
  }

  const handleClick = () => {
    increaseClick()
    if (random) randomlySetPosition()
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
        {audioType === AudioType.MONO && <MonoAudio ref={monoAudio} url="./audio/badcat.mp3" />}
        <primitive object={boomBox.scene} rotation-y={Math.PI} scale={20} onClick={handleClick} />
      </group>
    </>
  )
}

export default BoomBox
