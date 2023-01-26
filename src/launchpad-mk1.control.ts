import { Controller } from "./modules/controller";

var controller: Controller

// @ts-ignore
global.init = function init() {

  let app = host.createApplication()
  let trackBank = host.createMainTrackBank(8, 2, 6)
  let transport = host.createTransport()
  let mixer = host.createMixer()
  let docState = host.getDocumentState()

  controller = new Controller(
    app, trackBank, transport, mixer, docState
  )

  host.getMidiInPort(0).setMidiCallback(controller.handleMidiEvent);
  // this is to reset the lighting
  host.getMidiOutPort(0).sendMidi(176, 0, 0)
  host.getMidiOutPort(0).sendMidi(0xB0, 0, 0x28);

  println("My own Launchpad is initialized")
}

// @ts-ignore
global.flush = function flush() {
  println("Flush...")
  let midiOut = host.getMidiOutPort(0)

  let gridButtonsToRedraw = controller.getGridButtonsToRedraw()
  let headerButtonsToRedraw = controller.getHeaderButtonsToRedraw()

  gridButtonsToRedraw.forEach(button => {
    midiOut.sendMidi(144, button.key, button.color)
    button.ColorChanged()
  });
  headerButtonsToRedraw.forEach(button => {
    midiOut.sendMidi(176, button.key, button.color)
    button.ColorChanged()
  })
  controller.notifyRedrawn()

}

// @ts-ignore
global.exit = function exit() {
  host.getMidiOutPort(0).sendMidi(176, 0, 0)
}
