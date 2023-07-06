import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import React, { useRef } from 'react'
import * as THREE from "three"
import Gun from './Gun'

const SPEED = 1.5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const Player = () => {
  const ref = useRef()
  const [, get] = useKeyboardControls()

  const gunRef = useRef()

  useFrame((state) => {
    const { forward, backward, left, right } = get()

    if (ref.current) {
      const velocity = ref.current.linvel()
      
      // update camera
      const { x, y, z } = ref.current.translation()
      state.camera.position.set(x, y, z)
  
      // movement
      frontVector.set(0, 0, backward - forward)
      sideVector.set(left - right, 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

      // update gun
      gunRef.current?.rotation.copy(state.camera.rotation)
      gunRef.current?.position.copy(state.camera.position)
    }
  })

  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type='dynamic' position={[0, 2, 2]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.25, 0.5]} />
      </RigidBody>
      <Gun ref={gunRef} />
    </>
  )
}

export default Player