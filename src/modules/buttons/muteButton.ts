import { Color, ConvertToLaunchpadColor } from "../utils";
import { Button } from "./button";

export class TrackColoredMuteButton extends Button {
  track: API.Track

  onColor: number
  offColor: number = Color.OFF

  isMuted: boolean = false
  
  constructor(key: number, track: API.Track){
    super(key)
    this.track = track

    this.track.color().addValueObserver((red: number, green: number) => {
      this.onColor = ConvertToLaunchpadColor(red, green, false)
      this.updateColor()
    })

    this.track.mute().addValueObserver((isMuted: boolean) => {
      this.isMuted = isMuted
      this.updateColor()
    })

  }

  updateColor = () => {
    this.setColor(this.isMuted ? this.offColor : this.onColor)
  }

  pressed(): void {
    this.track.mute().toggle()
  }
  released(): void {
  }

}
