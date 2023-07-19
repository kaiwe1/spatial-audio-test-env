import React, { useEffect, useState } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from "three"

const Audio = React.forwardRef(({ url }, ref) => {
    const audioBuffer = useLoader(THREE.AudioLoader, url)
    const [ listener ] = useState(() => new THREE.AudioListener())
    const { camera } = useThree()

    useEffect(() => {
        ref.current.setBuffer(audioBuffer)
        ref.current.setLoop(true)
        ref.current.setVolume( 0.5 );
        ref.current.play();
        camera.add(listener)
        return () => camera.remove(listener)
    }, [])

  return (
    <audio ref={ref} args={[listener]} />
  )
})

export default Audio