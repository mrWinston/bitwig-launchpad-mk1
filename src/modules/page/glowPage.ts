import { ColorGridButton } from "../buttons/button";
import { GridKeyToCoordinate, MidiMessage } from "../midi";
import { Page } from "./page";

export class GlowPage extends Page {

  constructor() {
    super()

    for (let i = 0; i < this.buttons.length; i++) {
      for (let j = 0; j < this.buttons[i].length; j++) {
        this.buttons[i][j] = new ColorGridButton()
      }
    }
  }

  handleMidiMessage(msg: MidiMessage): void {
    let coord = GridKeyToCoordinate(msg.key)
    let button = this.buttons[coord.col][coord.row]

    if (msg.isPressed()) button.pressed()
    else button.released()
  }

}
