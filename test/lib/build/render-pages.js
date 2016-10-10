const test = require('tape')
const proxyquire = require('proxyquire')

test('rendering pages', assert => {
  const e = {
    config: {
      baseUrl: 'http://localhost',
      env: 'test',
      example: 'jup'
    },
    pages: {
      '/': {
        data: 'some data',
        jsonLd: {some: 'data'}
      }
    }
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
    const page = res.pages['/']

    assert.equal('http://localhost/', page.canonicalUrl, 'Canonical url is set')
    assert.equal(false, page.pretty, 'Only pretty print in dev env')
    assert.equal(true, typeof page.debugData === 'string', 'There is some debug data')
    assert.same([{some: 'data'}], page.jsonLd, 'Ensure JSON+LD data to be collection (array)')

    assert.equal(true, called['load-markdown'], 'Markdown loaded')
    assert.equal(true, called['render-html'], 'Html rendered')
    assert.equal(true, called['filter-html'], 'Html filtered')
    assert.equal(true, called['store-html'], 'Html stored')

    assert.end()
  }).catch(err => {
    assert.fail('Promise failed: ' + err)

    assert.end()
  })
})
