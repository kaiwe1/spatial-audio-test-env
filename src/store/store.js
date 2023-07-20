import { create } from 'zustand'
import { AudioType, GameState } from "../constants"

export const useClickStore = create((set) => ({
  click: 0,
  increaseClick: () => set((state) => ({ click: state.click + 1 })),
  removeClick: () => set({ click: 0 }),
}))

export const useScoreStore = create((set) => ({
  score: 0,
  increaseScore: (num) => set(state => ({ score: state.score + num })),
}))

export const useRoundStore = create((set) => ({
  round: 0,
  increaseRound: () => set((state) => ({ round: state.round + 1 })),
  removeRound: () => set({})
}))

export const useTimeStore = create((set) => ({
  time: 100,
  decreaseTime: () => set((state) => ({ time: state.time - 1})),
  setTime: (time) => set(() => ({ time }))
}))

export const useAudioStore = create((set) => ({
  audioType: AudioType.POSITIONAL,
  setAudioType: (type) => set(() => ({ audioType: type}))
}))

export const useGameStateStore = create((set) => ({
  gameState: GameState.START,
  setGameState: (gameState) => set(() => ({ gameState: gameState }))
}))

export const useUserInfoStore = create((set) => ({
  username: "",
  email: "",
  setUserInfo: (userInfo) => set(() => ({
    username: userInfo?.username,
    email: userInfo?.email
  }))
}))