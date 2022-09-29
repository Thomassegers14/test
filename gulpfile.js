const chalk = require('chalk')

/* Load the necessary node modules */
const gulp = require('gulp')
const sync = require('browser-sync').create()

/* Load our tasks */
const build = require('./engine/tasks/build')
const copy = require('./engine/tasks/copy')(sync)
const css = require('./engine/tasks/css')(sync)
const html = require('./engine/tasks/html')(sync)
const images = require('./engine/tasks/images')
const js = require('./engine/tasks/js')(sync)
const test = require('./engine/tasks/test')(sync)

gulp.task('compile', gulp.series(js.test, js.make, css.test, css.make, html.make))

gulp.task('watch', function () {
  gulp.watch(['src/*.html', 'config.json'], html.make)
  gulp.watch('src/css/**/*.scss', gulp.series(css.test, css.make))
  gulp.watch('src/js/*.js', gulp.series(js.test, js.make))
  gulp.watch('src/images/**', copy.move)
  gulp.watch('src/data/**', copy.move)
})

gulp.task('serve', gulp.series(test.serve, 'watch'))

gulp.task('make', gulp.parallel(images.compress, 'compile'))

// Tasks on the CLI
gulp.task('test', gulp.series(test.set, copy.clean, copy.move, 'compile', 'serve'))
gulp.task('build', gulp.series(build.set, copy.clean, copy.move, 'make', build.rev, build.revReplace, html.clean))
gulp.task('publish', function (done) {
  console.log()
  console.log(chalk.bold.red('⚠ ERROR'), `The publish task is not supported anymore. You can just upload the contents of the ${chalk.bold('/dist')} folder to the ftp server.`)
  console.log()
  done()
})
