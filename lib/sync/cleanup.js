let rimraf = require('rimraf');

module.exports = exports = function (e) {
  return rimraf(e.config.assetPath)
    .then(() => e);
};
