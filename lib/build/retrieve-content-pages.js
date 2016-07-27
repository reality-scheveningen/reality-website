let transformer = require('../contentful-locale-transformer');

module.exports = exports = function (e) {
  e.pages = e.pages || {};

  e.database.get('entries').filter({sys : { contentType : { sys: {id : 'page'}}}}).value().forEach((entry) => {
    let page = transformer(entry.fields, 'nl-NL');

    if (!page.path) {
      return;
    }

    page.template = 'content';

    let route = `/${page.path}/`;

    e.pages[route] = page;
  });

  return e;
};
