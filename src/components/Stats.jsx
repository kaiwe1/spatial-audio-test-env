import React from 'react'
import { useClicksStore, useScoreStore } from "../store/store"

const Stats = () => {
  const clicks = useClicksStore((state) => state.clicks)
  const score = useScoreStore((state) => state.score)

  return (
    <div className='stats'>
      Clicks: {clicks} | Score: {score.toFixed(2)}  
    </div>
  )
}

export default Stats