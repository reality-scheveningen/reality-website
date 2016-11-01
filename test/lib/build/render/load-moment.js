const test = require('tape')
const loadMoment = require('../../../../lib/build/render/load-moment')

test('loads moment', assert => {
  const e = {
    page: {
      template: 'page',
      baseUrl: 'http://example.com'
    }
  }

  loadMoment(e)

  assert.equal(
    e.page.moment('1980-01-02', 'MMMM'),
    'januari',
    'moment date formatting available'
  )

  assert.end()
})

test('not load moment on redirect pages', assert => {
  const e = {
    page: {
      template: 'redirect'
    }
  }

  loadMoment(e)

  assert.equal(e.page.moment, undefined, 'Nope, no moment loaded')
  assert.end()
})
