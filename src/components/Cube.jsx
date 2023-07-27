import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"

const Cube = ({ wireframe }) => {
  const cubeRef = useRef()
  
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 1
  })

  const { position, width, height, depth } = useControls("Cube", ({
    position: { x: -3, y: 0.1, z: 0 },
    width: { value: 1, min: 0, max: 10 },
    height: { value: 1, min: 0, max: 10 },
    depth: { value: 1, min: 0, max:10 }
  }))

  return (
    <>
      <mesh ref={cubeRef} castShadow receiveShadow position={[position.x, position.y, position.z]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="red" wireframe={wireframe} />
      </mesh>
    </>
  )
}

export default Cube
