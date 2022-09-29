const gulp = require('gulp')
const del = require('del')
const newer = require('gulp-newer')

module.exports = function (sync) {
  return {
    clean () {
      return del(['./' + (process.env.environment || 'src') + '/**'])
    },
    move () {
      var glob = ['./src/**', '!./src/**.html', '!./src/css/**/**', '!./src/js/**.js']
      if (process.env.environment === 'dist') glob.push('!./src/images/**/*.{jpg,JPG,png,gif}', '!./src/css/*.woff*') // If we're building, we'll take care of most of the images through optimization and don't need the fonts

      return gulp
        .src(glob)
        .pipe(newer('./' + process.env.environment))
        .pipe(gulp.dest('./' + process.env.environment))
        .pipe(sync.stream({ once: true }))
    }
  }
}
