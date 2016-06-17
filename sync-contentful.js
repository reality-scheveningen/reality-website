require('dotenv').config({silent: true});

let contentful = require('contentful'),
  _ = require('lodash'),
  db = require('lowdb')('public/db/db-test.json', { writeOnChange: false }),
  alwaysFullSync = process.env.CONTENTFUL_FULL_SYNC || false;

let client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_API_KEY
});

let updateItem = (type, item) => {
  db.get(type).find({"sys" : {"id": item.sys.id}}).assign(item).value();
};

let deleteItem = (type, item) => {
  db.get(type).remove({"sys": {"id": item.sys.id}}).value();
};

const incrementalSync = (syncToken) => {
  client
    .sync({nextSyncToken: syncToken})
    .then((response) => {
      // update entries
      _(response.entries).forEach((entry) => {
        updateItem('entries', entry);
      });

      // update assets
      _(response.entries).forEach((asset) => {
        updateItem('assets', asset);
      });

      // deleted entries
      _(response.deletedEntries).forEach((entry) => {
        deleteItem('entries', entry);
      });

      // deleted assets
      _(response.deletedAssets).forEach((asset) => {
        deleteItem('assets', asset);
      });

      // write sync token
      db.set('sync-token', response.nextSyncToken).value();

      db.write();
    })
};

const fullSync = () => {
  client.sync({initial: true})
    .then((response) => {
      db.set('entries', response.entries).value();
      db.set('assets', response.assets).value();
      db.set('sync-token', response.nextSyncToken).value();

      db.write();
    });
};

if (alwaysFullSync || !db.has('sync-token').value()) {
  console.log('Syncing everything!');
  fullSync();
} else {
  console.log('Incremental sync!');
  incrementalSync(
    db.get('sync-token').value()
  );
}
