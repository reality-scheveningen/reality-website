let path = require('path'),
  imagemin = require('imagemin'),
  imageminPlugins = ['gifsicle','jpegtran','optipng','svgo'].map(x => {return require(`imagemin-${x}`)();})
;

module.exports = exports = function (e) {
  return Promise.all(
    e.images.map(item => {
      return imagemin([item.absolutePath], path.dirname(item.absolutePath), {plugins: imageminPlugins});
    })
  ).then(() => e);
};
