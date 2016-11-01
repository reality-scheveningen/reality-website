const test = require('tape')
const proxyquire = require('proxyquire')

test('download synced assets', assert => {
  let downloaded = false

  const e = {
    config: {
      assetPath: '/local/assets'
    },
    sync: {
      assets: [
        {fields: {file: [{url: '//some-cdn/some/path/some-asset.ext'}]}}
      ]
    }
  }

  const expectedDownloadedAssets = [
    {
      remotePath: 'https://some-cdn/some/path/some-asset.ext',
      localPath: '/some/path/some-asset.ext',
      targetFolder: '/local/assets/some/path',
      absolutePath: '/local/assets/some/path/some-asset.ext'
    }
  ]

  const donwloadSyncedAssets = proxyquire('../../../lib/sync/download-synced-assets', {
    download: (remotePath, targetFolder) => {
      assert.equal(remotePath, expectedDownloadedAssets[0].remotePath)
      assert.equal(targetFolder, expectedDownloadedAssets[0].targetFolder)

      downloaded = true

      return Promise.resolve()
    }
  })

  const result = donwloadSyncedAssets(e)

  result.then(res => {
    assert.equal(downloaded, true)
    assert.same(res.downloadedAssets, expectedDownloadedAssets)

    assert.end()
  }).catch(err => {
    assert.fail(`Promise failed with ${err}`)
    assert.end()
  })
})
