import { create } from 'zustand'

export const useClicksStore = create((set) => ({
  clicks: 0,
  increaseClicks: () => set((state) => ({ clicks: state.clicks + 1 })),
  removeClicks: () => set({ clicks: 0 }),
}))