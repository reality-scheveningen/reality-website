require('dotenv').config();

let contentful = require('contentful'),
  fs = require('fs-extra');

let client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_API_KEY
});

client.sync({initial: true})
  .then((response) => {
    fs.outputJson('public/db/entries.json', response.entries, (err) => {
      if (err) {
        throw err;
      }
    });
    fs.outputJson('public/db/assets.json', response.assets, (err) => {
      if (err) {
        throw err;
      }
    });
  });
