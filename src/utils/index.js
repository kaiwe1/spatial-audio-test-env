import { INTERVAL } from "../constants"

const interval_sec = INTERVAL / 1000

export const calculateScore = (elapsedTime) => {
    if(elapsedTime > interval_sec) {
        elapsedTime = interval_sec
    }
    return Number((interval_sec - elapsedTime).toFixed(2))
}

export const isDebugMode = () => {
    return window.location.hash === '#debug'
}

