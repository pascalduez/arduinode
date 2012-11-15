module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: "<json:package.json>",
    lint: {
      files: ["grunt.js", "**/*.js"]
    },
    watch: {
      files: "<config:lint.files>",
      tasks: "default"
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        strict: false,
        es5: true,
        laxcomma: true
      },
      globals: {
        exports: true
      }
    },
    resize: {
      src: ["**/*.png"]
    }
  });

  var file = grunt.file,
      log  = grunt.log;

  // Default task.
  grunt.registerTask("default", "lint");

  // Fzz"s png resizing.
  grunt.registerMultiTask("resize", "Smaller fritzing png exports.", function() {
    var imgck = require("imagemagick"),
        files = file.expandFiles( this.file.src ),
        done = this.async();

    files.forEach(function( file, i ) {

      imgck.identify([ "-format", "%w", file ], function( err, output ) {
        if ( err ) {
          log.error( err );
          done( false );
        }

        if ( output > 1200 ) {
          imgck.resize({
            srcPath : file,
            dstPath : file,
            quality : 0.8,
            width   : 1200
          }, function( err, stdout, stderr ) {
            if ( err ) {
              log.error( err );
              done( false );
            }
            log.writeln( "stdout:", stdout );
            log.writeln( "stderr:", stderr );
          });
        }
      });

      if ( i === files.length ) {
        done();
      }
    });

  });

};
