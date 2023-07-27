import { useFrame } from "@react-three/fiber"
import React, { useRef } from "react"

const Cube = ({ wireframe }) => {
  const cubeRef = useRef()
  
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 1
  })

  return (
    <>
      <mesh ref={cubeRef} castShadow receiveShadow position={[ -3, 0.1, 0 ]}>
        <boxGeometry />
        <meshStandardMaterial color="red" wireframe={wireframe} />
      </mesh>
    </>
  )
}

export default Cube
