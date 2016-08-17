const _ = require('lodash')
const writeJsonFile = require('write-json-file')

function upsertItem (db, type, item) {
  let target = _.find(db[type], {'sys': {'id': item.sys.id}})

  if (target) {
    _.merge(target, item)
  } else {
    db[type].push(item)
  }
}

function upsertItems (db, type, items) {
  items.forEach(item => { upsertItem(db, type, item) })
}

function deleteItem (db, type, item) {
  _.remove(db[type], {'sys': {'id': item.sys.id}})
}

function deleteItems (db, type, items) {
  items.forEach(item => { deleteItem(db, type, item) })
}

module.exports = exports = function (e) {
  if (e.config.fullSync) {
    e.db.entries = e.sync.entries
    e.db.assets = e.sync.assets
  } else {
    upsertItems(e.db, 'entries', e.sync.entries)
    deleteItems(e.db, 'entries', e.sync.deletedEntries)

    upsertItems(e.db, 'assets', e.sync.assets)
    deleteItems(e.db, 'assets', e.sync.deletedAssets)
  }

  e.db['sync-token'] = e.sync.nextSyncToken

  return writeJsonFile(e.config.databasePath, e.db).then(() => {
    e.stored = true

    return e
  })
}
