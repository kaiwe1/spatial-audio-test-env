import React from "react"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

const Ground = () => {
  return (
    <>
    <RigidBody type="fixed">
      <mesh receiveShadow position-y={-1} >
        <boxGeometry args={[10, 1, 10]}/>
        <meshStandardMaterial color="grey" />
      </mesh>
    </RigidBody>
    </>
  )
}

export default Ground
