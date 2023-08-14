import React from "react"
import { useUserInfoStore, useClickStore, useScoreStore, useGameStateStore } from "../store/store.js"
import { GameState } from "../constants/index.js"

const GameEnd = () => {
    const username = useUserInfoStore((state) => state.username)
    const score = useScoreStore((state) => state.score)
    const { click, positionalClick, stereoClick, monoClick } = useClickStore(state => ({
      click: state.click,
      positionalClick: state.positionalClick,
      stereoClick: state.stereoClick,
      monoClick: state.monoClick,
    }))
    const gameState = useGameStateStore(state => state.gameState)

  return (
    <div className={`fullscreen bg ${gameState === GameState.END ? "" : "end"}`}>
      <p>Congrats {username}, you have completed the Spatial Audio Test.</p>
      <p>Score: {score} | Click: {click}</p>
      <p>Positional Audio Click: {positionalClick}</p>
      <p>Stereo Audion Click: {stereoClick}</p>
      <p>Mono Audio, Click: {monoClick}</p>
      <button>Restart</button>
    </div>
  )
}

export default GameEnd
