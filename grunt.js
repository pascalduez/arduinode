module.exports = function(grunt) {

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

  // Fzz's png resizing.
  grunt.registerMultiTask('resize', 'Smaller fritzing png exports.', function() {
    var imgck = require('imagemagick'),
        files = grunt.file.expandFiles(this.file.src),
        done = this.async();

    files.forEach(function(file) {

      imgck.identify(file, function(err, features) {
        if (err) {
          grunt.log.error(err);
          done(false);
        }
        if (features.width <= 1200) {
          done();
          return;
        }
        imgck.resize({
          srcPath: file,
          dstPath: file,
          quality: 0.8,
          width: 1200
        }, function(err, stdout, stderr) {
          if (err) {
            grunt.log.error(err);
            done(false);
          }
          grunt.log.writeln('stdout:', stdout);
          grunt.log.writeln('stderr:', stderr);
          done();
        });

      });

    });

  });

};
