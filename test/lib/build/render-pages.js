const test = require('tape')
const proxyquire = require('proxyquire')

test('rendering pages', assert => {
  const e = {
    config: {
      baseUrl: 'http://localhost',
      env: 'test',
      example: 'jup'
    },
    pages: [
      {
        data: 'some data',
        route: '/',
        jsonLd: {some: 'data'}
      }
    ]
  }

  // create stubs
  const called = {
    'load-markdown': false,
    'render-html': false,
    'filter-html': false,
    'store-html': false
  }

  const renderPages = proxyquire('../../../lib/build/render-pages', {
    './render/load-markdown': ctx => { called['load-markdown'] = true; return ctx },
    './render/render-html': ctx => { called['render-html'] = true; return ctx },
    './render/filter-html': ctx => { called['filter-html'] = true; return ctx },
    './render/store-html': ctx => { called['store-html'] = true; return ctx }
  })

  // perform the action
  const result = renderPages(e)

  // check result
  result.then(res => {
    const page = res.pages[0]

    assert.equal(page.route, '/', 'Route is set')
    assert.equal(page.canonicalUrl, 'http://localhost/', 'Canonical url is set')
    assert.equal(page.pretty, false, 'Only pretty print in dev env')
    assert.equal(typeof page.debugData === 'string', true, 'There is some debug data')
    assert.same(page.jsonLd, [{some: 'data'}], 'Ensure JSON+LD data to be collection (array)')

    assert.equal(called['load-markdown'], true, 'Markdown loaded')
    assert.equal(called['render-html'], true, 'Html rendered')
    assert.equal(called['filter-html'], true, 'Html filtered')
    assert.equal(called['store-html'], true, 'Html stored')

    assert.end()
  }).catch(err => {
    assert.fail('Promise failed: ' + err)

    assert.end()
  })
})
