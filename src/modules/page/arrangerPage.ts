import { GenericActionButton, GenericToggleButton } from "../buttons/button";
import { MovePlaybackButton } from "../buttons/moveButton";
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
    

    this.buttons[4][5] = new MovePlaybackButton(this.transport, this.transport.timeSignature(), -4, Color.AMBER_FULL, Color.AMBER_LOW)
    this.buttons[5][5] = new MovePlaybackButton(this.transport, this.transport.timeSignature(), -1, Color.YELLOW_FULL, Color.YELLOW_LOW)
    this.buttons[6][5] = new MovePlaybackButton(this.transport, this.transport.timeSignature(), 1, Color.YELLOW_FULL, Color.YELLOW_LOW)
    this.buttons[7][5] = new MovePlaybackButton(this.transport, this.transport.timeSignature(), 4, Color.AMBER_FULL, Color.AMBER_LOW)
    
    this.buttons[4][6] = new GenericActionButton(this.app.zoomOut, Color.GREEN_FULL, Color.GREEN_LOW)
    this.buttons[5][6] = new GenericActionButton(this.transport.addCueMarkerAtPlaybackPosition, Color.AMBER_FULL, Color.AMBER_LOW)
    this.buttons[6][6] = new GenericActionButton(this.transport.continuePlayback ,Color.RED_FLASHING, Color.RED_LOW)
    this.buttons[7][6] = new GenericActionButton(this.app.zoomIn ,Color.GREEN_FULL, Color.GREEN_LOW)

    this.buttons[4][7] = new GenericActionButton(this.transport.jumpToPreviousCueMarker, Color.AMBER_FULL, Color.AMBER_LOW)
    this.buttons[5][7] = new GenericToggleButton(this.transport.isPlaying(), Color.GREEN_FULL, Color.GREEN_LOW)
    this.buttons[6][7] = new GenericToggleButton(this.transport.isArrangerRecordEnabled() ,Color.RED_FLASHING, Color.RED_LOW)
    this.buttons[7][7] = new GenericActionButton(this.transport.jumpToNextCueMarker ,Color.AMBER_FULL, Color.AMBER_LOW)

    this.buttons[8][6] = new GenericToggleButton(this.transport.isArrangerOverdubEnabled() ,Color.RED_FULL, Color.RED_LOW)
    this.buttons[8][7] = new GenericToggleButton(this.transport.isArrangerAutomationWriteEnabled() ,Color.AMBER_FULL, Color.AMBER_LOW)

  }
}
