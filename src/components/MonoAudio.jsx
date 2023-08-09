import React, { useState, useRef } from "react"
import { useLoader, useThree } from "@react-three/fiber"
import * as THREE from "three"

const MonoAudio = React.forwardRef(({ url }, ref) => {
  const audioBuffer = useLoader(THREE.AudioLoader, url)

  const [listener] = useState(() => new THREE.AudioListener()) // only call in the initial rendering
  const { camera } = useThree()

  useEffect(() => {
    if (audioBuffer) {
        const audioContext = new AudioContext()
        const audioSource = ref.current
        audioSource.setBuffer(audioBuffer)
        audioSource.setLoop(true)
        audioSource.setVolume(0.5)
        
        const channelMerger = audioContext.createChannelMerger(2);
        const destination = audioContext.destination;
        audioSource.connect(channelMerger);
        channelMerger.connect(destination);

        ref.current.play()
        camera.add(listener)
    }
    return () => camera.remove(listener)
  }, [audioBuffer])

  return (
    <audio ref={ref} args={[listener]} /> // const sound = new THREE.Audio(Listener), ref.current = sound.
  )
})

export default MonoAudio
