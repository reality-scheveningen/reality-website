let test = require('tape'),
  loadDatabase = require('../../../lib/sync/load-database');

test('loads database', assert => {
  const e = {
    config: {
      databasePath: `${__dirname}/database.json`
    }
  };

  loadDatabase(e);

  assert.equal(true, e.db.entries instanceof Array, 'Database is loaded');

  assert.end();
});

test('empty object when database file not yet exists', assert => {
  const e = {
    config: {
      databasePath: `${__dirname}/not-exists.json`
    }
  };

  loadDatabase(e);

  assert.same({}, e.db, 'Empty database fallback');

  assert.end();
});
