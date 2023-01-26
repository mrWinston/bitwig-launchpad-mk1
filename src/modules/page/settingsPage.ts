import { GenericSetEnumButton, GenericToggleButton } from "../buttons/button";
import { GenericSetBeatTimeValueButton, GenericToggleEnumButton } from "../buttons/postRecordingButtons";
import { CoordToKey } from "../midi";
import { Color } from "../utils";
import { Page } from "./page";

const POST_RECORDING_ACTION_OFF = "off"
const POST_RECORDING_ACTION_PLAY = "play_recorded"

export class SettingsPage extends Page {

  private app: API.Application
  private transport: API.Transport

  constructor(app: API.Application, transport: API.Transport) {
    super()
    this.app = app
    this.transport = transport

    this.createRecordQuantizationColumn(0)
    this.createPostRecordingColumn(1)

  }

  private createRecordQuantizationColumn = (col: number) => {
    let buttons = this.buttons[col]
    buttons[7] = new GenericToggleButton(
      CoordToKey(col, 7),
      this.app.recordQuantizeNoteLength(),
      Color.RED_FULL,
      Color.RED_LOW, 
    )
    
    buttons[6] = new GenericSetEnumButton(
      CoordToKey(col, 6),
      this.app.recordQuantizationGrid(),
      "OFF", 
      Color.ORANGE,
      Color.AMBER_LOW, 
    )
    buttons[5] = new GenericSetEnumButton(
      CoordToKey(col, 5),
      this.app.recordQuantizationGrid(),
      "1/32", 
      Color.GREEN_FULL,
      Color.AMBER_LOW, 
    )
    buttons[4] = new GenericSetEnumButton(
      CoordToKey(col, 4),
      this.app.recordQuantizationGrid(),
      "1/16", 
      Color.GREEN_FULL,
      Color.AMBER_LOW, 
    )
    buttons[3] = new GenericSetEnumButton(
      CoordToKey(col, 3),
      this.app.recordQuantizationGrid(),
      "1/8", 
      Color.GREEN_FULL,
      Color.AMBER_LOW, 
    )
    buttons[2] = new GenericSetEnumButton(
      CoordToKey(col, 2),
      this.app.recordQuantizationGrid(),
      "1/4", 
      Color.GREEN_FULL,
      Color.AMBER_LOW, 
    )

    buttons[1] = new GenericToggleButton(
      CoordToKey(col, 1), 
      this.transport.isClipLauncherOverdubEnabled(), 
      Color.RED_FULL, 
      Color.GREEN_LOW,
    )
    buttons[0] = new GenericToggleButton(
      CoordToKey(col, 0), 
      this.transport.isClipLauncherAutomationWriteEnabled(), 
      Color.ORANGE, 
      Color.YELLOW_LOW,
    )

  }

  private createPostRecordingColumn = (col: number) => {
    this.buttons[col][7] = new GenericToggleEnumButton(
      CoordToKey(col, 7),
      this.transport.clipLauncherPostRecordingAction(),
      POST_RECORDING_ACTION_PLAY,
      POST_RECORDING_ACTION_OFF,
      Color.RED_FULL,
      Color.RED_LOW
    )

    for (let i = 6; i >= 0; i--) {
      this.buttons[col][i] = new GenericSetBeatTimeValueButton(
        CoordToKey(col, i),
        this.transport.getClipLauncherPostRecordingTimeOffset(),
        this.transport.timeSignature(),
        Math.pow(2, (6 - i)),
        Color.ORANGE,
        Color.YELLOW_LOW
      )

    }


  }

}
