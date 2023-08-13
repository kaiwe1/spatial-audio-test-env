import { AudioType, INTERVAL } from "../constants"
import { shuffle } from "lodash-es"

const interval_sec = INTERVAL / 1000

export const calculateScore = (elapsedTime) => {
  if (elapsedTime > interval_sec) {
    elapsedTime = interval_sec
  }
  return Number((interval_sec - elapsedTime).toFixed(2))
}

export const isDebugMode = () => {
  return window.location.hash === "#debug"
}

export const getRandomAudioTypeArr = () => {
  const arr = [AudioType.POSITIONAL, AudioType.STEREO, AudioType.MONO]
  return shuffle(arr)
}

export const addHashtagToURL = (hashtag) => {
  const currentURL = window.location.href
  const newURL = currentURL + "#" + encodeURIComponent(hashtag)
  window.location.href = newURL
}
