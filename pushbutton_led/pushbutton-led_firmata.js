var Board = require("firmata").Board
  , tty = "/dev/tty.usbmodemfd121"
  , buttonPin = 2
  , ledPin = 13
  , board
  ;

board = new Board(tty, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("connected");
  console.log("Firmware: " + board.firmware.name + "-" + board.firmware.version.major + "." + board.firmware.version.minor);

  board.pinMode(ledPin, board.MODES.OUTPUT);
  board.pinMode(buttonPin, board.MODES.INPUT);

  board.on("digital-read-" + buttonPin, function(data) {
    board.digitalWrite(ledPin, board[ data ? "HIGH" : "LOW" ]);
  });

});
