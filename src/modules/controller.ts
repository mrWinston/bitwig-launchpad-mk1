import { Button, ScrollButton } from "./buttons/button";
import { PageSelectButton } from "./buttons/pageSelectButton";
import { HeaderIndexToKey, HeaderKeyToIndex, MidiMessage } from "./midi";
import { GlowPage } from "./page/glowPage";
import { GridPage } from "./page/gridPage";
import { MixerPage } from "./page/mixerPage";
import { Page } from "./page/page";
import { SettingsPage } from "./page/settingsPage";
import { ScrollDirection } from "./utils";

export class Controller {
  headerButtons: Button[];
  currentPageNumber: API.SettableRangedValue

  private pages: Page[]

  private app: API.Application
  private trackBank: API.TrackBank
  private transport: API.Transport
  private mixer: API.Mixer
  private state: API.DocumentState

  private redrawGrid: boolean = false

  constructor(app: API.Application, trackBank: API.TrackBank, transport: API.Transport, mixer: API.Mixer, state: API.DocumentState) {

    this.app = app
    this.trackBank = trackBank
    this.transport = transport
    this.mixer = mixer
    this.state = state

    this.app.focusPanelAbove

    this.currentPageNumber = this.state.getNumberSetting("Page", "Page", 0, 3, 1, "", 0)
    this.currentPageNumber.addRawValueObserver(() => {
      this.redrawGrid = true
    })

    this.pages = [
      new GridPage(this.trackBank, this.transport, this.mixer, this.state, this.app),
      new SettingsPage(this.app, this.transport),
      new MixerPage(this.app, this.trackBank),
      new GlowPage(),
    ]

    this.headerButtons = [
      new ScrollButton(HeaderIndexToKey(0), ScrollDirection.UP, trackBank),
      new ScrollButton(HeaderIndexToKey(1), ScrollDirection.DOWN, trackBank),
      new ScrollButton(HeaderIndexToKey(2), ScrollDirection.LEFT, trackBank),
      new ScrollButton(HeaderIndexToKey(3), ScrollDirection.RIGHT, trackBank),
      new PageSelectButton(HeaderIndexToKey(4), 0, this.currentPageNumber),
      new PageSelectButton(HeaderIndexToKey(5), 1, this.currentPageNumber),
      new PageSelectButton(HeaderIndexToKey(6), 2, this.currentPageNumber),
      new PageSelectButton(HeaderIndexToKey(7), 3, this.currentPageNumber),
    ]
  }

  // Central receiver for Midi messages in this controller
  public handleMidiEvent = (status: number, key: number, velocity: number) => {
    let msg = new MidiMessage(status, key, velocity)
    // forward grid buttons to page
    if (msg.isGridButton()) {
      this.getCurrentPage().handleMidiMessage(msg)
      return
    }
    if (msg.isPressed())  {
      this.headerButtons[HeaderKeyToIndex(msg.key)].pressed()
    }
  }

  public getCurrentPage = (): Page => {
    return this.pages[this.currentPageNumber.getRaw()]
  }

  public getGridButtonsToRedraw = (): Button[] => {
    if (this.redrawGrid) {
      return this.getCurrentPage().getAllButtons()
    } else {
      return this.getCurrentPage().getButtonsToRedraw()
    }
  }

  public getHeaderButtonsToRedraw = (): Button[] => {
    return this.headerButtons.filter((but: Button): boolean => {
      return but.colorChanged
    })
  }

  public notifyRedrawn = () => {
    this.redrawGrid = false
  }
}