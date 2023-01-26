import { Button, DummyButton } from "../buttons/button";
import { GRID_COLUMS, GRID_ROWS } from "../constants";
import { CoordToKey, GridCoordinateToKey, GridKeyToCoordinate, KeyAndColor, MidiMessage } from "../midi";
import { MatrixFilter } from "../utils";

export abstract class Page {
  buttons: Button[][];

  constructor() {
    this.buttons = new Array(GRID_COLUMS)

    // init the Buttons with dummy buttons
    for (let col = 0; col < this.buttons.length; col++) {
      this.buttons[col] = new Array(GRID_ROWS)
      for (let row = 0; row < this.buttons[col].length; row++) {
        this.buttons[col][row] = new DummyButton(GridCoordinateToKey({ col: col, row: row }))
      }
    }

  }

  handleMidiMessage(msg: MidiMessage): void {
    let coord = GridKeyToCoordinate(msg.key)
    println(`COL: ${coord.col}, ROW: ${coord.row}`)
    let button = this.buttons[coord.col][coord.row]

    msg.isPressed() ? button.pressed() : button.released()
  }

  public getAllKeyAndColors = (): KeyAndColor[] => {
    let all: KeyAndColor[] = new Array()
    this.buttons.forEach((btnCol, c) => {
      btnCol.forEach((btn, r) => {
        all.push({
          key: CoordToKey(c, r),
          color: btn.onColor
        })
        btn.ColorChanged()
      })
    })
    return all
  }

  public getKeyAndColorToRedraw = (): KeyAndColor[] => {
    let all: KeyAndColor[] = new Array()

    this.buttons.forEach((btnCol, c) => {
      btnCol.forEach((btn, r) => {
        if (btn.colorChanged) {
          all.push({
            key: CoordToKey(c, r),
            color: btn.onColor
          })
          btn.ColorChanged()
        }
      })
    })

    return all
  }
}
