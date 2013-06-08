module.exports = function(grunt) {
  var files = ['<banner:meta.banner>', 
              'source/jarallax.js',
              'source/jarallax_tools.js',
              'source/jarallax_controller.js',
              'source/jarallax_counter.js',
              'source/jarallax_object.js',
              'source/jarallax_animation.js',
              'source/controllers/*.js',
              'import/*/*.js'] 
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n' + 
              ' * <%= pkg.name %>\n' +
              ' * Version: <%= pkg.version %>\n' +
              ' * website: <%= pkg.website %>\n' +
              ' *\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
              ' * <%= pkg.license.type%>\n' +
              ' * <%= pkg.license.url%>\n' +
              ' * \n' +
              ' * Date: <%= grunt.template.today("dd mmm yyyy") %>\n' +
              ' */\n\n'
    },
    jshint: {
      files: ['source/*.js', 'source/controllers/*.js']
    },
    concat: {
      options: {
        banner: '/*!\n' + 
              ' * <%= pkg.name %>\n' +
              ' * Version: <%= pkg.version %>\n' +
              ' * website: <%= pkg.website %>\n' +
              ' *\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
              ' * <%= pkg.license.type%>\n' +
              ' * <%= pkg.license.url%>\n' +
              ' * \n' +
              ' * Date: <%= grunt.template.today("dd mmm yyyy") %>\n' +
              ' */\n\n'
      },
      dist: {
        src: files,
        dest: '<%= pkg.destination %><%= pkg.file_name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      dist: {
        src: files,
        dest: '<%= pkg.destination %><%= pkg.file_name %>-<%= pkg.version %>.min.js'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
