const test = require('tape')
const filterHtml = require('../../../../lib/build/render/filter-html')

test('filters html', assert => {
  const e = {
    html: '<a href="//assets.contentful.com/images/example.jpg">Example<a>',
    page: {
      template: 'page'
    }
  }

  filterHtml(e)

  assert.equal(
    '<a href="/content/assets/images/example.jpg">Example<a>',
    e.html,
    'replaced contful.com assets links to local ones'
  )
  assert.end()
})

test('does not filter html on redirect html pages', assert => {
  const e = {
    html: '<a href="//assets.contentful.com/images/example.jpg">Example<a>',
    page: {
      template: 'redirect'
    }
  }

  filterHtml(e)

  assert.equal(
    '<a href="//assets.contentful.com/images/example.jpg">Example<a>',
    e.html,
    'not replaced contenful.com links'
  )
  assert.end()
})
