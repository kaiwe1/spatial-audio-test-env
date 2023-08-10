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

export const ROUND = 3
export const INTERVAL = 3000 // change boomBox postion
export const ROUND_INTERVAL = 3000 // 30s
export const TOTAL_TIME = ROUND * ROUND_INTERVAL