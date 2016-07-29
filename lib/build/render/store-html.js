let fs = require('fs-extra'),
  promisify = require('es6-promisify');

module.exports = exports = function (e) {
  e.renderPath = `${e.page.publicPath}${e.route}index.html`;

  return promisify(fs.outputFile)(e.renderPath, e.html)
    .then(() => e);
};
