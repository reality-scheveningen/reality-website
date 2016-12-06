module.exports = exports = function (e) {
  e.redirects = require(`${e.config.sitePath}/legacy.json`).redirects

  return e
}
