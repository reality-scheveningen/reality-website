const moment = require('moment')

module.exports = exports = function (e) {
  if (e.page.template === 'redirect') {
    return e
  }

  moment.locale('nl')

  e.page.moment = (val, format) => {
    return moment(val).format(format)
  }

  return e
}
