const cheerio = require('cheerio')
const URL = require('url')

module.exports = exports = function (e) {
  if (e.page.template === 'redirect') {
    return e
  }

  // replace all contentful links to local versions
  e.html = e.html.replace(/\/\/\w+\.(contentful\.com|ctfassets\.net)\//g, '/content/assets/')

  // server side rendering of embedly cards
  const $ = cheerio.load(e.html)
  $('.embedly-card').each(function (_, el) {
    const href = $(el).attr('href')
    const url = URL.parse(href)
    if (url.hostname === 'www.youtube.com') {
      const youtubeId = url.pathname.split('/').filter(Boolean).pop()
      // CSS only iframe scaling https://stackoverflow.com/a/20130011/4117816
      $(el).replaceWith($(`<div style="position:relative;padding-top: 56%;">
        <iframe width="560" height="315" style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`))
    }
  })

  e.html = $.html()

  return e
}
