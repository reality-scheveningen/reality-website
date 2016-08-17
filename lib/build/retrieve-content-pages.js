const transformer = require('../contentful-locale-transformer')
const _ = require('lodash')

module.exports = exports = function (e) {
  e.pages = e.pages || {}

  _.filter(e.db.entries, {sys: {contentType: {sys: {id: 'page'}}}}).forEach(entry => {
    const page = transformer(entry.fields, 'nl-NL')

    if (!page.path) {
      return
    }

    page.template = 'content'

    const route = `/${page.path}/`

    e.pages[route] = page
  })

  return e
}
