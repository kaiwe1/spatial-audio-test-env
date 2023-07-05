import React from "react"

const Light = React.forwardRef(({ position }, ref) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={ref}
        castShadow
        intensity={0.7}
        position={[position.x, position.y, position.z]}
      />
    </>
  )
})

export default Light
