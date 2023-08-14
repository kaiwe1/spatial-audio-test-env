import React from "react"
import { useUserInfoStore, useClickStore, useScoreStore, useGameStateStore, useTimeStore } from "../store/store.js"
import { GameState, TOTAL_TIME } from "../constants/index.js"

const GameEnd = () => {
    const username = useUserInfoStore((state) => state.username)
    const score = useScoreStore((state) => state.score)
    const { click, positionalClick, stereoClick, monoClick } = useClickStore(state => ({
      click: state.click,
      positionalClick: state.positionalClick,
      stereoClick: state.stereoClick,
      monoClick: state.monoClick,
    }))
    const { gameState, setGameState } = useGameStateStore(state => ({ gameState: state.gameState, setGameState: state.setGameState }))
    const setTime = useTimeStore(state => state.setTime)

    const handleRestart = () => {
        setGameState(GameState.READY)
        setTime(TOTAL_TIME / 1000)
    }

  return (
    <div className={`fullscreen bg ${gameState === GameState.END ? "" : "end"}`}>
      <p>Congrats {username}, you have completed the Spatial Audio Test.</p>
      <p>Score: {score} | Click: {click}</p>
      <p>Positional Audio: {positionalClick} | Stereo Audio: {stereoClick} | Mono Audio: {monoClick}</p>
      <button onClick={handleRestart}>Restart</button>
    </div>
  )
}

export default GameEnd
