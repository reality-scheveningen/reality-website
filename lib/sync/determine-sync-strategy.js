let _ = require('lodash')

module.exports = exports = function (e) {
  if (_.has(e.db, 'sync-token') === false) {
    e.config.fullSync = true
  }

  return e
}
