export const calculateScore = (elapsedTime) => {
    return Number((3 - elapsedTime).toFixed(2))
}