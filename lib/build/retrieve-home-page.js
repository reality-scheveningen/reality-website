const transformer = require('../contentful-locale-transformer')
const _ = require('lodash')

module.exports = exports = function (e) {
  const entry = transformer(
    _.find(e.db.entries, {sys: {contentType: {sys: {id: 'homepage'}}}}).fields,
    'nl-NL'
  )

  entry.template = 'home'

  e.pages = e.pages || {}

  e.pages['/'] = entry

  return e
}
