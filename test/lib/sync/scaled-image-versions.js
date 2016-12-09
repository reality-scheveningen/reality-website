const test = require('tape')
const scaledImageVersions = require('../../../lib/sync/scaled-image-versions')
const fs = require('fs')
const path = require('path')

test('create downscaled versions of image', assert => {
  const e = {
    config: {
      assetPath: path.join(__dirname, 'images')
    }
  }

  Promise.resolve(e)
    .then(scaledImageVersions([2000, 250]))
    .then(obj => {
      assert.equal(fs.existsSync(`${__dirname}/images/2000_test-cover.jpg`), true)
      assert.equal(fs.existsSync(`${__dirname}/images/250_test-cover.jpg`), true)

      fs.unlinkSync(`${__dirname}/images/2000_test-cover.jpg`)
      fs.unlinkSync(`${__dirname}/images/250_test-cover.jpg`)

      assert.same(obj, e)
    })
    .catch(err => {
      assert.fail(err.message)
    })

  assert.end()
})
