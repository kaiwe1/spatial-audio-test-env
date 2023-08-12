export const AudioType = {
    POSITIONAL: "positional",
    STEREO: "stereo",
    MONO: "mono",
}

export const GameState = {
    START: "start",
    LOGGED: "logged",
    READY: "ready",
    END: "end",
}

export const ROUND = 3 // 3 rounds for positional, stereo, and mono audio
export const INTERVAL = 3000 // change boomBox position every 3 seconds
export const ROUND_INTERVAL = 15000 // 30s for a round
export const TOTAL_TIME = ROUND * ROUND_INTERVAL