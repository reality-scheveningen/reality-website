let jimp = require('jimp'),
  promisify = require('es6-promisify'),
  fs = require('fs-extra'),
  path = require('path'),
  copy = promisify(fs.copy, {multiArgs: true})
;

module.exports = exports = function(e) {
  const retinaImageExtensions = [
    '.jpg', '.JPG',
    '.png', '.PNG',
    '.jpeg', '.JPEG',
  ];

  const retinaImages = e.images.filter(item => {
    return retinaImageExtensions.indexOf(path.extname(item.absolutePath)) != -1;
  });

  const noneRetinaImages = [];

  return Promise.resolve()
    .then(() => Promise.all(retinaImages.map(item => {
      const parts = path.parse(item.absolutePath);
      const target = path.normalize(`${parts.dir}/${parts.name}@1x${parts.ext}`);

      noneRetinaImages.push({
        absolutePath: target,
      });

      return copy(item.absolutePath, target);
    })))
    .then(() => Promise.all(noneRetinaImages.map(item => {
      return jimp
        .read(item.absolutePath)
        .then(imageBlob => {
          imageBlob.scale(0.5).quality(80).write(item.absolutePath);
        });
    })))
    .then(() => {
      e.images = e.images.concat(noneRetinaImages);

      return e;
    });
};
