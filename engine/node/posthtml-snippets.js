const ejs = require('ejs')
const fs = require('fs-extra')
const matchHelper = require("posthtml-match-helper")
const minify = require('html-minifier').minify
const parser = require('posthtml-parser').parser
const path = require('path')

module.exports = function (config, site) {
  return function posthtmlSnippets(tree) {
    const snippets = fs.readJsonSync(path.join(__dirname, '../../includes', 'snippets.json'))

    snippets.forEach(async ({ selector, template, replace }) => {
      tree.match(matchHelper(selector), $block => {
        const shouldStripHtml = Object.keys($block.attrs).includes('data-flatrock-striphtml')

        const snippetPath = path.join(__dirname, '../../includes', template)
        const snippet = fs.readFileSync(snippetPath, { encoding: 'utf-8' })
        const content = minify(ejs.render(snippet, { config, site, shouldStripHtml }), { collapseWhitespace: true })

        if(replace) {
          return parser(content)
        } else {
          if($block.hasOwnProperty('content')) {
            $block.content.push(content)
          } else {
            $block.content = [content]
          }

          // Remove data-attributes used for matching
          $block = removeFlatrockAttributes($block)

          return $block
        }
      })
    })

    return tree
  }
}

function removeFlatrockAttributes($block) {
  // If we have no attributes set at all, we can just return the block
  if(!$block.hasOwnProperty('attrs')) {
    return $block
  } else {
    const attrsToRemove = Object.keys($block.attrs).filter(attr => attr.substr(0, 13) === 'data-flatrock')
    attrsToRemove.forEach(attr => {
      delete $block.attrs[attr]
    })

    return $block
  }
}