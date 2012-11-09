var five = require("johnny-five"),
    board, servo, potentiometer;

board = new five.Board();

board.on("ready", function() {

  // Create a new `servo` hardware instance.
  servo = new five.Servo(10);
  servo.min();

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 25
  });

  potentiometer
    .scale([0,180])
    .on("change", function (err, value) {
      servo.move( this.value );
    });

  // Inject the `servo` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    servo: servo,
    pot: potentiometer
  });

});

