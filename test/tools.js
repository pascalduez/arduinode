var tools = require("../lib/tools.js");

var values = {
   0: { "bin": "0000", "gray": "0000" },
   1: { "bin": "0001", "gray": "0001" },
   2: { "bin": "0010", "gray": "0011" },
   3: { "bin": "0011", "gray": "0010" },
   4: { "bin": "0100", "gray": "0110" },
   5: { "bin": "0101", "gray": "0111" },
   6: { "bin": "0110", "gray": "0101" },
   7: { "bin": "0111", "gray": "0100" },
   8: { "bin": "1000", "gray": "1100" },
   9: { "bin": "1001", "gray": "1101" },
  10: { "bin": "1010", "gray": "1111" },
  11: { "bin": "1011", "gray": "1110" },
  12: { "bin": "1100", "gray": "1010" },
  13: { "bin": "1101", "gray": "1011" },
  14: { "bin": "1110", "gray": "1001" },
  15: { "bin": "1111", "gray": "1000" }
};

exports["graycode"] = {

  "binaryToGray": function( test ) {
    test.expect( 16 );

    Object.keys( values ).forEach(function( num ) {
      test.equal( tools.binaryToGray( num ), parseInt( values[ num ].gray, 2) );
    });

    test.done();
  },

  "grayToBinary": function( test ) {
    test.expect( 16 );

    Object.keys( values ).forEach(function( num ) {
      test.equal( tools.grayToBinary( values[ num ].gray ), num );
    });

    test.done();
  }

}
