const sharp = require('sharp')
const path = require('path')
const glob = require('glob')

function resize (metadata, image, sourcePath, size) {
  if (metadata.height < size && metadata.width < size) {
    return image
  }

  const width = metadata.width > metadata.height ? size : null
  const height = width === null ? size : null
  const targetPath = path.join(path.dirname(sourcePath), `${size}_${path.basename(sourcePath)}`)

  return image
    .resize(width, height)
    .embed()
    .toFile(targetPath)
}

module.exports = exports = function (sizes) {
  return function (e) {
    if (!sizes) {
      return e
    }

    e.scaledImages = glob.sync('**/*.+(jpg|png|jpeg|gif)', {
      cwd: e.config.assetPath,
      absolute: true,
      nocase: true
    })

    return Promise.all(
      e.scaledImages.map(imagePath => {
        const image = sharp(imagePath)

        return image
          .metadata()
          .then(metadata => {
            return Promise.all(
              sizes.map(size => {
                return resize(metadata, image, imagePath, size)
              })
            )
          })
      })
    ).then(() => e)
  }
}
