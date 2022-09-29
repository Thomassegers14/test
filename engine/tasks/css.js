const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const gulpStylelint = require('gulp-stylelint')
const postcss = require('gulp-postcss')
const gulpSass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

module.exports = function (sync) {
  return {
    test () {
      return gulp
        .src('./src/css/*.scss')
        .pipe(gulpStylelint({
          config: {
            extends: './.stylelintrc',
            defaultSeverity: 'warning'
          },
          reporters: [{
            formatter: 'verbose',
            console: true
          }]
        }))
    },
    make () {
      const postCssPlugins = process.env.environment === 'dist' ? [autoprefixer(), cssnano()] : [autoprefixer()]
      return gulp
        .src('./src/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(gulpSass({ outputStyle: 'expanded' })
          .on('error', gulpSass.logError))
        .pipe(postcss(postCssPlugins))
        .pipe(gulpif(process.env.environment !== 'dist', sourcemaps.write()))
        .pipe(gulp.dest('./' + (process.env.environment || 'src') + '/css'))
        .pipe(sync.stream({ match: '**/*.css' }))
    }
  }
}
