import React from 'react'
import { useClickStore, useScoreStore, useRoundStore, useTimeStore, useAudioStore } from "../store/store"
import { isDebugMode } from '../utils'

const Stats = () => {
  const click = useClickStore((state) => state.click)
  const score = useScoreStore((state) => state.score)
  const round = useRoundStore((state) => state.round)
  const time = useTimeStore((state) => state.time)
  const audioType = useAudioStore((state) => state.audioType)

  return (
    <div className='stats'>
      <div className='stats-score'>
        Click: { click } | Score: { score.toFixed(2) }  
      </div>
      <div className="stats-round">
        Round: { round } | Type: {isDebugMode() ? audioType : audioType }
      </div>
      <div className="stats-time">
        Time Left: { time }
      </div>
    </div>
  )
}

export default Stats