import React from "react"

const Ground = () => {
  return (
    <>
      <mesh receiveShadow rotation-x={Math.PI * -0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="grey" />
      </mesh>
    </>
  )
}

export default Ground
