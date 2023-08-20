import React, { useRef } from 'react'
import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier'
import { useControls } from 'leva'
import Gun from './Gun'

const DEFAULT_SPEED = 1.5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const Player = () => {
  const ref = useRef()
  const [, get] = useKeyboardControls()
  const rapier = useRapier()

  const gunRef = useRef()

  const { speed } = useControls('Player', ({
    speed: { value: DEFAULT_SPEED, step: 0.1, min: 0, max: 5 }
  }))

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get()
    
    if (ref.current) {
      const velocity = ref.current.linvel()

      // update camera
      const { x, y, z } = ref.current.translation()
      state.camera.position.set(x, y, z)

      // movement
      frontVector.set(0, 0, backward - forward)
      sideVector.set(left - right, 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(state.camera.rotation)
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
      
      // update gun
      gunRef.current?.rotation.copy(state.camera.rotation)
      gunRef.current?.position.copy(state.camera.position)
      
      // jumping
      const world = rapier.world
      const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
      const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
      if (jump && grounded) ref.current.setLinvel({ x: 0, y: 1, z: 0 })
    }
  })

  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type='dynamic' position={[0, 0, 2]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.5, 0.5]} />
      </RigidBody>
      <Gun ref={gunRef} />
    </>
  )
}

export default Player