import { Color } from "../utils";
import { Button } from "./button";

export class StopButton extends Button {
  track: API.Track
  
  constructor(key: number, track: API.Track){
    super(key)
    this.track = track

    this.track.isStopped().addValueObserver((isStopped: boolean) => {
      this.setColor(isStopped ? Color.ORANGE : Color.GREEN_LOW)
    })
    this.track.isQueuedForStop().addValueObserver((isQueued: boolean) => {
      this.setColor(isQueued ? Color.ORANGE_FLASHING : Color.ORANGE)
    })

  }

  pressed(): void {
    this.track.stop()
  }
  released(): void {
  }

}
