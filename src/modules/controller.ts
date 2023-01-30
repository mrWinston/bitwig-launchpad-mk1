import { Button, ScrollButton } from "./buttons/button";
import { PageSelectButton } from "./buttons/pageSelectButton";
import { HeaderIndexToKey, HeaderKeyToIndex, KeyAndColor, MidiMessage } from "./midi";
import { ArrangerPage } from "./page/arrangerPage";
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
  private arranger: API.Arranger
  private trackBank: API.TrackBank
  private transport: API.Transport
  private mixer: API.Mixer
  private state: API.DocumentState

  private redrawGrid: boolean = false

  constructor(app: API.Application, arranger: API.Arranger, trackBank: API.TrackBank, transport: API.Transport, mixer: API.Mixer, state: API.DocumentState) {

    this.app = app
    this.arranger = arranger
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
      new ArrangerPage(this.app,this.arranger, this.transport),
    ]

    this.headerButtons = [
      new ScrollButton(ScrollDirection.UP, trackBank),
      new ScrollButton(ScrollDirection.DOWN, trackBank),
      new ScrollButton(ScrollDirection.LEFT, trackBank),
      new ScrollButton(ScrollDirection.RIGHT, trackBank),
      new PageSelectButton(0, this.currentPageNumber),
      new PageSelectButton(1, this.currentPageNumber),
      new PageSelectButton(2, this.currentPageNumber),
      new PageSelectButton(3, this.currentPageNumber),
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

  public getGridButtonsToRedraw = (): KeyAndColor[] => {
    if (this.redrawGrid) {
      return this.getCurrentPage().getAllKeyAndColors()
    } else {
      return this.getCurrentPage().getKeyAndColorToRedraw()
    }
  }

  public getHeaderButtonsToRedraw = (): KeyAndColor[] => {
    let out: KeyAndColor[] = new Array()

    this.headerButtons.forEach((btn, i) => {
      if (btn.colorChanged) {
        out.push({
          key: HeaderIndexToKey(i),
          color: btn.currentColor,
        })
      }
    })

    return out
    
  }

  public notifyRedrawn = () => {
    this.redrawGrid = false
  }
}
