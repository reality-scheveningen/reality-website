const sharp = require('sharp');

module.exports = exports = function (e) {
  return Promise.all(
    e.images.map(item => {
      const image = sharp(item.absolutePath)
        .metadata()
        .then((metadata) => {
          console.log(`${item.absolutePath}: ${metadata.width}x${metadata.height}`)
        })
      return image
    })
  ).then(() => e)
}
