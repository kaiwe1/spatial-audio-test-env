import React from "react"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

const Ground = () => {
  return (
    <>
    <RigidBody colliders={false} type="fixed">
      <mesh receiveShadow rotation-x={Math.PI * -0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="grey" />
      </mesh>
      <CuboidCollider args={[10, -1, 10]} position={[0, -1, 0]} />
    </RigidBody>
    </>
  )
}

export default Ground
