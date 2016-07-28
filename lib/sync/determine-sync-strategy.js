module.exports = exports = function (e) {
  if (!e.database.has('sync-token').value()) {
    e.config.fullSync = true;
  }

  return e;
};
