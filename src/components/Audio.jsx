import React, { useEffect, useState } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from "three"

const Audio = React.forwardRef((props, audioRef) => {
    const audioBuffer = useLoader(THREE.AudioLoader, "./audio/LRMonoPhase4.wav")
    const [ listener ] = useState(() => new THREE.AudioListener())
    const { camera } = useThree()
    console.log(camera)

    useEffect(() => {
        audioRef.current.setBuffer(audioBuffer)
        audioRef.current.setLoop(true)
        audioRef.current.setVolume( 0.5 );
        audioRef.current.play();
        camera.add(listener)
        return () => camera.remove(listener)
    }, [])

  return (
    <audio ref={audioRef} args={[listener]} />
  )
})

export default Audio