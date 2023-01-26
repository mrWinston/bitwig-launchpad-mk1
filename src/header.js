loadAPI(17);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("mrWinston", "launchpad-mk1", "0.1", "6fc5a75a-006d-4b35-b5e7-baa8234ede47", "mrWinston");

host.defineMidiPorts(1, 1);

host.addDeviceNameBasedDiscoveryPair(["Launchpad"], ["Launchpad"]);

//for (var i = 1; i < 20; i++) {
//  var deviceName = i.toString() + "- Launchpad";
//  host.addDeviceNameBasedDiscoveryPair([deviceName], [deviceName]);
//  host.addDeviceNameBasedDiscoveryPair(["Launchpad MIDI " + i.toString()], ["Launchpad MIDI " + i.toString()]);
//  host.addDeviceNameBasedDiscoveryPair(["Launchpad S " + i.toString()], ["Launchpad S " + i.toString()]);
//  host.addDeviceNameBasedDiscoveryPair(["Launchpad S MIDI " + i.toString()], ["Launchpad S MIDI " + i.toString()]);
//  host.addDeviceNameBasedDiscoveryPair(["Launchpad Mini " + i.toString()], ["Launchpad Mini " + i.toString()]);
//  host.addDeviceNameBasedDiscoveryPair(["Launchpad Mini MIDI " + i.toString()], ["Launchpad Mini MIDI " + i.toString()]);
//}
//
//if (host.platformIsLinux()) {
//  host.addDeviceNameBasedDiscoveryPair(["Launchpad MIDI 1"], ["Launchpad MIDI 1"]);
//
//  for (var i = 1; i < 16; i++) {
//    host.addDeviceNameBasedDiscoveryPair(["Launchpad S " + + i.toString() + " MIDI 1"], ["Launchpad S " + + i.toString() + " MIDI 1"]);
//    host.addDeviceNameBasedDiscoveryPair(["Launchpad Mini " + + i.toString() + " MIDI 1"], ["Launchpad Mini " + + i.toString() + " MIDI 1"]);
//  }
//}
