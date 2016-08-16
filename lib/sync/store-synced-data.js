
function upsertItem (db, type, item) {
  if (db.get(type).find({'sys': {'id': item.sys.id}}).value()) {
    db.get(type).find({'sys': {'id': item.sys.id}}).merge(item).value()
  } else {
    db.get(type).push(item).value()
  }
}

function upsertItems (db, type, items) {
  items.forEach(item => { upsertItem(db, type, item) })
}

function deleteItem (db, type, item) {
  db.get(type).remove({'sys': {'id': item.sys.id}}).value()
}

function deleteItems (db, type, items) {
  items.forEach(item => { deleteItem(db, type, item) })
}

module.exports = exports = function (e) {
  if (e.config.fullSync) {
    e.database.set('entries', e.sync.entries).value()
    e.database.set('assets', e.sync.assets).value()
  } else {
    upsertItems(e.database, 'entries', e.sync.entries)
    deleteItems(e.database, 'entries', e.sync.deletedEntries)

    upsertItems(e.database, 'assets', e.sync.assets)
    deleteItems(e.database, 'assets', e.sync.deletedAssets)
  }

  e.database.set('sync-token', e.sync.nextSyncToken).value()

  e.database.write()

  e.stored = true

  return e
}
