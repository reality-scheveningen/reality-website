let fs = require('fs-extra');

module.exports = exports = function (e) {
  e.renderPath = `${e.page.publicPath}${e.route}index.html`;

  fs.outputFile(e.renderPath, e.html, (err) => {
    if (err) {
      throw err;
    }
  });

  return e;
};
