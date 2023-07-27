import React from "react"

const Sphere = ({ wireframe }) => {
  return (
    <>
      <mesh castShadow receiveShadow position={[ 3, 0, 0 ]}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" wireframe={wireframe}  />
      </mesh>
    </>
  )
}

export default Sphere
