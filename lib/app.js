let pug = require('pug'),
  fs = require('fs-extra'),
  md_it = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  }).use(require('markdown-it-emoji'))
    .use(require('markdown-it-anchor')),
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
    data.md = (val) => {
      return md_it.render(val);
    };

    pug.renderFile('site/templates/' + data.template + '.pug', data, (err, html) => {
      if (err) {
        throw err;
      }

      let routePath = 'public' + path;

      // replace all contentful links to local versions
      html = html.replace(/\/\/\w+\.contentful\.com\//g, '/content/assets/');

      fs.outputFile(routePath + 'index.html', html, (err) = {
        if (err) {
          throw err;
        }
      });
    });
  }
}

module.exports = App;
