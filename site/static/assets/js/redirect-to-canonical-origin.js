function redirectToCanonicalOrigin (baseUrl, window) { // eslint-disable-line
  // http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/
  var origin = window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')

  if (origin !== baseUrl) {
    window.location = baseUrl + window.location.pathname + window.location.hash
  }
}
