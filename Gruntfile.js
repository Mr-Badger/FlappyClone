module.exports = function(grunt) {
  var autoprefixer = require('autoprefixer-core');

  grunt.initConfig({
    jshint: {
      src: ['app/src/js/*.js'],
      options: {
        curly:  true,
        immed:  true,
        newcap: true,
        noarg:  true,
        sub:    true,
        boss:   true,
        eqnull: true,
        node:   true,
        undef:  true,
        devel:  true,
        globals: {
          _:       false,
          jQuery:  false,
          angular: false,
          moment:  false,
          console: false,
          $:       false,
          io:      false
        }
       }
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jshint'],
      },
      css: {
        files: ['**/*.less'],
        tasks: ['less', 'postcss', 'cssmin'],
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['app/src/js/app.js', 'app/src/js/*.js'],
        dest: 'app/dist/js/build.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'app/dist/js/build.min.js': ['app/dist/js/build.js']
        }
      }
    },
    less: {
    build: {
        files: {
          'app/dist/css/main.css': 'app/src/less/main.less'
        }
      }
    },
    postcss: {
        options: {
            processors: [
              autoprefixer({ browsers: ['last 2 version'] }).postcss
            ]
        },
        dist: { src: 'app/dist/css/*.css' }
    },
    cssmin: {
      build: {
        files: {
          'app/dist/css/main.min.css': 'app/dist/css/main.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify', 'less', 'postcss', 'cssmin'] );
};

