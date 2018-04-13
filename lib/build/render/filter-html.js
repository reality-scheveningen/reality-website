module.exports = exports = function (e) {
  if (e.page.template === 'redirect') {
    return e
  }

  // replace all contentful links to local versions
  e.html = e.html.replace(/\/\/\w+\.(contentful\.com|ctfassets\.net)\//g, '/content/assets/')

  return e
}
