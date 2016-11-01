const test = require('tape')
const determineSyncStrategy = require('../../../lib/sync/determine-sync-strategy')

test('ensure full sync when no sync token', assert => {
  const e = {
    config: {},
    db: {}
  }

  const result = determineSyncStrategy(e)

  assert.equal(result.config.fullSync, true)
  assert.end()
})
