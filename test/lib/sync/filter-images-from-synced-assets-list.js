const test = require('tape')
const filterImagesFromSyncedAssets = require('../../../lib/sync/filter-images-from-synced-assets-list')

test('filter images from downloaded assets', assert => {
  const e = {
    downloadedAssets: [
      {
        remotePath: 'https://some-cdn/some/path/some-asset.pdf',
        localPath: '/some/path/some-asset.pdf',
        targetFolder: '/local/assets/some/path',
        absolutePath: '/local/assets/some/path/some-asset.pdf'
      },
      {
        remotePath: 'https://some-cdn/some/path/some-asset.jpg',
        localPath: '/some/path/some-asset.jpg',
        targetFolder: '/local/assets/some/path',
        absolutePath: '/local/assets/some/path/some-asset.jpg'
      }
    ]
  }

  const result = filterImagesFromSyncedAssets(e)

  assert.same([e.downloadedAssets[1]], result.images)
  assert.end()
})
