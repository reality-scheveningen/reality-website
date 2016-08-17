module.exports = exports = function (e) {
  e.pages = e.pages || {}

  const redirects = require(`${e.config.sitePath}/legacy.json`).redirects

  redirects.forEach(redirect => {
    const path = redirect.source + '/'

    e.pages[path] = {
      template: 'redirect',
      redirect: e.config.baseUrl + redirect.target
    }
  })

  return e
}
