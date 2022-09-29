const fs = require('fs-extra')
const gulp = require('gulp')
const posthtml = require('gulp-posthtml')
const stripComments = require('gulp-strip-comments')

const posthtmlMinifier = require('posthtml-minifier')
const posthtmlMeta = require('../node/posthtml-meta.js')
const posthtmlSnippets = require('../node/posthtml-snippets.js')
const posthtmlAnalytics = require('../node/posthtml-analytics.js')
const stringStripHtml = require('string-strip-html')
const stripHtml = strg => stringStripHtml.stripHtml(strg).result

const path = require('path')

module.exports = function (sync) {
  return {
    make () {
      const config = fs.readJsonSync(path.join(process.cwd(), 'config.json'))
      const sites = fs.readJsonSync(path.join(process.cwd(), 'sites.json'))

      const needsMeta = 'meta' in config

      if (needsMeta) {
        config.meta.titleStripped = config.meta.titleStripped || stripHtml(config.meta.title)
        config.meta.descriptionStripped = config.meta.descriptionStripped || stripHtml(config.meta.description)
      }

      const site = sites.find(site => site.id === config.site)

      const tasks = [posthtmlSnippets(config, site)]
      if (needsMeta) tasks.push(posthtmlMeta(config, site))
      if (process.env.environment === 'dist') {
        tasks.push(posthtmlAnalytics(config, site))
        tasks.push(posthtmlMinifier({
          collapseWhitespace: true,
          minifyJS: true,
          processScripts: ['application/ld+json']
        }))
      }

      return gulp
        .src('src/*.html')
        .pipe(posthtml(tasks))
        .pipe(gulp.dest(process.env.environment))
        .pipe(sync.stream())
    },
    clean () {
      return gulp
        .src('./dist/*.html')
        .pipe(stripComments())
        .pipe(gulp.dest('./dist'))
    }
  }
}
