import React from "react"

const Sphere = () => {
  return (
    <>
      <mesh castShadow receiveShadow position-x={2}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  )
}

export default Sphere
