import { create } from 'zustand'
import { AudioType, GameState, TOTAL_TIME } from "../constants"
import { getRandomAudioTypeArr } from '../utils'

export const useClickStore = create((set) => ({
  click: 0,
  positionalClick: 0,
  stereoClick: 0,
  monoClick: 0,
  increaseClick: (type='') => set((state) => {
    const base = {
      click: state.click + 1
    }

    if(type === AudioType.POSITIONAL) {
      return {
        ...base,
        positionalClick: state.positionalClick + 1,
      }
    } else if (type === AudioType.MONO) { 
      return ({
        ...base,
        monoClick: state.monoClick + 1
      })
    } else if (type === AudioType.STEREO) {
      return ({
        ...base,
        stereoClick: state.stereoClick + 1
      })
    } else {
      return base
    }
  }),
  removeClick: () => set({ click: 0 }),
}))

export const useScoreStore = create((set) => ({
  score: 0,
  increaseScore: (num) => set(state => ({ score: state.score + num })),
}))

export const useResponseTimeStore = create((set) => ({
  positionalResponseTimeArr: [],
  avgPositionalResponseTime: 0,
  minPositionalResponseTime: Number.MAX_SAFE_INTEGER,
  stereoResponseTimeArr: [],
  avgStereoResponseTime: 0,
  minStereoResponseTime: Number.MAX_SAFE_INTEGER,
  monoResponseTimeArr: [],
  avgMonoResponseTime: 0,
  minMonoResponseTime: Number.MAX_SAFE_INTEGER,
  setResponseTime: (type, responseTime) => set(state => {
    if(type === AudioType.POSITIONAL) {
      return ({
        positionalResponseTimeArr: [...state.positionalResponseTimeArr, responseTime],
        avgPositionalResponseTime: (state.avgPositionalResponseTime * state.positionalResponseTimeArr.length + responseTime) / (length + 1),
        minPositionalResponseTime: Math.min(state.minPositionalResponseTime, responseTime)
      })
    } else if(type === AudioType.STEREO) {
      return ({
        stereoResponseTimeArr: [...state.stereoResponseTimeArr, responseTime],
        avgStereoResponseTime: (state.avgStereoResponseTime * state.stereoResponseTimeArr.length + responseTime) / (length + 1),
        minStereoResponseTime: Math.min(state.minStereoResponseTime, responseTime)
      })
    } else if(type === AudioType.MONO) {
      return ({
        monoResponseTimeArr: [...state.monoResponseTimeArr, responseTime],
        avgMonoResponseTime: (state.avgMonoResponseTime * state.monoResponseTimeArr.length + responseTime) / (length + 1),
        minMonoResponseTime: Math.min(state.minMonoResponseTime, responseTime)
      })
    }
  })
}))

export const useRoundStore = create((set) => ({
  round: 0,
  increaseRound: () => set((state) => ({ round: state.round + 1 })),
  removeRound: () => set({})
}))

export const useTimeStore = create((set) => ({
  time: TOTAL_TIME / 1000,
  decreaseTime: () => set((state) => {
    if(state.time > 0) {
      return {
        time: state.time - 1
      }
    } else {
      return {
        time: state.time
      }
    }
  }),
  setTime: (time) => set(() => ({ time }))
}))

// get a random audio type
const arr = getRandomAudioTypeArr()

export const useAudioStore = create((set) => ({
  defaultAudioTypeArr: arr,
  audioType: arr[0],
  setAudioType: (type) => set(() => ({ audioType: type }))
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