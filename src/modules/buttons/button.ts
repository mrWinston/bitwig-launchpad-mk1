import { Color, RandomEnum, ScrollDirection } from "../utils"

export abstract class Button {

  public currentColor: Color
  public colorChanged: boolean

  constructor() {
    this.currentColor = Color.OFF
    this.colorChanged = true
  }

  public setColor(v: Color) {
    if (this.currentColor != v) {
      this.currentColor = v;
      this.colorChanged = true
    }
  }

  public ColorChanged() {
    this.colorChanged = false
  }

  abstract pressed(): void
  abstract released(): void
}

const headerButtonOnColor = Color.AMBER_LOW
const headerButtonOffColor = Color.OFF

export class ScrollButton extends Button {
  direction: ScrollDirection
  trackBank: API.TrackBank


  constructor(direction: ScrollDirection, trackBank: API.TrackBank) {
    super()
    this.setColor(Color.AMBER_LOW)
    this.trackBank = trackBank
    this.direction = direction

    switch (this.direction) {
      case ScrollDirection.LEFT:
        this.trackBank.canScrollBackwards().addValueObserver(this.setColorIfTrue)
        break;
      case ScrollDirection.RIGHT:
        this.trackBank.canScrollForwards().addValueObserver(this.setColorIfTrue)
        break;
      case ScrollDirection.UP:
        this.trackBank.sceneBank().canScrollBackwards().addValueObserver(this.setColorIfTrue)
        break;
      case ScrollDirection.DOWN:
        this.trackBank.sceneBank().canScrollForwards().addValueObserver(this.setColorIfTrue)
        break;
      default:
        break;
    }

  }

  private setColorIfTrue = (val: boolean) => {
    this.setColor(val ? headerButtonOnColor : headerButtonOffColor)
  }


  pressed(): void {
    switch (this.direction) {
      case ScrollDirection.LEFT:
        this.trackBank.scrollBackwards()
        break;
      case ScrollDirection.RIGHT:
        this.trackBank.scrollForwards()
        break;
      case ScrollDirection.UP:
        this.trackBank.sceneBank().scrollBackwards()
        break;
      case ScrollDirection.DOWN:
        this.trackBank.sceneBank().scrollForwards()
        break;
      default:
        break;
    }
  }

  released(): void {
  }
}

export class ColorGridButton extends Button {

  constructor() {
    super()
    this.setColor(Color.OFF)
  }

  pressed(): void {
    this.setColor(RandomEnum(Color))
  }

  // no need to do stuff on release
  released(): void { }
}

export class GenericSetEnumButton extends Button {

  enumParameter: API.SettableEnumValue
  setValue: string
  onColor: Color
  offColor: Color

  constructor(enumParameter: API.SettableEnumValue, setValue: string,  onColor: Color, offColor: Color) {
    super()
    this.enumParameter = enumParameter
    this.setValue = setValue
    this.onColor = onColor
    this.offColor = offColor

    this.enumParameter.addValueObserver((newValue: string) => {
      this.setColor(newValue == this.setValue ? this.onColor : this.offColor)
    })
  }

  pressed(): void {
    this.enumParameter.set(this.setValue)
  }
  released(): void {
  }

}

export class GenericToggleButton extends Button {
  toggle: API.SettableBooleanValue
  onColor: Color
  offColor: Color

  constructor(toggle: API.SettableBooleanValue, onColor: Color, offColor: Color) {
    super()
    this.toggle = toggle
    this.onColor = onColor
    this.offColor = offColor

    toggle.addValueObserver((isOn: boolean) => {
      this.setColor(isOn ? this.onColor : this.offColor)
    })

  }

  pressed(): void {
    this.toggle.toggle()
  }
  released(): void {
  }

}

export class GenericMomentaryButton extends Button {
  toggle: API.SettableBooleanValue
  onColor: Color
  offColor: Color
  pressedState: boolean

  constructor(toggle: API.SettableBooleanValue, onColor: Color, offColor: Color, pressedState: boolean) {
    super()
    this.toggle = toggle
    this.onColor = onColor
    this.offColor = offColor
    this.pressedState = pressedState

    toggle.addValueObserver((isOn: boolean) => {
      this.setColor(isOn ? this.onColor : this.offColor)
    })

  }

  pressed(): void {
    this.toggle.set(this.pressedState)
  }
  released(): void {
    this.toggle.set(!this.pressedState)
  }

}

export class GenericIncreaseDecreaseButton extends Button {
  parameter: API.SettableRangedValue
  onColor: Color
  offColor: Color

  increment: number

  constructor(parameter: API.SettableRangedValue, increment: number, onColor: Color, offColor: Color) {
    super()
    this.parameter = parameter
    this.parameter.markInterested()
    this.onColor = onColor
    this.offColor = offColor
    this.increment = increment
    this.setColor(this.offColor)
  }

  pressed(): void {
    this.parameter.inc(this.increment) 
    this.setColor(this.onColor)
  }
  released(): void {
    this.setColor(this.offColor)
  }


}

export class GenericActionButton extends Button {
  action: () => void
  onColor: Color
  offColor: Color

  constructor(action: () => void, onColor: Color, offColor: Color) {
    super()
    this.action = action
    this.onColor = onColor
    this.offColor = offColor
    this.setColor(offColor)
  }

  pressed(): void {
    this.action()
    this.setColor(this.onColor)
  }
  released(): void {
    this.setColor(this.offColor)
  }

}

export class DummyButton extends Button {

  constructor() {
    super()
  }

  // dont do anything
  pressed() { }

  // no need to do stuff on release
  released() { }
}
