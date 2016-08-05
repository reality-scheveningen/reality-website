module.exports = exports = function (e) {
  e.db = require(`${e.config.publicPath}/content/db.json`);

  return e;
};
