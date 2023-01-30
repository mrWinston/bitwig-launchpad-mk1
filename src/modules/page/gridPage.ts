import { ArmButton } from "../buttons/armButton";
import { DummyButton, GenericActionButton, GenericMomentaryButton, GenericToggleButton } from "../buttons/button";
import { GridButton } from "../buttons/gridButton";
import { StopButton } from "../buttons/stopButton";
import { TOTAL_SCENES } from "../constants";
import { CoordToKey, GridCoordinateToKey } from "../midi";
import { Color } from "../utils";
import { Page } from "./page";

export class GridPage extends Page {
  private trackBank: API.TrackBank
  private transport: API.Transport
  private mixer: API.Mixer
  private app: API.Application
  private deleteActive: API.SettableBooleanValue
  private copyActive: API.SettableBooleanValue

  constructor(trackBank: API.TrackBank, transport: API.Transport, mixer: API.Mixer, state: API.DocumentState, app: API.Application) {
    super()
    this.trackBank = trackBank
    this.transport = transport
    this.mixer = mixer
    this.app = app
    this.deleteActive = state.getBooleanSetting("Delete Pressed", "Grid Page", false)
    this.copyActive = state.getBooleanSetting("Copy Pressed", "Grid Page", false)

    for (let t = 0; t < trackBank.getCapacityOfBank(); t++) {
      let track = trackBank.getItemAt(t)
      let clipLauncher = track.clipLauncherSlotBank()
      for (let s = 0; s < TOTAL_SCENES; s++) {
        let slot = clipLauncher.getItemAt(s)
        let but = new GridButton(CoordToKey(t,s), slot, this.app, track.arm(), this.deleteActive, this.copyActive)
        this.buttons[t][s] = but
      }

      this.buttons[t][TOTAL_SCENES] = new GenericToggleButton(
        CoordToKey(t, TOTAL_SCENES), 
        track.arm(), 
        Color.RED_FULL, 
        Color.RED_LOW
      )
      this.buttons[t][TOTAL_SCENES + 1] = new StopButton(CoordToKey(t, TOTAL_SCENES + 1), track)

      clipLauncher.addPlaybackStateObserver(this.createClipLauncherPlaybackStateObserver(t))
    }

    this.addSceneButtons()
  }

  private createClipLauncherPlaybackStateObserver = (track: number): (clip: number, state: number, queued: boolean) => void => {
    return (clip: number, state: number, queued: boolean) => {
      (this.buttons[track][clip] as GridButton).playbackStateChanged(state, queued)
    }
  }

  private addSceneButtons = () => {
    let t = this.trackBank.getCapacityOfBank()
    this.buttons[t] = [
      new GenericToggleButton(
        CoordToKey(t, 0),
        this.transport.isPlaying(),
        Color.GREEN_FLASHING, Color.GREEN_LOW
      ),
      new GenericToggleButton(
        CoordToKey(t, 1),
        this.transport.isClipLauncherOverdubEnabled(),
        Color.RED_FLASHING, Color.RED_LOW
      ),
      new GenericActionButton(
        CoordToKey(t, 2),
        this.app.undo,
        Color.AMBER_FULL, Color.AMBER_LOW
      ),
      new GenericActionButton(
        CoordToKey(t, 3),
        this.app.redo,
        Color.GREEN_LOW, Color.GREEN_FULL
      ),
      new GenericToggleButton(
        CoordToKey(t, 4),
        this.transport.isMetronomeEnabled(),
        Color.AMBER_FULL, Color.AMBER_LOW
      ),
      new GenericMomentaryButton(
        CoordToKey(t, 5),
        this.copyActive,
        Color.GREEN_FLASHING, Color.GREEN_FULL, true
      ),
      new GenericMomentaryButton(
        CoordToKey(t, 6),
        this.deleteActive,
        Color.RED_FLASHING, Color.RED_FULL, true
      ),
      new DummyButton(
        CoordToKey(t, 7),
      )
    ]

  }
}
