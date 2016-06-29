require('dotenv').config({silent: true});

console.log('Building...');

let App = require('./lib/app'),
  db = require('lowdb')('public/content/db.json', { writeOnChange: false }),
  legacy = require('lowdb')('site/legacy.json', { writeOnChange: false }),
  app = new App({
    env: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL,
    gaTrackingCode: process.env.GA_TRACKING_CODE
  });

// render homepage
app.render('/', () => {
  const entry = db.get('entries').find({sys : { contentType : { sys: {id : 'homepage'}}}}).value();

  entry.fields.template = 'home';

  return entry.fields;
});

// render legacy redirects (we should remove this somewhere in 2017)
legacy.get('redirects').value().forEach(redirect => {
  let path = redirect.source + '/';
  app.render(path, () => {
    return {
      template: 'redirect',
      redirect: app.options.baseUrl + redirect.target
    };
  })
});

// render pages
db.get('entries').filter({sys : { contentType : { sys: {id : 'page'}}}}).value().forEach((entry) => {
  if (entry.fields.path) {
    let path = '/' + entry.fields.path['nl-NL'] + '/';
    app.render(path, () => {
      entry.fields.template = 'content';

      return entry.fields;
    });
  }
});

console.log('done');
