'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.initConfig({

        // load npm package data
        pkg : grunt.file.readJSON('package.json'),

        watch: {
            less: {
                // if any .less file changes in directory "less" run the "less"-task.
                files: "src/less/*.less",
                tasks: ["less"]
            },
            js: {
                files: "src/*.js",
                tasks: ["jshint"]
            },
            html: {
                files: 'src/*.html',
                tasks: ['copy']
            }
        },

        // "less"-task configuration
        less: {
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing.
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["/src/less"]
                },
                files: {
                    // compilation.css  :  source.less
                    "dist/css/ajastin.css": "src/less/ajastin.less"
                }
            }
        },
        // jshint task
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },
            build : ['src/*.js']
        },
        // minify js task
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/ajastin.min.js': 'src/ajastin.js'
                }
            }
        },
        // minify angular
        ngmin: {
            build: {
                src: ['src/ajastin.js'],
                dest: 'dist/js/ajastin.min.js'
            }
        },
        // minify css task
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/ajastin.min.css' : 'dist/css/ajastin.css'
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'src/index.html',
                        dest: 'dist/index.html'
                    },
                    {
                        expand: true,
                        src: 'src/views/*',
                        flatten: true,
                        dest: 'dist/views/'
                    },
                    {
                        src: 'src/alert.ogg',
                        dest: 'dist/alert.ogg'
                    },
                    {
                        src: 'src/ajastin-logo.png',
                        dest: 'dist/ajastin-logo.png'
                    },
                    {
                        expand: true,
                        src: 'bower_components/**',
                        dest:'dist/'
                    }
                ]
            }
        }
    });
    // the default task (running "grunt" in console)
    grunt.registerTask('default', ['jshint', 'ngmin', 'less', 'cssmin', 'copy', 'watch']);
};