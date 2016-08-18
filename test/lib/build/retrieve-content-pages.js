const test = require('tape')
const retrieveContentPages = require('../../../lib/build/retrieve-content-pages')

test('retrieves content pages from database and creates page objects', assert => {
  const e = {}

  e.db = require('../database.json')

  retrieveContentPages(e)

  assert.same(
    {
      title: 'Page 1',
      path: 'page-1',
      template: 'content'
    },
    e.pages['/page-1/'],
    'Has page 1 with route, transformed fields and template content'
  )

  assert.same(
    {
      title: 'Page 2',
      path: 'page-2',
      template: 'content'
    },
    e.pages['/page-2/'],
    'Has page 2 with route, transformed fields and template content'
  )

  assert.equal(2, Object.keys(e.pages).length, 'Retrieved exactly 2 pages')

  assert.end()
})
