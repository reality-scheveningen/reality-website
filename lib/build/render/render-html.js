let pug = require('pug'),
  promisify = require('es6-promisify');

module.exports = exports = function (e) {
  return promisify(pug.renderFile)(`${e.page.sitePath}/templates/${e.page.template}.pug`, e.page)
    .then(data => {
      e.html = data;

      return e
    });
};
