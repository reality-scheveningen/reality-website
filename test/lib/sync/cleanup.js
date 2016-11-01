const test = require('tape')
const proxyquire = require('proxyquire')

test('cleans up on full sync', assert => {
  const e = {
    config: {
      fullSync: true,
      assetPath: 'some/path'
    }
  }

  let called = false

  const cleanup = proxyquire('../../../lib/sync/cleanup', {
    rimraf: (path, cb) => {
      assert.equal(path, e.config.assetPath)
      called = true
      cb()
    }
  })

  const result = cleanup(e)

  result.then(res => {
    assert.equal(called, true)

    assert.end()
  }).catch(err => {
    assert.fail('Promise failed with: ' + err)

    assert.end()
  })
})

test('no cleanup when partial sync', assert => {
  const e = {
    config: {
      fullSync: false,
      assetPath: 'some/path'
    }
  }

  let called = false

  const cleanup = proxyquire('../../../lib/sync/cleanup', {
    rimraf: (path, cb) => {
      called = true
      cb()
    }
  })

  const result = cleanup(e)

  assert.equal(called, false)
  assert.same(result, e)

  assert.end()
})
