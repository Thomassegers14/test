const env = require('gulp-env')
const nodemon = require('gulp-nodemon')
const open = require('open')

module.exports = function (sync) {
  return {
    set (done) {
      console.log('Switched to test environment')
      env.set({ environment: 'test' })
      done()
    },
    serve (done) {
      const config = require('../../config.json')
      var started = false

      nodemon({
        script: './engine/node/server.js',
        watch: false
      }).on('start', function () {
        if (!started) {
          sync.init(
            {
              proxy: 'localhost:3333',
              open: false
            },
            function () {
              setTimeout(() => {
                started = true
                open(`http://localhost:3000/${config.directory}`)
                done()
              }, 500)
            }
          )
        }
      })
    }
  }
}
