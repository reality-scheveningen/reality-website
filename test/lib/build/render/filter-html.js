const test = require('tape')
const filterHtml = require('../../../../lib/build/render/filter-html')

testFilterHtml(
  'filters html',
  'page',
  '<a href="//assets.contentful.com/images/example.jpg">Example<a>',
  '<a href="/content/assets/images/example.jpg">Example<a>',
  'replaced contful.com assets links to local ones'
)

testFilterHtml(
  'does not filter html on redirect html pages',
  'redirect',
  '<a href="//assets.contentful.com/images/example.jpg">Example<a>',
  '<a href="//assets.contentful.com/images/example.jpg">Example<a>',
  'not replaced contenful.com links'
)

function testFilterHtml (description, template, input, output, assertDescription) {
  test(description, assert => {
    const e = {
      html: input,
      page: {
        template: template
      }
    }

    filterHtml(e)

    assert.equal(e.html, output, assertDescription)
    assert.end()
  })
}
