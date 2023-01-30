import { GenericIncreaseDecreaseButton, GenericToggleButton } from "../buttons/button";
import { TrackColoredMuteButton } from "../buttons/muteButton";
import { Color } from "../utils";
import { Page } from "./page";

export class MixerPage extends Page {
  app: API.Application
  trackBank: API.TrackBank

  constructor(app: API.Application, trackBank: API.TrackBank) {
    super()
    this.app = app
    this.trackBank = trackBank

    for (let t = 0; t < 8; t++) {
      let track = trackBank.getItemAt(t)
      // volume
      this.buttons[t][0] = new GenericIncreaseDecreaseButton(
        track.volume(),
        0.05,
        t % 2 == 0 ? Color.GREEN_FULL : Color.YELLOW_LOW,
        t % 2 == 0 ? Color.GREEN_LOW : Color.YELLOW_LOW,
      )
      this.buttons[t][1] = new GenericIncreaseDecreaseButton(
        track.volume(),
        -0.05,
        t % 2 == 0 ? Color.GREEN_FULL : Color.YELLOW_LOW,
        t % 2 == 0 ? Color.GREEN_LOW : Color.YELLOW_LOW,
      )
      // send 1
      if (track.sendBank().getSizeOfBank() >= 1) {
        this.buttons[t][2] = new GenericIncreaseDecreaseButton(
          track.sendBank().getItemAt(0),
          0.05,
          t % 2 == 0 ? Color.AMBER_FULL : Color.RED_FULL,
          t % 2 == 0 ? Color.AMBER_LOW : Color.RED_LOW,
        )
        this.buttons[t][3] = new GenericIncreaseDecreaseButton(
          track.sendBank().getItemAt(0),
          -0.05,
          t % 2 == 0 ? Color.AMBER_FULL : Color.RED_FULL,
          t % 2 == 0 ? Color.AMBER_LOW : Color.RED_LOW,
        )
      }
      if (track.sendBank().getSizeOfBank() >= 2) {
        this.buttons[t][4] = new GenericIncreaseDecreaseButton(
          track.sendBank().getItemAt(1),
          0.05,
          t % 2 == 0 ? Color.GREEN_FULL : Color.YELLOW_LOW,
          t % 2 == 0 ? Color.GREEN_LOW : Color.YELLOW_LOW,
        )
        this.buttons[t][5] = new GenericIncreaseDecreaseButton(
          track.sendBank().getItemAt(1),
          -0.05,
          t % 2 == 0 ? Color.GREEN_FULL : Color.YELLOW_LOW,
          t % 2 == 0 ? Color.GREEN_LOW : Color.YELLOW_LOW,
        )
      }

      this.buttons[t][6] = new GenericToggleButton(
        (track.solo() as API.SettableBooleanValue), Color.YELLOW_FULL, Color.AMBER_LOW
      )

      this.buttons[t][7] = new TrackColoredMuteButton(
        track
      )
    }
  }

}
