import { Color } from "../utils";
import { Button } from "./button";

enum PlaybackState {
  STOPPED,
  STOPPED_QUEUED,
  PLAYING,
  PLAYING_QUEUED,
  RECORDING,
  RECORDING_QUEUED,
}

export class GridButton extends Button {
  slot: API.ClipLauncherSlot
  app: API.Application
  playbackState: PlaybackState
  arm: boolean
  deleteActive: boolean
  copyActive: boolean
  isEmpty: boolean

  constructor(
    key: number,
    slot: API.ClipLauncherSlot,
    app: API.Application,
    arm: API.SettableBooleanValue,
    deleteActive: API.SettableBooleanValue,
    copyActive: API.SettableBooleanValue,
  ) {
    super(key)
    this.slot = slot
    this.app = app
    this.playbackState = PlaybackState.STOPPED
    arm.addValueObserver((newValue: boolean) => {
      this.arm = newValue
      this.updateColor()
    })

    deleteActive.addValueObserver((newValue: boolean) => {
      this.deleteActive = newValue
    })
    copyActive.addValueObserver((newValue: boolean) => {
      this.copyActive = newValue
    })

    this.slot.hasContent().addValueObserver((newValue: boolean) => {
      this.isEmpty = !newValue
      this.updateColor()
    })
    this.arm = arm.get()
    this.updateColor()

  }


  private updateColor = () => {
    if (this.isEmpty && this.playbackState != PlaybackState.RECORDING_QUEUED) {
      this.setColor(this.arm ? Color.RED_LOW : Color.OFF)
    } else {
      switch (this.playbackState) {
        case PlaybackState.STOPPED:
          this.setColor(Color.AMBER_FULL)
          break;
        case PlaybackState.STOPPED_QUEUED:
          this.setColor(Color.AMBER_FLASHING)
          break;
        case PlaybackState.PLAYING:
          this.setColor(Color.GREEN_FULL)
          break;
        case PlaybackState.PLAYING_QUEUED:
          this.setColor(Color.GREEN_FLASHING)
          break;
        case PlaybackState.RECORDING:
          this.setColor(Color.RED_FULL)
          break;
        case PlaybackState.RECORDING_QUEUED:
          this.setColor(Color.RED_FLASHING)
          break;
        default:
          break;
      }
    }
    println(`[UpdateColor] Slot ${this.key}: Color is now ${this.currentColor}`)
  }

  pressed(): void {
    if (this.copyActive) {
      if (!this.isEmpty) {
        this.slot.select()
        this.app.copy()
      } else {
        this.slot.select()
        this.app.paste()
      }
    }
    else if (this.deleteActive) {
      this.slot.deleteObject()
    } else if (this.isEmpty && this.arm) {
      this.slot.record()
    } else {
      this.slot.launch()
    }
  }

  released(): void {
  }

  /**
  * a callback function that receives two parameters: 
  * 1. the queued or playback state: 
  *   `0` when stopped, 
  *   `1` when playing, or 
  *   `2` when recording, and 
  * 2. a boolean parameter indicating if the second argument is referring to
  * the queued state (`true`) or the actual playback state (`false`)  
  */
  public playbackStateChanged = (state: number, queued: boolean) => {
    println(`Playback State Changed: state: ${state} queued: ${queued}`)
    switch (state) {
      case 0:
        this.playbackState = queued ? PlaybackState.STOPPED_QUEUED : PlaybackState.STOPPED
        break;
      case 1:
        this.playbackState = queued ? PlaybackState.PLAYING_QUEUED : PlaybackState.PLAYING
        break;
      case 2:
        this.playbackState = queued ? PlaybackState.RECORDING_QUEUED : PlaybackState.RECORDING
        break;
      default:
        throw new Error(`${state} is invalid state number`)
    }
    this.updateColor()
  }


  //  private playingObserver = (isPlaying: boolean) => {
  //    this.setState(isPlaying ? SlotState.PLAYING : SlotState.STOPPED)
  //  }
  //
  //  private recordingObserver = (isPlaying: boolean) => {
  //    this.setState(isPlaying ? SlotState.PLAYING : SlotState.STOPPED)
  //  }

}
