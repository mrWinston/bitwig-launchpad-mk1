import { calculateQuarterNotesPerBar, Color } from "../utils"
import { Button } from "./button"

export class MovePlaybackButton extends Button {
  onColor: Color
  offColor: Color
  transport: API.Transport
  bars: number
  quarterNotesPerBar: number

  constructor(transport: API.Transport, timeSignature: API.TimeSignatureValue , bars: number, onColor: Color, offColor: Color) {
    super()
    this.transport = transport
    this.onColor = onColor
    this.offColor = offColor
    this.bars = bars
    this.quarterNotesPerBar = calculateQuarterNotesPerBar(timeSignature.get())
    this.setColor(offColor)

    timeSignature.addValueObserver((ts: string) => {
      this.quarterNotesPerBar = calculateQuarterNotesPerBar(ts)
    })
  }

  pressed(): void {
    this.setColor(this.onColor)
    this.transport.incPosition(this.bars * this.quarterNotesPerBar, true)
  }
  released(): void {
    this.setColor(this.offColor)
  }

}
