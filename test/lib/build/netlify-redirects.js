const test = require('tape')
const proxyquire = require('proxyquire').noCallThru()

test('render redirects in netlify compatible file', assert => {
  const obj = {
    config: {
      publicPath: 'some/path'
    },
    redirects: require('./legacy.json').redirects
  }

  let called = false

  const netlifyRedirects = proxyquire('../../../lib/build/netlify-redirects', {
    'fs-extra': {
      outputFileSync: (path, data) => {
        assert.equals(path, 'some/path/_redirects')
        assert.equals(
          data,
          `/some-legacy-page-1  /new-page\n` +
          `/some-legacy-page-2  /new-page\n`
        )

        called = true
      }
    }
  })

  netlifyRedirects(obj)

  assert.equal(called, true)
  assert.end()
})
