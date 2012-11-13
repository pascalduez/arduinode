var Board = require("firmata").Board
  , tty = "/dev/tty.usbmodemfd121"
  , leds
  , board
  ;

leds = [7, 6, 5, 4, 3, 2];

board = new Board(tty, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("connected");
  console.log("Firmware: " + board.firmware.name + "-" + board.firmware.version.major + "." + board.firmware.version.minor);

  leds.forEach(function( led ) {
    board.pinMode(led, board.MODES.OUTPUT);
  });

  (function ledLoop( i ) {
    board.digitalWrite( leds[ i ], board.HIGH );
    setTimeout(function() {
      board.digitalWrite( leds[ i ], board.LOW );
      if (++i === leds.length) {
        leds.reverse();
        i = 1;
      }
      ledLoop( i );
    }, 100);
  }( 0 ));

});
