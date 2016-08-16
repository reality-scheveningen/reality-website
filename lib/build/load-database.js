module.exports = exports = function (e) {
  e.db = require(e.config.databasePath)

  return e
}
