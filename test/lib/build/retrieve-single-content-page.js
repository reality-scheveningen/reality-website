const test = require('tape')
const retrieveSingleContentPage = require('../../../lib/build/retrieve-single-content-page')

test('retrieves single content page from database and creates page object', assert => {
  const e = {
    pages: []
  }

  e.db = require('../database.json')

  retrieveSingleContentPage('homepage', 'home', '/')(e)

  assert.same(
    e.pages[0],
    {
      title: 'Example homepage title',
      template: 'home',
      route: '/'
    },
    'Has page with route / with transformed fields and template home'
  )

  assert.end()
})
