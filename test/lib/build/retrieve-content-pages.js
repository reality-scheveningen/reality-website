const test = require('tape')
const retrieveContentPages = require('../../../lib/build/retrieve-content-pages')

test('retrieves content pages from database and creates page objects', assert => {
  const e = {}

  e.db = require('../database.json')

  retrieveContentPages('page', 'content')(e)

  assert.same(
    e.pages[0],
    {
      title: 'Page 1',
      path: 'page-1',
      template: 'content',
      route: '/page-1/'
    },
    'Has page 1 with route, transformed fields and template content'
  )

  assert.same(
    e.pages[1],
    {
      title: 'Page 2',
      path: 'page-2',
      template: 'content',
      route: '/page-2/'
    },
    'Has page 2 with route, transformed fields and template content'
  )

  assert.equal(Object.keys(e.pages).length, 2, 'Retrieved exactly 2 pages')

  assert.end()
})
