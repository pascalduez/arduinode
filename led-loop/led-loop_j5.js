var five = require("johnny-five"),
    board, leds;

board = new five.Board();
leds = [];

board.on("ready", function() {

  [ 7, 6, 5, 4, 3, 2 ].forEach(function( pin, i ) {
    leds[ i ] = new five.Led( pin );
  });

  (function loop( i ) {
    leds[ i ].on();
    board.wait( 100, function() {
      leds[ i ].off();
      if ( ++i === leds.length ) {
        leds.reverse();
        i = 1;
      }
      loop( i );
    });
  }( 0 ));

});
