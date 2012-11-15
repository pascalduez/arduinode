var Board = require("firmata").Board,
    tty = "/dev/tty.usbmodemfd121",
    pins, board, fw;

board = new Board( tty, function( err ) {
  if ( err ) {
    console.log( err );
    return;
  }

  fw = board.firmware;
  console.log("connected");
  console.log("Firmware: " + fw.name + "-" + fw.version.major + "." + fw.version.minor);

  pins = [ 7, 6, 5, 4, 3, 2 ];

  pins.forEach(function( pin ) {
    board.pinMode( pin, board.MODES.OUTPUT );
  });

  (function loop( i ) {
    board.digitalWrite( pins[ i ], board.HIGH );
    setTimeout(function() {
      board.digitalWrite( pins[ i ], board.LOW );
      if ( ++i === pins.length ) {
        pins.reverse();
        i = 1;
      }
      loop( i );
    }, 100);
  }( 0 ));

});
