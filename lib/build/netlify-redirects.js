const fs = require('fs-extra')

module.exports = exports = function (e) {
  const redirectContents = e.redirects.reduce((contents, redirect) => {
    return contents + `${redirect.source}  ${redirect.target}\n`
  }, '')

  fs.outputFileSync(`${e.config.publicPath}/_redirects`, redirectContents)

  return e
}
