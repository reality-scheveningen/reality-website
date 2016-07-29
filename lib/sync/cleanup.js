let rimraf = require('rimraf'),
  promisify = require('es6-promisify');

module.exports = exports = function (e) {
  if (!e.config.fullSync) {
    return e;
  }

  return promisify(rimraf)(e.config.assetPath)
    .then(() => e);
};
