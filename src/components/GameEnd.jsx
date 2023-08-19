import React from "react"
import {
  useUserInfoStore,
  useClickStore,
  useScoreStore,
  useResponseTimeStore,
  useGameStateStore,
  useTimeStore,
} from "../store/store.js"
import { GameState, TOTAL_TIME } from "../constants/index.js"

const GameEnd = () => {
  const username = useUserInfoStore((state) => state.username)
  const score = useScoreStore((state) => state.score)
  const {
    click,
    positionalClick,
    stereoClick,
    monoClick,
    missedClick,
    positionalMissedClick,
    stereoMissedClick,
    monoMissedClick,
  } = useClickStore((state) => ({
    click: state.click,
    positionalClick: state.positionalClick,
    stereoClick: state.stereoClick,
    monoClick: state.monoClick,
    missedClick: state.missedClick,
    positionalMissedClick: state.positionalMissedClick,
    stereoMissedClick: state.stereoMissedClick,
    monoMissedClick: state.monoMissedClick,
  }))
  const {
    avgPositionalResponseTime,
    minPositionalResponseTime,
    avgStereoResponseTime,
    minStereoResponseTime,
    avgMonoResponseTime,
    minMonoResponseTime,
  } = useResponseTimeStore((state) => ({
    avgPositionalResponseTime: state.avgPositionalResponseTime,
    minPositionalResponseTime: state.minPositionalResponseTime,
    avgStereoResponseTime: state.avgStereoResponseTime,
    minStereoResponseTime: state.minStereoResponseTime,
    avgMonoResponseTime: state.avgMonoResponseTime,
    minMonoResponseTime: state.minMonoResponseTime,
  }))
  const { gameState, setGameState } = useGameStateStore((state) => ({
    gameState: state.gameState,
    setGameState: state.setGameState,
  }))
  const setTime = useTimeStore((state) => state.setTime)

  const handleRestart = () => {
    setGameState(GameState.READY)
    setTime(TOTAL_TIME / 1000)
  }

  return (
    <div
      className={`fullscreen bg ${gameState === GameState.END ? "" : "end"}`}
    >
      <p>Congrats {username}, you have completed the Spatial Audio Test.</p>
      <p>Score: {score}</p>
      <p>
        Effective Click: {click} | Missed Click: {missedClick} | Total Click:{" "}
        {click + missedClick}
      </p>
      <p>
        Positional Audio Response Time: Average:{" "}
        {avgPositionalResponseTime.toFixed(2)}, | Minimal:{" "}
        {minPositionalResponseTime.toFixed(2)}
      </p>
      <p>
        Positional Audio Click: Effetive {positionalClick} | Missed:{" "}
        {positionalMissedClick}
      </p>
      <p>
        Stereo Audio Response Time: Average: {avgStereoResponseTime.toFixed(2)}{" "}
        | Minimal : {minStereoResponseTime.toFixed(2)}
      </p>
      <p>
        Stereo Audio Click: Effective: {stereoClick} | Missed:{" "}
        {stereoMissedClick}
      </p>
      <p>
        Mono Audio Response Time: Average: {avgMonoResponseTime.toFixed(2)} |
        Minimal: {minMonoResponseTime.toFixed(2)},
      </p>
      <p>
        Mono Audio Click: Effective {monoClick} | Missed: {monoMissedClick}
      </p>
      <button style={{marginTop: '16px'}} onClick={handleRestart}>Restart</button>
    </div>
  )
}

export default GameEnd
