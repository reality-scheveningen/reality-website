let
  _ = require('lodash'),
  loadMarkDown = require('./render/load-markdown'),
  renderHtml = require('./render/render-html'),
  filterHtml = require('./render/filter-html'),
  storeHtml = require('./render/store-html')
;

module.exports = exports = function (e) {
  _.forEach(e.pages, (page, route) => {
    Promise.resolve({route: route, page: page})
      .then(val => {
        _.merge(val.page, e.config);

        val.page.canonicalUrl = _.trimEnd(val.page.baseUrl, '/') + val.route;
        val.page.pretty = val.page.env == 'dev';
        val.page.debugData = JSON.stringify(val.page);

        return val;
      })
      .then(loadMarkDown)
      .then(renderHtml)
      .then(filterHtml)
      .then(storeHtml)
      .catch(err => {
        console.log(err);
      })
    ;
  });

  return e;
};
