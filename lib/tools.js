var Tools = {};

/**
 * Gray code
 * https://en.wikipedia.org/wiki/Gray_code
 */

/**
 * Convert an unsigned binary number to reflected binary Gray code.
 * @param  {Number} num
 * @return {Number}
 */
Tools.binaryToGray = function( num ) {
  return ( num >> 1 ) ^ num;
};

/**
 * Convert a reflected binary Gray code number to a binary number.
 * @param  {Number} num
 * @return {Number}
 */
Tools.grayToBinary = function( num ) {
  var gray = num.toString( 2 ).split(""),
      bin = [],
      i = 1;

  bin[ 0 ] = gray[ 0 ];
  for ( ; i < gray.length; i++ ) {
    bin[ i ] = gray[ i ] ^ bin[ i - 1 ];
  }

  return parseInt( bin.join(""), 2 );
};

module.exports = Tools;
