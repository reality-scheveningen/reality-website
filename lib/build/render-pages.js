const _ = require('lodash')
const loadMarkDown = require('./render/load-markdown')
const loadMoment = require('./render/load-moment')
const renderHtml = require('./render/render-html')
const filterHtml = require('./render/filter-html')
const storeHtml = require('./render/store-html')
const loadImageSizeSelector = require('./render/load-image-size-selector')

module.exports = exports = function (e) {
  return Promise.all(
    _.map(e.pages, (page) => {
      return Promise.resolve({route: page.route, page: page})
        .then(val => {
          _.merge(val.page, e.config)

          val.page.canonicalUrl = _.trimEnd(val.page.baseUrl, '/') + val.route
          val.page.styleClass = val.route.split('/')[1]

          if (val.page.jsonLd && val.page.jsonLd instanceof Array === false) {
            val.page.jsonLd = [val.page.jsonLd]
          }

          val.page.pretty = val.page.env === 'dev'
          val.page.debugData = JSON.stringify(val.page)

          return val
        })
        .then(loadMarkDown)
        .then(loadMoment)
        .then(loadImageSizeSelector)
        .then(renderHtml)
        .then(filterHtml)
        .then(storeHtml)
    })
  ).then(() => e)
}
