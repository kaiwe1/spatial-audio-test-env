import React from "react"

const Sphere = () => {
  return (
    <>
      <mesh castShadow receiveShadow position={[ 3, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  )
}

export default Sphere
