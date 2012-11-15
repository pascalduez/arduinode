var Board = require("firmata").Board,
    tty = "/dev/tty.usbmodemfd121",
    leds, board, fw;

board = new Board( tty, function( err ) {
  if ( err ) {
    console.log( err );
    return;
  }

  fw = board.firmware;
  console.log("connected");
  console.log("Firmware: " + fw.name + "-" + fw.version.major + "." + fw.version.minor);

  leds = [ 7, 6, 5, 4, 3, 2 ];

  leds.forEach(function( led ) {
    board.pinMode( led, board.MODES.OUTPUT );
  });

  (function loop( i ) {
    board.digitalWrite( leds[ i ], board.HIGH );
    setTimeout(function() {
      board.digitalWrite( leds[ i ], board.LOW );
      if ( ++i === leds.length ) {
        leds.reverse();
        i = 1;
      }
      loop( i );
    }, 100);
  }( 0 ));

});
