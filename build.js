require('dotenv').config({silent: true});

console.log('Building...');

let App = require('./lib/app'),
  db = require('./public/db/entries.json'),
  app = new App({
    env: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL,
    gaTrackingCode: process.env.GA_TRACKING_CODE
  });

db.forEach((entry) => {
  if (entry.sys.contentType.sys.id == 'homepage') {
    app.render('/', () => {
      entry.fields.template = 'home';

      return entry.fields;
    });
  } else if (entry.sys.contentType.sys.id == 'page' && entry.fields.path) {
    let path = '/' + entry.fields.path['nl-NL'] + '/';
    app.render(path, () => {
      entry.fields.template = 'content';

      return entry.fields;
    });
  }
});

console.log('done');
