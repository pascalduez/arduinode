var five = require("johnny-five"),
    board, leds;

board = new five.Board();

leds = [7, 6, 5, 4, 3, 2];

board.on("ready", function() {


  leds.forEach(function( led ) {
    board.pinMode( led, 1 );
  });

  this.loop( 500, function() {

    leds.forEach(function( led, i ) {

      board.wait( i*100, function() {
        board.digitalWrite( led, 1 );
        board.wait( 100, function() {
          board.digitalWrite( led, 0 );
        });
      });

    });

    leds.reverse();

  });

});

