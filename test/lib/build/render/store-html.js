let test = require('tape')
let proxyquire = require('proxyquire').noCallThru()

test('stores the rendered html', assert => {
  let e = {
    page: {
      publicPath: 'public/path'
    },
    html: 'HTML5 Rocks!',
    route: '/some-where/'
  }

  let called = false
  const storeHtml = proxyquire('../../../../lib/build/render/store-html', {
    'fs-extra': {
      outputFile: (path, data, cb) => {
        assert.equal('public/path/some-where/index.html', path)
        assert.equal('HTML5 Rocks!', data)

        called = true

        cb()
      }
    }
  })

  const result = storeHtml(e)

  result.then(res => {
    assert.equal(true, called, 'Rendered HTML stored')
    assert.equal('public/path/some-where/index.html', res.renderPath)

    assert.end()
  }).catch(err => {
    assert.fail('Promise failed with: ' + err)

    assert.end()
  })
})
