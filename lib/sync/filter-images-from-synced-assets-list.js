let path = require('path');

module.exports = exports = function(e) {
  const imageExtensions = [
    '.jpg', '.JPG',
    '.png', '.PNG',
    '.gif', '.GIF',
    '.jpeg', '.JPEG',
    '.svg', '.SVG'
  ];

  e.images = e.downloadedAssets.filter(item => {
    return imageExtensions.indexOf(path.extname(item.absolutePath)) != -1;
  });

  return e;
};
