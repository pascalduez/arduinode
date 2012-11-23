var five = require("johnny-five"),
    red, green, blue, leds,
    potentiometer;

/**
 * Converts an HSV color value to RGB. Conversion formula
 * https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
 *
 * @param   Number  h  hue [ 0, 360 ]
 * @param   Number  s  saturation [ 0, 1 ]
 * @param   Number  v  value [ 0, 1 ]
 * @return  Array      RGB representation
 */
function hsvToRgb( h, s, v ) {
  h /= 60;
  var i = ~~h,
      f = h - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s),
      mod = i % 6,
      r = [v, q, p, p, t, v][mod] * 255,
      g = [t, v, v, q, p, p][mod] * 255,
      b = [p, p, t, v, v, q][mod] * 255;

  return [ r, g, b ];
}

/**
 * Recursively set r,g,b leds values.
 *
 * @param Number value
 */
function setColor( value ) {
  var rgb;

  rgb = hsvToRgb( value, 1, 1 );

  leds.each(function( led, i ) {
    led.brightness( ( 255 - rgb[ i ] ) );
  });
}

(new five.Board()).on("ready", function() {

  // 5v on anode.
  // Red cathode, Green cathode, Blue cathode.
  red = new five.Led( 11 );
  green = new five.Led( 10 );
  blue = new five.Led( 9 );

  leds = new five.Leds();

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 25
  });

  potentiometer
    .scale([ 0, 360 ])
    .on("change", function( err, value ) {
      setColor( this.value );
    });

});
