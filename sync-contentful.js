require('dotenv').config({silent: true});

let contentful = require('contentful'),
  _ = require('lodash'),
  download = require('download'),
  url = require('url'),
  path = require('path'),
  rimraf = require('rimraf'),
  fs = require('fs-extra'),
  imagemin = require('imagemin'),
  imageminPlugins = ['gifsicle','jpegtran','optipng','svgo'].map(x => {return require(`imagemin-${x}`)();}),
  alwaysFullSync = process.env.CONTENTFUL_FULL_SYNC || false,
  assetFolder = 'public/content/assets/';

let client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_API_KEY
});

fs.ensureFileSync('public/content/db.json');

let db = require('lowdb')('public/content/db.json', { writeOnChange: false });

let upsertItem = (type, item) => {
  if (db.get(type).find({"sys" : {"id": item.sys.id}}).value()) {
    db.get(type).find({"sys" : {"id": item.sys.id}}).merge(item).value();
  } else {
    db.get(type).push(item).value();
  }
};

let upsertItems = (type, items) => {
  items.forEach(item => { upsertItem(type, item); });
};

let deleteItem = (type, item) => {
  db.get(type).remove({"sys": {"id": item.sys.id}}).value();
};

let deleteItems = (type, items) => {
  items.forEach(item => { deleteItem(type, item); })
};

let downloadAssets = (assets) => {
  Promise.all(
    _.flatten(
      assets.map(
        asset => {
          const items = [];
          _.forEach(asset.fields.file, file => {
            const localPath = url.parse('https:' + file.url).pathname;

            items.push(
              download(
                'https:' + file.url,
                assetFolder + path.dirname(localPath)
              )
            );
          });

          return items;
        }
      )
    )
  ).then(
    (items) => {

      let minifyitems = _.flatten(
        assets.map(asset => {
          const files = [];

          _.forEach(asset.fields.file, file => {
            files.push(assetFolder + url.parse('https:' + file.url).pathname);
          });

          return files;
        })
      )
      .filter(item => {
        return ['.jpg', '.png', '.gif', '.jpeg', '.JPG', '.JPEG', '.svg', '.SVG'].indexOf(path.extname(item)) != -1;
      });

      console.log(`Compressing ${minifyitems.length} items`);
      minifyitems.forEach(item => {
        imagemin([item], path.dirname(item), {plugins: imageminPlugins}).then(file => {
          console.log(`Compressing ${file[0].path}`);
        }, err => {throw err;})
      });

      console.log('Download complete');
    },
    (err) => {
      throw err;
    }
  );
};

const incrementalSync = (syncToken) => {
  client
    .sync({nextSyncToken: syncToken})
    .then(
      (response) => {

        upsertItems('entries', response.entries);

        upsertItems('assets', response.assets);
        downloadAssets(response.assets);

        deleteItems('entries', response.deletedEntries);

        deleteItems('assets', response.deletedAssets);

        // write sync token
        db.set('sync-token', response.nextSyncToken).value();

        db.write();

        console.log(`Upserted ${response.entries.length} entries`);
        console.log(`Upserted ${response.assets.length} assets`);
        console.log(`Deleted ${response.deletedEntries.length} entries`);
        console.log(`Deleted ${response.deletedAssets.length} assets`);
      },
      (err) => {
        throw err;
      }
    )
};

const fullSync = () => {
  client.sync({initial: true})
    .then(
      (response) => {
        db.set('entries', response.entries).value();

        rimraf.sync(assetFolder);
        downloadAssets(response.assets);

        db.set('assets', response.assets).value();
        db.set('sync-token', response.nextSyncToken).value();

        db.write();

        console.log(`Inserted ${response.entries.length} entries`);
        console.log(`Inserted and downloading ${response.assets.length} assets`);
      },
      (err) => {
        throw err;
      }
    );
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
