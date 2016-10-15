;(function (document) {
  if (!('ontouchstart' in document.documentElement)) {
    document.documentElement.className += 'no-touch'
  }
})(document)
