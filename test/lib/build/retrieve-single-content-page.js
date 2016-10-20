const test = require('tape')
const retrieveSingleContentPage = require('../../../lib/build/retrieve-single-content-page')

test('retrieves single content page from database and creates page object', assert => {
  const e = {}

  e.db = require('../database.json')

  retrieveSingleContentPage('homepage', 'home', '/')(e)

  assert.same(
    {
      title: 'Example homepage title',
      template: 'home'
    },
    e.pages['/'],
    'Has page with route / with transformed fields and template home'
  )

  assert.end()
})
