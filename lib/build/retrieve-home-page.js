let transformer = require('../contentful-locale-transformer');

module.exports = exports = function (e) {
  let entry = transformer(
    e.database.get('entries').find({sys : { contentType : { sys: {id : 'homepage'}}}}).value().fields,
    'nl-NL'
  );

  entry.template = 'home';

  e.pages = e.pages || {};

  e.pages['/'] = entry;

  return e;
};
