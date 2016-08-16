let _ = require('lodash')
let path = require('path')
let url = require('url')
let download = require('download')

module.exports = exports = function (e) {
  e.downloadedAssets = _.flatten(
    e.sync.assets.map(asset => {
      const items = []

      _.forEach(asset.fields.file, file => {
        const localPath = url.parse('https:' + file.url).pathname

        items.push({
          remotePath: 'https:' + file.url,
          localPath: localPath,
          targetFolder: e.config.assetPath + path.dirname(localPath),
          absolutePath: e.config.assetPath + localPath
        })
      })

      return items
    })
  )

  return Promise.all(
    e.downloadedAssets.map(asset => {
      return download(
        asset.remotePath,
        asset.targetFolder
      )
    })
  ).then(() => e)
}
