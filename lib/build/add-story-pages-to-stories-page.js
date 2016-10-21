const _ = require('lodash')

module.exports = function (e) {
  const storyPage = e.pages['/stories/'] || false

  if (!storyPage) {
    return
  }

  storyPage.stories = {}

  _.forIn(e.pages, (page, route) => {
    if (/\/stories\/.+/.test(route)) {
      storyPage.stories[route] = page
    }
  })

  return e
}
