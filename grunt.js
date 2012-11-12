module.exports = function(grunt) {

  var file = grunt.file,
      im = require('imagemagick');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: ['grunt.js', '**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
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
      src: ['**/*.png']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');

  // Png's resizing.
  grunt.registerMultiTask('resize', 'Smaller fritzing png exports.', function() {

    var files = grunt.file.expandFiles(this.file.src);

    files.forEach(function(file) {
      im.resize({
        srcPath: file,
        dstPath: file,
        quality: 0.8,
        width: 1200
      }, function(err, stdout, stderr) {
          if (err) {
            throw err;
          }
          console.log('stdout:', stdout);
          console.log('stderr:', stderr);
      });
    });

  });

};
