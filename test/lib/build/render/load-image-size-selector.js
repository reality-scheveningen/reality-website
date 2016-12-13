const test = require('tape')
const proxyquire = require('proxyquire')

function proxyImageSizeSelector (exists) {
  const ctx = {
    page: {
      publicPath: '/some/public/path/to/find/file'
    }
  }

  proxyquire('../../../../lib/build/render/load-image-size-selector', {
    fs: {
      existsSync: (path) => {
        return exists
      }
    }
  })(ctx)

  return ctx.page.imageSizeSelector
}

test('select image size of existing image', assert => {
  const loadImageSizeSelector = proxyImageSizeSelector(true)

  assert.equal(
    loadImageSizeSelector('//images.contentful.com/some/path/image.jpg', 2000, ' 2x'),
    '/content/assets/some/path/2000_image.jpg 2x'
  )

  assert.equal(
    loadImageSizeSelector('/some/path/image.jpg', 2000),
    '/some/path/2000_image.jpg'
  )

  assert.end()
})

test('select image size of unexisting image', assert => {
  const loadImageSizeSelector = proxyImageSizeSelector(false)

  assert.same(
    loadImageSizeSelector('//images/contentful.com/some/path/image.jpg', 2000, ' 2x'),
    null
  )

  assert.end()
})
