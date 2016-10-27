const _ = require('lodash')

module.exports = function (e) {
  const storyPage = _.find(e.pages, {route: '/stories/'})

  if (!storyPage) {
    return
  }

  storyPage.stories = _.orderBy(
    _.filter(e.pages, (page) => {
      return /\/stories\/.+/.test(page.route)
    }),
    ['date'],
    ['desc']
  )

  return e
}
