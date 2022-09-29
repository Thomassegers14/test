const gulp = require('gulp')
const babel = require('gulp-babel')
const gulpif = require('gulp-if')
const eslint = require('gulp-eslint')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

module.exports = function (sync) {
  return {
    test (done) {
      return gulp
        .src(['src/js/**.js', '!src/js/vendor/**.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    },
    make (done) {
      return gulp
        .src(['src/js/**.js', '!src/js/vendor/**.js'])
        .pipe(sourcemaps.init())
        .pipe(
          babel({
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['last 2 versions']
                }
              }]
            ]
          })
        )
        .pipe(gulpif(process.env.environment === 'dist', uglify()))
        .pipe(gulpif(process.env.environment !== 'dist', sourcemaps.write('./')))
        .pipe(gulp.dest(process.env.environment + '/js'))
        .pipe(sync.stream())
    }
  }
}
