import { calculateQuarterNotesPerBar, Color } from "../utils";
import { Button } from "./button";


export class GenericToggleEnumButton extends Button {
  enumParameter: API.SettableEnumValue
  onValue: string
  offValue: string
  onColor: Color
  offColor: Color


  constructor(enumParameter: API.SettableEnumValue, onValue: string, offValue: string, onColor: Color, offColor: Color) {
    super()
    this.enumParameter = enumParameter
    this.onValue = onValue
    this.offValue = offValue
    this.onColor = onColor
    this.offColor = offColor

    this.enumParameter.addValueObserver((newValue: string) => {
      this.setColor(newValue == this.onValue ? this.onColor : this.offColor)
    })
  }

  pressed(): void {
    this.enumParameter.set(this.enumParameter.get() == this.onValue ? this.offValue : this.onValue)
  }
  released(): void {
  }

}

export class GenericSetBeatTimeValueButton extends Button {
  observe: API.SettableBeatTimeValue
  quarterNotesPerBar: number
  value: number

  constructor(observe: API.SettableBeatTimeValue, timeSignature: API.TimeSignatureValue, value: number, onColor: Color, offColor: Color) {
    super()

    this.observe = observe
    this.value = value

    timeSignature.addValueObserver((ts: string) => {
      this.quarterNotesPerBar = calculateQuarterNotesPerBar(ts)
    })

    this.observe.addValueObserver((newValue: number) => {
      this.setColor(this.value * this.quarterNotesPerBar == newValue ? onColor : offColor)
    })
  }

  pressed(): void {
    this.observe.set(this.value * this.quarterNotesPerBar)
  }
  released(): void {
  }

}

