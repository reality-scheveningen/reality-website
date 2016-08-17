const test = require('tape')
const proxyquire = require('proxyquire')

testStoreSyncedData(
  'empty full sync with empty database',
  true,
  {},
  {
    entries: [],
    assets: [],
    deletedEntries: [],
    deletedAssets: [],
    nextSyncToken: 'some-sync-key'
  },
  {
    entries: [],
    assets: [],
    'sync-token': 'some-sync-key'
  }
)

testStoreSyncedData(
  'empty full sync with initial data',
  true,
  {
    entries: [{title: 'some entry'}],
    assets: [{title: 'some asset'}]
  },
  {
    entries: [],
    assets: [],
    deletedEntries: [],
    deletedAssets: [],
    nextSyncToken: 'some-sync-key'
  },
  {
    entries: [],
    assets: [],
    'sync-token': 'some-sync-key'
  }
)

testStoreSyncedData(
  'partial sync',
  false,
  {
    entries: [
      {sys: {id: 'some-id'}, title: 'Some entry title that MUST be updated'},
      {sys: {id: 'some-other-id'}, title: 'Some entry title that must NOT be updated'},
      {sys: {id: 'some-id-to-be-delete'}, title: 'Some entry title that must be DELETED'}
    ],
    assets: [
      {sys: {id: 'some-id'}, title: 'Some asset title that MUST be updated'},
      {sys: {id: 'some-other-id'}, title: 'Some asset title that must NOT be updated'},
      {sys: {id: 'some-id-to-be-delete'}, title: 'Some asset title that must be DELETED'}
    ]
  },
  {
    entries: [
      {sys: {id: 'some-id'}, title: 'Some entry title that IS updated'},
      {sys: {id: 'some-new-id'}, title: 'Some new entry title'}
    ],
    assets: [
      {sys: {id: 'some-id'}, title: 'Some asset title that IS updated'},
      {sys: {id: 'some-new-id'}, title: 'Some new asset title'}
    ],
    deletedEntries: [
      {sys: {id: 'some-id-to-be-delete'}, title: 'Some entry title that must be DELETED'}
    ],
    deletedAssets: [
      {sys: {id: 'some-id-to-be-delete'}, title: 'Some asset title that must be DELETED'}
    ],
    nextSyncToken: 'some-sync-key'
  },
  {
    entries: [
      {sys: {id: 'some-id'}, title: 'Some entry title that IS updated'},
      {sys: {id: 'some-other-id'}, title: 'Some entry title that must NOT be updated'},
      {sys: {id: 'some-new-id'}, title: 'Some new entry title'}
    ],
    assets: [
      {sys: {id: 'some-id'}, title: 'Some asset title that IS updated'},
      {sys: {id: 'some-other-id'}, title: 'Some asset title that must NOT be updated'},
      {sys: {id: 'some-new-id'}, title: 'Some new asset title'}
    ],
    'sync-token': 'some-sync-key'
  }
)

function testStoreSyncedData (description, fullSync, initialDb, sync, expectedDb) {
  test(`store synced data: ${description}`, assert => {
    let called = false

    const e = {
      config: {
        databasePath: 'some/path/db.json',
        fullSync: fullSync
      },
      db: initialDb,
      sync: sync
    }

    const storeSyncedData = proxyquire('../../../lib/sync/store-synced-data', {
      'write-json-file': (path, db) => {
        assert.equal(e.config.databasePath, path)
        assert.same(expectedDb, db)
        called = true
        return Promise.resolve()
      }
    })

    const result = storeSyncedData(e)

    result.then(res => {
      assert.equal(true, called)
      assert.same(expectedDb, res.db)

      assert.end()
    }).catch(err => {
      assert.fail(`Promise with failed with: ${err}`)

      assert.end()
    })
  })
}
