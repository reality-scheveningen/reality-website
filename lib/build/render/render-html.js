let pug = require('pug');

module.exports = exports = function (e) {
  e.html = pug.renderFile(`${e.page.sitePath}/templates/${e.page.template}.pug`, e.page);

  return e;
};
