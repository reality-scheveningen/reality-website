let contentful = require('contentful');

module.exports = exports = function (e) {
  const syncOptions = e.config.fullSync ? { initial: true } : { nextSyncToken : e.database.get('sync-token').value() };

  const client = contentful.createClient({
    space: e.config.contentfulSpace,
    accessToken: e.config.contentfulAccessToken
  });

  return client.sync(syncOptions)
    .then(response => {
      e.sync = {
        entries: response.entries,
        assets: response.assets,
        deletedEntries: response.deletedEntries || [],
        deletedAssets: response.deletedAssets || [],
        nextSyncToken: response.nextSyncToken
      };

      return e;
    });
};
