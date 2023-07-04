# Spatial Audio Testing Environment

Spatial audio virtual testing environment based on **React Three Fiber**

## Q
zustand global state management
rapier physics
keyboard control to pop up menu and control player movement.
useTexture
waveform

## Goals

- VR support (using R3F)
- Subjective Scoring system (from 1 to 5) reaistic or immersive
- Other objective Evaluation methods (game, enemy audio cue times kill enemy or quick, react to the environment.  )

like Virtual fly(continious noise)

- mono
- stereo
- HRTF

keep simple

## Usage

Start the local development server

```bash
$ npm run start
```

## Scene

| Scene | Features | 
|---------|---------|
| Restaurant | Three audio objects:Guitar, conversation, and bottle opening |
| Living room* | Three audio objects: Piano, wind chimes, and fireplace |
| Outdoor | Four audio objects: Tree cutting, ducks, airplane, and birds |
| Fountain music | Two audio objects: Piano and a fountain |

## HRTF

- Generic binaural HRTFs from SADIE database
- stereo (web api)
- Individual HRTFs (extra points)

## Condition

- No elevation
- Angle offset
- Delay 500 ms
- Stereo mix
