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
      assert.equal(e.config.assetPath, path)
      called = true
      cb()
    }
  })

  const result = cleanup(e)

  result.then(res => {
    assert.equal(true, called)

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

  assert.equal(false, called)
  assert.same(e, result)

  assert.end()
})
