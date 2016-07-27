let
  url = require('url'),
  md = require('markdown-it'),
  pluginEmoji = require('markdown-it-emoji'),
  pluginAnchor = require('markdown-it-anchor'),
  pluginExternalLinks = require('markdown-it-external-links')
;

module.exports = exports = function (e) {
  if (e.page.template === 'redirect') {
    return e;
  }

  let md_it = md({
    html: true,
    linkify: true,
    typographer: true
  }).use(pluginEmoji)
    .use(pluginAnchor)
    .use(pluginExternalLinks, {
        internalDomains: [url.parse(e.page.baseUrl).hostname],
        externalTarget: '_blank'
    })
  ;

  e.page.md = (val) => {
    return md_it.render(val);
  };

  return e;
};
