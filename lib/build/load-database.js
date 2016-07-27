module.exports = exports = function (e) {
  e.database = require('lowdb')(`${e.config.publicPath}/content/db.json`, { writeOnChange: false });

  return e;
};
