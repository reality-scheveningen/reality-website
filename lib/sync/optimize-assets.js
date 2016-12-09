const path = require('path')
const glob = require('glob')
const imagemin = require('imagemin')
const imageminPlugins = ['gifsicle', 'jpegtran', 'optipng', 'svgo'].map(x => { return require(`imagemin-${x}`)() })

module.exports = exports = function (e) {
  e.optimizedImages = glob.sync('**/*.+(jpg|svg|png|jpeg|gif)', {
    cwd: e.config.assetPath,
    absolute: true,
    nocase: true
  })

  return Promise.all(
    e.optimizedImages.map(imagePath => {
      return imagemin([imagePath], path.dirname(imagePath), {plugins: imageminPlugins})
    })
  ).then(() => e)
}
