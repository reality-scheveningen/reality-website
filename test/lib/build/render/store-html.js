const test = require('tape')
const proxyquire = require('proxyquire').noCallThru()

test('stores the rendered html', assert => {
  const e = {
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
        assert.equal(path, 'public/path/some-where/index.html')
        assert.equal(data, 'HTML5 Rocks!')

        called = true

        cb()
      }
    }
  })

  const result = storeHtml(e)

  result.then(res => {
    assert.equal(called, true, 'Rendered HTML stored')
    assert.equal(res.renderPath, 'public/path/some-where/index.html')

    assert.end()
  }).catch(err => {
    assert.fail('Promise failed with: ' + err)

    assert.end()
  })
})
