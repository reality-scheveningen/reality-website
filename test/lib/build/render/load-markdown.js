const test = require('tape')
const loadMarkdown = require('../../../../lib/build/render/load-markdown')

test('loads markdown', assert => {
  const e = {
    page: {
      template: 'page',
      baseUrl: 'http://example.com'
    }
  }

  loadMarkdown(e)

  assert.equal(
    e.page.md('# Test'),
    '<h1 id="test">Test</h1>' + '\n',
    'markdown transformed to html'
  )

  assert.end()
})

test('not load markdown on redirect pages', assert => {
  const e = {
    page: {
      template: 'redirect'
    }
  }

  loadMarkdown(e)

  assert.equal(e.page.md, undefined, 'Nope, no markdown loaded')
  assert.end()
})
