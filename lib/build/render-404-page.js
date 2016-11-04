const pug = require('pug')
const fs = require('fs-extra')
const promisify = require('es6-promisify')

module.exports = exports = function (e) {
  return promisify(pug.renderFile)(`${e.config.sitePath}/templates/404.pug`, {gaTrackingCode: e.config.gaTrackingCode})
    .then(data => {
      return promisify(fs.outputFile)(`${e.config.publicPath}/404.html`, data)
    })
    .then(() => {
      return e
    })
}
