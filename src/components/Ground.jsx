import React from "react"
import { RigidBody } from "@react-three/rapier"
import { useControls } from "leva"

const Ground = ({ wireframe }) => {
  const { position } = useControls("Ground", ({
    position: { x: 0, y: -1, z: 0 }
  }))

  return (
    <>
      <RigidBody type="fixed" >
        <mesh receiveShadow position={[position.x, position.y, position.z]}  >
          <boxGeometry args={[10, 1, 10]}/>
          <meshStandardMaterial color="grey" wireframe={wireframe}  />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Ground
