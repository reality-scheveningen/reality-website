'use strict';

let jade = require('jade'),
  fs = require('fs-extra'),
  md = require('marked'),
  transformer = require('./contentful-locale-transformer');

let app = {
  render : function (path, cb) {
    let data = cb(path);

    data = transformer(data, 'nl-NL');

    data.pretty = true;
    data.env = 'dev';
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
};

module.exports = app;
