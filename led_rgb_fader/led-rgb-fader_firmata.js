var Board = require("firmata").Board,
    tty = "/dev/tty.usbmodemfd121",
    leds, pot,
    fw, board;

/**
 * Re-maps a number from one range to another.
 * http://arduino.cc/en/Reference/map
 *
 * @param  Number x
 * @param  Number fromLow
 * @param  Number fromHigh
 * @param  Number toLow
 * @param  Number toHigh
 * @return Number
 */
function map( x, fromLow, fromHigh, toLow, toHigh ) {
  return ( x - fromLow ) * ( toHigh - toLow ) /
         ( fromHigh - fromLow ) + toLow;
}

/**
 * Converts an HSV color value to RGB.
 * https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
 *
 * @param   Number  h  hue [ 0, 360 ]
 * @param   Number  s  saturation [ 0, 1 ]
 * @param   Number  v  value [ 0, 1 ]
 * @return  Array      RGB representation
 */
function hsvToRgb( h, s, v ) {
  var r, g, b,

      i = Math.floor( h / 60 ),
      f = h / 60 - i,
      p = v * ( 1 - s ),
      q = v * ( 1 - f * s ),
      t = v * ( 1 - ( 1 - f ) * s );

  switch ( i % 6 ) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

/**
 * Recursively set r,g,b leds values.
 *
 * @param Number value
 */
function setColor( value ) {
  var rgb;

  value = map( value, 0, 1023, 0, 360 );
  rgb = hsvToRgb( value, 1, 1 );

  leds.forEach(function( led, i ) {
    board.analogWrite( led, ( 255 - rgb[ i ] ) );
  });
}

board = new Board(tty, function( err ) {
  if ( err ) {
    console.log( err );
    return;
  }

  fw = board.firmware;
  console.log("connected");
  console.log("Firmware: " + fw.name + "-" + fw.version.major + "." + fw.version.minor);

  // 5v on anode.
  // Red cathode, Green cathode, Blue cathode.
  leds = [ 11, 10, 9 ];
  leds.forEach(function( led ) {
    board.pinMode( led, board.MODES.PWM );
  });

  // Potentiometer on pin A0.
  pot = 0;
  board.pinMode( pot, board.MODES.INPUT );

  board.on("analog-read-" + pot, setColor );

});
