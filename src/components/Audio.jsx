import React, { useRef, useEffect, useState } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from "three"

const Audio = React.forwardRef(({ url }, ref) => {
    const audioBuffer = useLoader(THREE.AudioLoader, url)
    const [ listener ] = useState(() => new THREE.AudioListener()) // only call in the initial rendering
    const { camera } = useThree()


    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        const audioElement = resolvedRef.current

        if(audioBuffer) {
          audioElement.setBuffer(audioBuffer)
          audioElement.setLoop(true)
          audioElement.setVolume( 0.5 );
          audioElement.play();
          camera.add(listener)
        }
        return () => {
          audioElement.stop()
          camera.remove(listener) 
        }
    }, [audioBuffer])

  return (
    <audio ref={resolvedRef} args={[listener]} /> // const sound = new THREE.Audio(Listener), ref.current = sound.
  )
})

export default Audio