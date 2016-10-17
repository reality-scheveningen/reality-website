const transformer = require('../contentful-locale-transformer')
const _ = require('lodash')

module.exports = exports = function (contentTypeId, templateName) {
  return function (e) {
    e.pages = e.pages || {}

    _.filter(e.db.entries, {sys: {contentType: {sys: {id: contentTypeId}}}}).forEach(entry => {
      const page = transformer(entry.fields, 'nl-NL')

      if (!page.path) {
        return
      }

      page.template = templateName

      const route = `/${page.path}/`

      e.pages[route] = page
    })

    return e
  }
}
