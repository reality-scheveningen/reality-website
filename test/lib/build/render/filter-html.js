const test = require('tape')
const filterHtml = require('../../../../lib/build/render/filter-html')

testFilterHtml(
  'filters html',
  'page',
  '<a href="//assets.contentful.com/images/example.jpg">Example</a>',
  '<a href="/content/assets/images/example.jpg">Example</a>',
  'replaced contful.com assets links to local ones'
)

testFilterHtml(
  'filters html',
  'page',
  '<a href="//assets.ctfassets.net/images/example.jpg">Example</a>',
  '<a href="/content/assets/images/example.jpg">Example</a>',
  'replaced ctfassets.net assets links to local ones'
)

testFilterHtml(
  'not filters html',
  'page',
  '<a href="https://example.com/images/example.jpg">Example</a>',
  '<a href="https://example.com/images/example.jpg">Example</a>',
  'none contentful assets not replaced'
)

testFilterHtml(
  'does not filter html on redirect html pages',
  'redirect',
  '<a href="//assets.contentful.com/images/example.jpg">Example</a>',
  '<a href="//assets.contentful.com/images/example.jpg">Example</a>',
  'not replaced contentful.com links'
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
