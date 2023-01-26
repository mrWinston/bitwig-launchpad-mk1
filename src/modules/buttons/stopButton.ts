import { Color, ConvertToLaunchpadColor } from "../utils";
import { Button } from "./button";

export class StopButton extends Button {
  track: API.Track

  standbyColor: number
  flashingColor: number

  isStopped: boolean = true
  isQueuedForStop: boolean = false
  
  constructor(key: number, track: API.Track){
    super(key)
    this.track = track

    this.track.color().addValueObserver((red: number, green: number) => {
      this.standbyColor = ConvertToLaunchpadColor(red, green, false)
      this.flashingColor = ConvertToLaunchpadColor(red, green, true)
      this.updateColor()
    })

    this.track.isQueuedForStop().addValueObserver((isQueued: boolean) => {
      this.isQueuedForStop = isQueued
      this.updateColor()
    })

  }

  updateColor = () => {
    this.setColor(this.isQueuedForStop ? this.flashingColor : this.standbyColor)
  }

  pressed(): void {
    this.track.stop()
  }
  released(): void {
  }

}
