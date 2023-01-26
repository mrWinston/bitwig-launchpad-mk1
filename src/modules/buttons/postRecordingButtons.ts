import { Color } from "../utils";
import { Button } from "./button";


export class GenericToggleEnumButton extends Button {
  enumParameter: API.SettableEnumValue
  onValue: string
  offValue: string
  onColor: Color
  offColor: Color


  constructor(key: number, enumParameter: API.SettableEnumValue, onValue: string, offValue: string, onColor: Color, offColor: Color) {
    super(key)
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

  constructor(key: number, observe: API.SettableBeatTimeValue, timeSignature: API.TimeSignatureValue, value: number, onColor: Color, offColor: Color) {
    super(key)

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

function calculateQuarterNotesPerBar(timeSignature: string): number {
  let [numString, denomString] = timeSignature.split("/")

  let numerator: number = Number.parseInt(numString)
  let denominator: number = Number.parseInt(denomString)

  return numerator * 4 / denominator
}
