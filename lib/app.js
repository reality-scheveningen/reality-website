'use strict';

let jade = require('jade'),
  fs = require('fs-extra'),
  md = require('marked'),
  _ = require('lodash'),
  transformer = require('./contentful-locale-transformer');

class App {

  constructor(options) {
    this.options = options || {};
  }

  render(path, cb) {
    let data = cb(path);

    data = transformer(data, 'nl-NL');

    _.merge(data, this.options);

    data.canonicalUrl = _.trimEnd(data.baseUrl, '/') + path;
    data.pretty = data.env == 'dev';

    data.debugData = JSON.stringify(data);
    data.md = md;

    jade.renderFile('site/templates/' + data.template + '.jade', data, (err, html) => {
      if (err) {
        throw err;
      }

      let routePath = 'public' + path;

      fs.outputFile(routePath + 'index.html', html, (err) = {
        if (err) {
          throw err;
        }
      });
    });
  }
}

module.exports = App;
