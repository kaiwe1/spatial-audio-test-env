import { create } from 'zustand'

export const useClicksStore = create((set) => ({
  clicks: 0,
  increaseClicks: () => set((state) => ({ clicks: state.clicks + 1 })),
  removeClicks: () => set({ clicks: 0 }),
}))

export const useScoreStore = create((set) => ({
  score: 0,
  increaseScore: (num) => set(state => ({ score: state.score + num })),
}))