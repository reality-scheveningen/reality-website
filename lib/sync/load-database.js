const fs = require('fs-extra')

module.exports = exports = function (e) {
  e.db = fs.existsSync(e.config.databasePath) ? require(e.config.databasePath) : {}

  return e
}
