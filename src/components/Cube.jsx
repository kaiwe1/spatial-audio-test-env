import React from "react"

const Cube = () => {
  return (
    <>
      <mesh castShadow receiveShadow position-x={-2}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  )
}

export default Cube
