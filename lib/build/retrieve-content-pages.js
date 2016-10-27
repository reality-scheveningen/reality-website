const transformer = require('../contentful-locale-transformer')
const _ = require('lodash')
const readingTime = require('reading-time')

module.exports = exports = function (contentTypeId, templateName, routePrefix = null) {
  return function (e) {
    e.pages = e.pages || []

    _.filter(e.db.entries, {sys: {contentType: {sys: {id: contentTypeId}}}}).forEach(entry => {
      const page = transformer(entry.fields, 'nl-NL')

      if (!page.path) {
        return
      }

      if (page.bodyText) {
        page.readingTime = Math.ceil(readingTime(page.bodyText).minutes)
      }

      page.template = templateName

      page.route = routePrefix ? `/${routePrefix}/${page.path}/` : `/${page.path}/`

      e.pages.push(page)
    })

    return e
  }
}
