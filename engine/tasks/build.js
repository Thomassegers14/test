const del = require('del')
const env = require('gulp-env')
const gulp = require('gulp')
const path = require('path')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const revReplaceCss = require('./gulp-rev-css-url.js')
const revDelete = require('gulp-rev-delete-original')

module.exports = {
  set (done) {
    console.log('Switched to build environment')
    env.set({ environment: 'dist' })
    done()
  },
  rev () {
    return gulp
      .src(['css/*.css', 'images/**/*.jpg', 'images/**/*.JPG', 'images/**/*.gif', 'images/**/*.png', 'js/*.js', 'data/**', '!images/promo/**', '!images/nav/**'], { cwd: './dist', base: './dist' })
      .pipe(rev())
      .pipe(revReplaceCss())
      .pipe(revDelete())
      .pipe(gulp.dest('./dist'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dist'))
  },
  revReplace () {
    const manifestFile = path.join(__dirname, '..', '..', 'dist', 'rev-manifest.json')
    const manifest = gulp.src(manifestFile)

    del(manifestFile)

    return gulp
      .src('./dist/*.html')
      .pipe(revReplace({ manifest: manifest }))
      .pipe(gulp.dest('./dist'))
  }
}
