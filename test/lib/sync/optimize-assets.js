const test = require('tape')
const proxyquire = require('proxyquire')

test('optimize downloaded assets', assert => {
  const e = {
    images: [
      {
        remotePath: 'https://some-cdn/some/path/some-asset.jpg',
        localPath: '/some/path/some-asset.jpg',
        targetFolder: '/local/assets/some/path',
        absolutePath: '/local/assets/some/path/some-asset.jpg'
      }
    ]
  }

  let called = false

  const optimizeAssets = proxyquire('../../../lib/sync/optimize-assets', {
    imagemin: (input, output, options) => {
      assert.same(input, ['/local/assets/some/path/some-asset.jpg'])
      assert.equal(output, '/local/assets/some/path')
      assert.equal(options.plugins instanceof Array, true)
      assert.equal(options.plugins.length > 0, true)

      called = true

      return Promise.resolve()
    }
  })

  const result = optimizeAssets(e)

  result.then(res => {
    assert.equal(called, true)

    assert.end()
  }).catch(err => {
    assert.fail(`Promise failed with ${err}`)
    assert.end()
  })
})
