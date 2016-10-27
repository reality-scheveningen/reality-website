const transformer = require('../contentful-locale-transformer')
const _ = require('lodash')

module.exports = exports = function (contentTypeId, templateName, path = null) {
  return function (e) {
    const entry = transformer(
      _.find(e.db.entries, {sys: {contentType: {sys: {id: contentTypeId}}}}).fields,
      'nl-NL'
    )

    entry.template = templateName

    e.pages = e.pages || []

    entry.route = path || `/${entry.path}/`

    e.pages.push(entry)

    return e
  }
}
