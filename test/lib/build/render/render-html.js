const test = require('tape')
const proxyquire = require('proxyquire').noCallThru()

test('renders the html templates', assert => {
  const e = {
    page: {
      sitePath: 'site/path',
      template: 'some-template'
    }
  }

  let called = false
  const renderHtml = proxyquire('../../../../lib/build/render/render-html', {
    'pug': {
      renderFile: (path, data, cb) => {
        assert.equal(path, 'site/path/templates/some-template.pug')
        assert.same(e.page, data)

        called = true

        cb()
      }
    }
  })

  const result = renderHtml(e)

  result.then(res => {
    assert.equal(called, true, 'Pug render file has been called')
    assert.equal(res.hasOwnProperty('html'), true, 'Html has been set')

    assert.end()
  }).catch(err => {
    assert.fail('Promise failed with: ' + err)

    assert.end()
  })
})
