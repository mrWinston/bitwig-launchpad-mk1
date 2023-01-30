import { Color, ConvertToLaunchpadColor } from "../utils";
import { Button } from "./button";

export class TrackColoredMuteButton extends Button {
  track: API.Track

  onColor: number
  offColor: number = Color.OFF

  isMuted: boolean = false
  
  constructor(track: API.Track){
    super()
    this.track = track

    this.track.color().addValueObserver((red: number, green: number) => {
      this.onColor = ConvertToLaunchpadColor(red, green, false)
      this.updateColor()
    })

    this.onColor = ConvertToLaunchpadColor(this.track.color().red(), this.track.color().green(), false)

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
