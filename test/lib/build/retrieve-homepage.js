let test = require('tape')
let retrieveHomepage = require('../../../lib/build/retrieve-home-page')

test('retrieves homepage from database and creates page object', assert => {
  const e = {}

  e.db = require('./database.json')

  retrieveHomepage(e)

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
