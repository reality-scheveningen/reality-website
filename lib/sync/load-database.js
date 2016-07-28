let fs = require('fs-extra');

module.exports = exports = function (e) {
  const path = `${e.config.publicPath}/content/db.json`;

  fs.ensureFileSync(path);
  e.database = require('lowdb')(path, { writeOnChange: false });

  return e;
};
