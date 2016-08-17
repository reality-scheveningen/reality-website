const url = require('url')
const md = require('markdown-it')
const pluginEmoji = require('markdown-it-emoji')
const pluginAnchor = require('markdown-it-anchor')
const pluginExternalLinks = require('markdown-it-external-links')

module.exports = exports = function (e) {
  if (e.page.template === 'redirect') {
    return e
  }

  const markdownIt = md({
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
