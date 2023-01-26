import { Page } from "./page";

/**
 * Play/Record Section:
Rewind, Toggle Play, record, fast forward,
Arranger Overdub, arranger Automation Write

Loop Control:
Loop Active, loop start set, move forward, backwards, loop length inc, Dec, punch in, Out

Metronome:
Tap Tempo, enable Metronome, enable ticks, metronome volume up, down, pre roll Inc, Dec,

Move section:
Prev Cue, set Cue, next Cue
Move back 4b, 1b, Move forward 1b, 4b

Others
Zoom in, out, track bigger, smaller, next track, prev track, solo, mute, arm selected
*/

export class ArrangerPage extends Page {

  app: API.Application
  transport: API.Transport
  arranger: API.Arranger

  constructor(app: API.Application, arranger: API.Arranger, transport: API.Transport) {
    super()

    this.app = app
    this.arranger = arranger
    this.transport = transport

  }
}
