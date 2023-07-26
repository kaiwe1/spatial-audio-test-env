export const calculateScore = (elapsedTime) => {
    if(elapsedTime > 3) {
        elapsedTime = 3
    }
    return Number((3 - elapsedTime).toFixed(2))
}

export const isDebugMode = () => {
    return window.location.hash === '#debug'
}

