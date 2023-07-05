import React from "react"
import { useEffect, useRef } from "react"
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js"
import { button, useControls } from "leva"
import { PositionalAudio, useGLTF, useHelper } from "@react-three/drei"
import { useClicksStore } from "../store/store"

const BoomBox = ({ ready }) => {
  const positionalAudio = useRef()
  useHelper(positionalAudio, PositionalAudioHelper)

  const increaseClicks = useClicksStore((state) => state.increaseClicks)
  const clicks = useClicksStore((state) => state.clicks)

  const [{ random, interval, position }, set] = useControls("audio", () => ({
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
  }))

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
    if (random && ready) {
      timer = setInterval(randomlySetPosition, interval)
    }

    return () => {
      clearInterval(timer)
    }
  }, [random, interval, ready, clicks])

  // load model
  const boomBox = useGLTF("./model/BoomBox.glb")

  return (
    <>
      {ready && (
        <group position={[position.x, position.y, position.z]}>
          <PositionalAudio
            ref={positionalAudio}
            url="./audio/badcat.mp3"
            distance={1} // https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance
            autoplay
            loop
          />
          <primitive
            object={boomBox.scene}
            scale={20}
            rotation-y={Math.PI}
            onClick={() => {
              increaseClicks()
              randomlySetPosition()
            }}
          />
        </group>
      )}
    </>
  )
}

export default BoomBox
