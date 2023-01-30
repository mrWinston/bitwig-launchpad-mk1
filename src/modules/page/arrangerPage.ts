import { GenericActionButton, GenericToggleButton } from "../buttons/button";
import { Color } from "../utils";
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


    // play section
    
    this.buttons[4][7] = new GenericActionButton(this.transport.rewind, Color.AMBER_FULL, Color.AMBER_LOW)
    this.buttons[5][7] = new GenericToggleButton(this.transport.isPlaying(), Color.GREEN_FLASHING, Color.GREEN_LOW)
    this.buttons[6][7] = new GenericToggleButton(this.transport.isArrangerRecordEnabled() ,Color.RED_FLASHING, Color.RED_LOW)
    this.buttons[7][6] = new GenericToggleButton(this.transport.isArrangerAutomationWriteEnabled() ,Color.ORANGE_FLASHING, Color.YELLOW_LOW)
    this.buttons[6][6] = new GenericToggleButton(this.transport.isArrangerOverdubEnabled() ,Color.ORANGE_FLASHING, Color.AMBER_LOW)

  }
}
