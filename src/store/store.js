import { create } from 'zustand'

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