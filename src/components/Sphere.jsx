import React from "react"
import { useControls } from "leva"

const Sphere = ({ wireframe }) => {
  const { position } = useControls("Sphere", ({
    position: { x: 3, y: 0, z: 0 }
  }))

  return (
    <>
      <mesh castShadow receiveShadow position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" wireframe={wireframe}  />
      </mesh>
    </>
  )
}

export default Sphere
