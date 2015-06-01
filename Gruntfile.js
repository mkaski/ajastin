'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            build: {
                files: {
                    'public/css/ajastin.css': 'public/less/ajastin.less'
                }
            },
            development: {
                files: {
                    'public/css/ajastin.css': 'public/less/ajastin.less'
                }
            }
        },
        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['public/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['less']);
    grunt.registerTask('build', ['less:build']);
};
