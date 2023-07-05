import { Html, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import { useState } from 'react'
import { useScoreStore } from '../store/store'

const Menu = () => {
  const score = useScoreStore(state => state.score)
  const [, get] = useKeyboardControls()
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState(false)

  useFrame(() => {
    const pressed = get().menu
    if ((last && !pressed)) {
        setOpen(!open)
    }
    setLast(pressed)
  })

  return open && (
    <Html>
        <div className='menu'>
            <div className="menu-title">
                Menu
            </div>
            <div className="menu-content">
                <div className="menu-item">
                    <h3>Subjective evaluation: </h3>
                    <label htmlFor="score">Overall quality of audio in the scene</label>
                    <input id='score' type="range" min={0} max={100} step={10} value={score} onChange={(e) => setScore(e.target.value)}/>
                </div>
                <div className="menu-item">
                    <h3>Objective evaluation: </h3>
                    <div>You have {score} score!</div>
                </div>
            </div>
        </div>
    </Html>
  )
}

export default Menu