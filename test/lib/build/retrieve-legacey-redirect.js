const test = require('tape')
const legacyRedirects = require('../../../lib/build/retrieve-legacy-redirects')

test('retrieve legacy redirects as pages', assert => {
  const obj = {
    config: {
      sitePath: __dirname,
      baseUrl: 'http://example.com'
    },
    pages: [
      {'title': 'existing page'}
    ]
  }

  const result = legacyRedirects(obj)

  assert.same(obj.config, result.config, 'Config should not be altered')

  assert.equal('http://example.com/new-page', result.pages[1].redirect, 'First page redirect should be set')
  assert.equal('redirect', result.pages[1].template, 'First page template should be set as redirect')
  assert.equal('/some-legacy-page-1/', result.pages[1].route, 'First page route should be set')

  assert.equal('http://example.com/new-page', result.pages[2].redirect, 'Second page redirect should be set')
  assert.equal('redirect', result.pages[2].template, 'Second page template should be set as redirect')
  assert.equal('/some-legacy-page-2/', result.pages[2].route, 'Second page route should be set')

  assert.equal('existing page', obj.pages[0].title, 'Other pages still exist')

  assert.end()
})
