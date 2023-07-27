import React from "react"
import { RigidBody } from "@react-three/rapier"

const Ground = ({ wireframe }) => {
  return (
    <>
      <RigidBody type="fixed">
        <mesh receiveShadow position-y={-1} >
          <boxGeometry args={[10, 1, 10]}/>
          <meshStandardMaterial color="grey" wireframe={wireframe}  />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Ground
