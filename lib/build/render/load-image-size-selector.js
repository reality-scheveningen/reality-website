const fs = require('fs')
const path = require('path')

module.exports = exports = function (e) {
  e.page.imageSizeSelector = (imagePath, size, postFix = '') => {
    const selectedImage = path.join(path.dirname(imagePath), `${size}_${path.basename(imagePath)}`)
      .replace(/\/\w+\.contentful\.com\//g, '/content/assets/')

    return fs.existsSync(path.join(e.page.publicPath, selectedImage)) ? selectedImage + postFix : null
  }

  return e
}
