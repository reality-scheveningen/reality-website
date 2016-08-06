let test = require('tape'),
  filterHtml = require('../../../../lib/build/render/load-markdown');

test('loads markdown', assert => {
  const e = {
    page: {
      template: 'page',
      baseUrl: 'http://example.com'
    }
  };

  filterHtml(e);

  assert.equal(
    e.page.md('# Test'),
    '<h1 id="test">Test</h1>' + "\n",
    'markdown transformed to html'
  );

  assert.end();
});

test('not load markdown on redirect pages', assert => {
  const e = {
    page: {
      template: 'redirect'
    }
  };

  filterHtml(e);

  assert.equal(undefined, e.page.md, 'Nope, no markdown loaded');
  assert.end();
});