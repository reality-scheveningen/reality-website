let url = require('url')
let md = require('markdown-it')
let pluginEmoji = require('markdown-it-emoji')
let pluginAnchor = require('markdown-it-anchor')
let pluginExternalLinks = require('markdown-it-external-links')

module.exports = exports = function (e) {
  if (e.page.template === 'redirect') {
    return e
  }

  let markdownIt = md({
    html: true,
    linkify: true,
    typographer: true
  }).use(pluginEmoji)
    .use(pluginAnchor)
    .use(pluginExternalLinks, {
      internalDomains: [url.parse(e.page.baseUrl).hostname],
      externalTarget: '_blank'
    })

  e.page.md = (val) => {
    return markdownIt.render(val)
  }

  return e
}
