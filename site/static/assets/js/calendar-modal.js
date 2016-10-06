(function (window) {
  var renderedAgenda = false

  var renderAgenda = function () {
    if (renderedAgenda) return

    if (window.location.hash === '#agenda-open') {
      var el = document.getElementById('agenda-open')
      var html = el.querySelectorAll('noscript')[0].innerText
      el.innerHTML = el.innerHTML + html

      renderedAgenda = true
    }
  }

  renderAgenda()

  window.onhashchange = function () {
    renderAgenda()
  }

  window.onkeyup = function (event) {
    if (window.location.hash === '#agenda-open') {
      var key = event.key

      if (key === 'Escape') {
        window.location = '#agenda'
      }
    }
  }
})(window)
