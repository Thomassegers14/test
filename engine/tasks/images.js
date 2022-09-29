const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const imageminJpegRecompress = require('imagemin-jpeg-recompress')

module.exports = {
  compress () {
    return gulp
      .src(['src/images/**/*.{jpg,JPG,png,gif}'])
      .pipe(imagemin([imageminJpegRecompress({ accurate: true, max: 85, progressive: true }), imagemin.gifsicle(), imagemin.optipng()], { verbose: true }))
      .pipe(gulp.dest('dist/images'))
  }
}
