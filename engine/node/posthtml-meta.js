const indent = require('indent-string')

module.exports = function(config, site) {
  const twitterInfo = {
    card: 'summary_large_image',
    site: `@${site.twitter_handle}`,
    title: config.meta.titleStripped,
    description: config.meta.descriptionStripped,
    'image:src': config.sharingImageUrl
  }

  const facebookInfo = {
    title: config.meta.titleStripped,
    description: config.meta.descriptionStripped,
    type: 'website',
    url: config.url,
    image: config.sharingImageUrl,
    site_name: site.title
  }

  const twitterTags = Object.keys(twitterInfo).map(key => ({
    tag: 'meta',
    attrs: {
      name: `twitter:${key}`,
      content: twitterInfo[key]
    }
  }))

  const facebookTags = Object.keys(facebookInfo).map(key => ({
    tag: 'meta',
    attrs: {
      name: `og:${key}`,
      property: `og:${key}`,
      content: facebookInfo[key]
    }
  }))

  const structuredData = {
    "@context" : "http://schema.org",
    "@type" : "Article",
    "headline" : config.meta.titleStripped,
    "description": config.meta.descriptionStripped,
    "author" : config.meta.authors.map(author => author.name).join(','),
    "image" : config.sharingImageUrl,
    "datePublished" : config.meta.published,
    "dateModified" : config.meta.modified,
    "publisher" : {
      "@type" : "Organization",
      "name" : site.name,
      "logo" : {
        "@type" : "imageObject",
        "url" : site.icoBig
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    }
  }

  return function posthtmlMeta(tree) {

    tree.match({tag: 'head'}, function(head) {
      head.content.push([
        '  ',
        {
          tag: 'title',
          content: config.meta.titleStripped
        },
        '\n  ',
        {
          tag: 'meta',
          attrs: {
            name: "title",
            content: config.meta.titleStripped
          }
        },
        '\n  ',
        {
          tag: 'meta',
          attrs: {
            name: "description",
            content: config.meta.descriptionStripped
          }
        },
        '\n\n',
         ...twitterTags.map((tag, index) => [index === 0 ? '  ' : '\n  ', tag]),
        '\n\n',
        ...facebookTags.map((tag, index) => [index === 0 ? '  ' : '\n  ', tag]),
       '\n\n  ',
       {
         tag: 'script',
         attrs: {
           type: 'application/ld+json'
         },
         content: `\n${indent(JSON.stringify(structuredData, null, 2), 2)}\n  `
       },
       '\n\n'
      ])

      return head
    })

    return tree

  }
}
