let rimraf = require('rimraf');

module.exports = exports = function (e) {
  if (e.config.fullSync) {
    rimraf.sync(e.config.assetPath);
  }

  return e;
};
