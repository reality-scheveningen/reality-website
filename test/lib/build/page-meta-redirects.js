const test = require('tape')
const pageMetaRedirects = require('../../../lib/build/page-meta-redirects')

test('add redirects as html pages (meta redirects)', assert => {
  const obj = {
    config: {
      sitePath: __dirname,
      baseUrl: 'http://example.com'
    },
    pages: [
      {'title': 'existing page'}
    ],
    redirects: require('./legacy.json').redirects
  }

  const result = pageMetaRedirects(obj)

  assert.same(result.config, obj.config, 'Config should not be altered')

  assert.equal(result.pages[1].redirect, 'http://example.com/new-page', 'First page redirect should be set')
  assert.equal(result.pages[1].template, 'redirect', 'First page template should be set as redirect')
  assert.equal(result.pages[1].route, '/some-legacy-page-1/', 'First page route should be set')

  assert.equal(result.pages[2].redirect, 'http://example.com/new-page', 'Second page redirect should be set')
  assert.equal(result.pages[2].template, 'redirect', 'Second page template should be set as redirect')
  assert.equal(result.pages[2].route, '/some-legacy-page-2/', 'Second page route should be set')

  assert.equal(obj.pages[0].title, 'existing page', 'Other pages still exist')

  assert.end()
})
