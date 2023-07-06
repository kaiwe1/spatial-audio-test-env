import { useGLTF } from '@react-three/drei'
import React from 'react'

const Gun = React.forwardRef(({}, ref) => {
  const gun = useGLTF("./model/valorant_vandal_with_hands_and_animations.glb")

  return (
    <primitive ref={ref} object={gun.scene} />
  )
})

export default Gun