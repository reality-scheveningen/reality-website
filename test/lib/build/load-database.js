const test = require('tape')
const loadDatabase = require('../../../lib/build/load-database')

test('loads database', assert => {
  const e = {
    config: {
      databasePath: `${__dirname}/database.json`
    }
  }

  loadDatabase(e)

  assert.equal(true, e.db.entries instanceof Array, 'Database is loaded')

  assert.end()
})
