var five = require("johnny-five"),
    board, led, button;

board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  led = new five.Led({
    pin: 13
  });

  // Create a new `button` hardware instance
  button = new five.Button({
    pin: 2
  });

  // "down" the button is pressed
  button.on("down", function() {
    led.on();
  });

  // "up" the button is released
  button.on("up", function() {
    led.off();
  });

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button
  });

});
