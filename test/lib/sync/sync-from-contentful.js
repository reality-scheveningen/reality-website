let test = require('tape')
let proxyquire = require('proxyquire')

test('sync data from contentful', assert => {
  let called = false

  const e = {
    config: {
      contentfulSpace: 'some-space',
      contentfulAccessToken: 'some-access-token',
      fullSync: true
    }
  }

  let contentfulSyncRequestResult = {
    entries: ['an entry'],
    assets: ['an asset'],
    deletedEntries: [],
    deletedAssets: [],
    nextSyncToken: 'next-token'
  }

  let syncFromContentFul = proxyquire('../../../lib/sync/sync-from-contentful', {
    'contentful': {
      'createClient': clientConfig => {
        assert.same({space: e.config.contentfulSpace, accessToken: e.config.contentfulAccessToken}, clientConfig)

        return {
          sync: syncOptions => {
            assert.same({initial: true}, syncOptions)
            called = true

            return Promise.resolve(contentfulSyncRequestResult)
          }
        }
      }
    }
  })

  const result = syncFromContentFul(e)

  result.then(res => {
    assert.equal(true, called)
    assert.same(contentfulSyncRequestResult, res.sync)

    assert.end()
  }).catch(err => {
    assert.fail(`Promise failed with ${err}`)

    assert.end()
  })
})
