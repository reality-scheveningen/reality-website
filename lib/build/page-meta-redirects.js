module.exports = exports = function (e) {
  e.redirects.forEach(redirect => {
    const path = redirect.source + '/'

    e.pages.push({
      template: 'redirect',
      redirect: e.config.baseUrl + redirect.target,
      route: path
    })
  })

  return e
}
