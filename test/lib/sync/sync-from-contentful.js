const test = require('tape')
const proxyquire = require('proxyquire')

test('sync data from contentful', assert => {
  let called = false

  const e = {
    config: {
      contentfulSpace: 'some-space',
      contentfulAccessToken: 'some-access-token',
      fullSync: true
    }
  }

  const contentfulSyncRequestResult = {
    entries: ['an entry'],
    assets: ['an asset'],
    deletedEntries: [],
    deletedAssets: [],
    nextSyncToken: 'next-token'
  }

  const syncFromContentFul = proxyquire('../../../lib/sync/sync-from-contentful', {
    'contentful': {
      'createClient': clientConfig => {
        assert.same(clientConfig, {space: e.config.contentfulSpace, accessToken: e.config.contentfulAccessToken})

        return {
          sync: syncOptions => {
            assert.same(syncOptions, {initial: true})
            called = true

            return Promise.resolve(contentfulSyncRequestResult)
          }
        }
      }
    }
  })

  const result = syncFromContentFul(e)

  result.then(res => {
    assert.equal(called, true)
    assert.same(res.sync, contentfulSyncRequestResult)

    assert.end()
  }).catch(err => {
    assert.fail(`Promise failed with ${err}`)

    assert.end()
  })
})
