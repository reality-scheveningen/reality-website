const pug = require('pug')
const fs = require('fs-extra')
const promisify = require('es6-promisify')

module.exports = exports = function (e) {
  return promisify(pug.renderFile)(`${e.config.sitePath}/templates/offline.pug`, {baseUrl: e.config.baseUrl})
    .then(data => {
      return promisify(fs.outputFile)(`${e.config.publicPath}/offline.html`, data)
    })
    .then(() => {
      return e
    })
}
