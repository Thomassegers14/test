module.exports = function (config, site) {
  return function posthtmlAnalytics (tree) {
    tree.match({ tag: 'head' }, function (head) {
      head.content.push([
        '  ',
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript'
          },
          content: 'window.gdprAppliesGlobally=true;(function(){function a(e){if(!window.frames[e]){if(document.body&&document.body.firstChild){var t=document.body;var n=document.createElement("iframe");n.style.display="none";n.name=e;n.title=e;t.insertBefore(n,t.firstChild)}else{setTimeout(function(){a(e)},5)}}}function e(n,r,o,c,s){function e(e,t,n,a){if(typeof n!=="function"){return}if(!window[r]){window[r]=[]}var i=false;if(s){i=s(e,t,n)}if(!i){window[r].push({command:e,parameter:t,callback:n,version:a})}}e.stub=true;function t(a){if(!window[n]||window[n].stub!==true){return}if(!a.data){return}var i=typeof a.data==="string";var e;try{e=i?JSON.parse(a.data):a.data}catch(t){return}if(e[o]){var r=e[o];window[n](r.command,r.parameter,function(e,t){var n={};n[c]={returnValue:e,success:t,callId:r.callId};a.source.postMessage(i?JSON.stringify(n):n,"*")},r.version)}}if(typeof window[n]!=="function"){window[n]=e;if(window.addEventListener){window.addEventListener("message",t,false)}else{window.attachEvent("onmessage",t)}}}e("__tcfapi","__tcfapiBuffer","__tcfapiCall","__tcfapiReturn");a("__tcfapiLocator");(function(e){var t=document.createElement("script");t.id="spcloader";t.type="text/javascript";t.async=true;t.src="https://sdk.privacy-center.org/"+e+"/loader.js?target="+document.location.hostname;t.charset="utf-8";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)})("97973d83-06d0-433f-8713-c4b550aa96e2")})();'
        },
        '\n',
        '  ',
        {
          tag: 'script',
          attrs: {
            src: 'https://trjs.mediafin.be/loader/trmfn-loader.js',
            'data-env': 'prod',
            'data-site': `${config.site}`,
            'data-app': 'multimedia',
            'data-max-retries': '0'
          }
        },
        '\n',
        '  ',
        {
          tag: 'script',
          content: 'var pp_gemius_identifier = ".Xo1liMCXdJyp7UhwiFe86QO7A8ugGwFNPCgtiaHpO3..7"; var pp_gemius_extraparameters = ["lan=NL", "key=Multimedia", "subs=undefined"]'
        },
        '\n',
        '  ',
        {
          tag: 'script',
          attrs: {
            async: 'async',
            defer: 'defer',
            src: 'https://gabe.hit.gemius.pl/xgemius.js'
          }
        },
        '\n',
        '  ',
        {
          tag: 'script',
          content: [
              `window.tentacles = { apiToken: "znyyzfby6ed32fm95gam6pzehhyaeztd" };`,
              `window.smartocto_data = {`,
              `  authors: "${config.meta.authors.map(author => author.name).join(',')}",`,
              `  sections: "Multimedia",`,
              `  creationDate: "${config.meta.published}T00:00:00+02:00"`,
              `};`,
              `var _ain = {`,
              `  id: "2536",`,
              `  postid: "${config.directory}",`,
              `  maincontent: "h1, .body__content",`,
              `  title: "${config.meta.titleStripped}",`,
              `  pubdate: "${config.meta.published}T00:00:00+02:00",`,
              `  authors: "${config.meta.authors.map(author => author.name).join(',')}",`,
              `  sections: "Multimedia",`,
              `  tags: "multimedia",`,
              `  access_level: "free",`,
              `  reader_type: "anonymous",`,
              `  article_type: "article"`,
              `};`
            ]
            .map(l => `\n    ${l}`)
            .join('')
            .concat(`\n  `)
        },
        '\n',
        '  ',
        {
          tag: 'script',
          attrs: {
            async: 'async',
            src: 'https://tentacles.smartocto.com/ten/tentacle.js'
          }
        },
        '\n ',
        ' ',
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
            async: 'async',
            src: 'https://d7d3cf2e81d293050033-3dfc0615b0fd7b49143049256703bfce.ssl.cf1.rackcdn.com/stf.js'
          }
        },
        '\n'
      ])
      return head
    })

    tree.match({ tag: 'body' }, function (body) {
      body.content.push([
        '  ',
        {
          tag: 'script',
          content: `!function (e, a, t, n, c, o, s) { e.GoogleAnalyticsObject = c, e[c] = e[c] || function () { (e[c].q = e[c].q || []).push(arguments) }, e[c].l = 1 * new Date, o = a.createElement(t), s = a.getElementsByTagName(t)[0], o.async = 1, o.src = n, s.parentNode.insertBefore(o, s) }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-1529441-${site.ga}", "auto"), ga("send", "pageview")`
        }
      ])
      return body
    })

    return tree
  }
}