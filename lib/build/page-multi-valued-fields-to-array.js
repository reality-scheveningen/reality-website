const _ = require('lodash')

module.exports = exports = function (e) {
  _.forEach(e.pages, (page) => {
    // find multivalued items, ie bodyText1, bodyText2
    const multiValuedFields = {}

    _.forEach(page, (val, key) => {
      if (/\d+$/.test(key)) {
        const baseName = key.replace(/\d+$/, '')

        ;(multiValuedFields[baseName] || (multiValuedFields[baseName] = [])).push(key)
      }
    })

    // iterate over the found multiValued fields and map values to basename on the page
    _.forEach(multiValuedFields, (originalKeys, baseKey) => {
      if (!page[baseKey]) {
        page[baseKey] = _.map(originalKeys.sort(), (key) => {
          return page[key]
        })
      }
    })
  })

  return e
}
